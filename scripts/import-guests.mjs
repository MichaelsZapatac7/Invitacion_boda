#!/usr/bin/env node
/**
 * Importa invitados a Supabase desde un CSV y genera los enlaces /i/{token}.
 *
 * Uso:
 *   NEXT_PUBLIC_SUPABASE_URL=... SUPABASE_SERVICE_ROLE_KEY=... \
 *   NEXT_PUBLIC_SITE_URL=https://tu-dominio \
 *   node scripts/import-guests.mjs guests.csv
 *
 * Formato del CSV (encabezado obligatorio):
 *   displayName,maxAttendees,allowPlusOne,invitationType,guests
 *   Juan Pérez,1,false,individual,
 *   Carlos y Andrea,2,false,pareja,
 *   Familia Rodríguez,4,false,familia,Juan;Laura;Mateo;Sofía
 *   Daniel Gómez,2,true,individual,
 *
 * - `invitationType` y `guests` son opcionales.
 * - `guests` es una lista de nombres separados por ";" (invitados nominados).
 * - Reejecutar es seguro: si el displayName ya existe, se actualiza (no duplica).
 */

import { readFileSync } from "node:fs";
import { randomBytes } from "node:crypto";
import { createClient } from "@supabase/supabase-js";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://invitacion-michael-juliana.vercel.app";

if (!url || !key) {
  console.error("Faltan NEXT_PUBLIC_SUPABASE_URL y/o SUPABASE_SERVICE_ROLE_KEY.");
  process.exit(1);
}

const file = process.argv[2];
if (!file) {
  console.error("Uso: node scripts/import-guests.mjs <archivo.csv>");
  process.exit(1);
}

// ── Mini parser CSV con soporte de comillas ──
function parseCsv(text) {
  const rows = [];
  let row = [];
  let field = "";
  let inQuotes = false;
  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    if (inQuotes) {
      if (c === '"' && text[i + 1] === '"') { field += '"'; i++; }
      else if (c === '"') inQuotes = false;
      else field += c;
    } else if (c === '"') inQuotes = true;
    else if (c === ",") { row.push(field); field = ""; }
    else if (c === "\n" || c === "\r") {
      if (c === "\r" && text[i + 1] === "\n") i++;
      row.push(field); field = "";
      if (row.some((v) => v.trim() !== "")) rows.push(row);
      row = [];
    } else field += c;
  }
  if (field !== "" || row.length) { row.push(field); if (row.some((v) => v.trim() !== "")) rows.push(row); }
  return rows;
}

const token = () => randomBytes(9).toString("base64url"); // ~12 chars, aleatorio

const supabase = createClient(url, key, { auth: { persistSession: false } });

const text = readFileSync(file, "utf8");
const rows = parseCsv(text);
if (rows.length < 2) {
  console.error("El CSV no tiene filas de datos.");
  process.exit(1);
}

const header = rows[0].map((h) => h.trim());
const idx = (name) => header.indexOf(name);
const iName = idx("displayName");
const iMax = idx("maxAttendees");
const iPlus = idx("allowPlusOne");
const iType = idx("invitationType");
const iGuests = idx("guests");

if (iName === -1 || iMax === -1) {
  console.error("El CSV debe tener al menos las columnas: displayName, maxAttendees");
  process.exit(1);
}

let created = 0;
let updated = 0;

for (const r of rows.slice(1)) {
  const displayName = (r[iName] ?? "").trim();
  if (!displayName) continue;
  const maxAttendees = Math.max(1, parseInt((r[iMax] ?? "1").trim(), 10) || 1);
  const allowPlusOne = iPlus !== -1 && /^(true|1|si|sí)$/i.test((r[iPlus] ?? "").trim());
  const invitationType = (iType !== -1 && (r[iType] ?? "").trim()) || "individual";
  const guestNames =
    iGuests !== -1
      ? (r[iGuests] ?? "").split(";").map((g) => g.trim()).filter(Boolean)
      : [];

  // ¿Ya existe por displayName? -> actualizar; si no -> crear con token nuevo.
  const { data: existing } = await supabase
    .from("invitation_groups")
    .select("id, token")
    .eq("display_name", displayName)
    .maybeSingle();

  let groupId;
  let groupToken;

  if (existing) {
    groupId = existing.id;
    groupToken = existing.token;
    await supabase
      .from("invitation_groups")
      .update({ max_attendees: maxAttendees, allow_plus_one: allowPlusOne, invitation_type: invitationType })
      .eq("id", groupId);
    updated++;
  } else {
    groupToken = token();
    const { data: ins, error } = await supabase
      .from("invitation_groups")
      .insert({
        token: groupToken,
        display_name: displayName,
        max_attendees: maxAttendees,
        allow_plus_one: allowPlusOne,
        invitation_type: invitationType,
      })
      .select("id")
      .single();
    if (error) { console.error("Error creando", displayName, error.message); continue; }
    groupId = ins.id;
    created++;
  }

  // Sincronizar invitados nominados (reemplaza el set anterior).
  await supabase.from("guests").delete().eq("invitation_group_id", groupId);
  if (guestNames.length) {
    await supabase
      .from("guests")
      .insert(guestNames.map((name) => ({ invitation_group_id: groupId, name })));
  }

  console.log(`${displayName.padEnd(28)} → ${siteUrl}/i/${groupToken}`);
}

console.log(`\nListo. ${created} creadas, ${updated} actualizadas.`);

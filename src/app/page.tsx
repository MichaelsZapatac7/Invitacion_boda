import Image from "next/image";
import { CalendarActions } from "@/components/calendar-actions";
import { Countdown } from "@/components/countdown";
import { MusicControl } from "@/components/music-control";
import { RsvpForm } from "@/components/rsvp-form";
import { ThemeSwitch } from "@/components/theme-switch";
import { PetalsCanvas } from "@/components/petals-canvas";
import { ScrollReveal } from "@/components/scroll-reveal";
import { ScrollProgress } from "@/components/scroll-progress";
import { GallerySection } from "@/components/gallery-section";
import { weddingConfig } from "@/config/weddingConfig";

export default function Home() {
  return (
    <>
      <ScrollProgress />
      <PetalsCanvas />

      {/* Fixed Controls */}
      <div className="fixed right-4 top-4 z-50 flex items-center gap-2 md:right-8 md:top-8">
        <MusicControl src={weddingConfig.music.trackUrl} enabled={weddingConfig.music.enabled} />
        <ThemeSwitch />
      </div>

      <main>
        {/* ──────────────────────────────────────────────────────────
            HERO — Full-screen cinematic
        ────────────────────────────────────────────────────────── */}
        <section className="hero-section">
          {/* Background photo */}
          <div className="hero-bg">
            <Image
              src={weddingConfig.gallery.images[0].src}
              alt={weddingConfig.gallery.images[0].alt}
              fill
              priority
              className="object-cover object-center"
              sizes="100vw"
            />
          </div>

          {/* Gradient overlay */}
          <div className="hero-overlay" />

          {/* Content */}
          <div className="hero-content z-20">
            {/* Date badge */}
            <div className="fade-up mb-8 inline-block">
              <span className="hero-date-badge">
                <span className="gold-dot" />
                {weddingConfig.hero.badge}
                <span className="gold-dot" />
              </span>
            </div>

            {/* Kicker */}
            <p className="fade-up fade-delay-1 mb-4 section-kicker opacity-80">
              Invitación de boda
            </p>

            {/* Script names */}
            <h1 className="fade-up fade-delay-1 hero-script mb-6 text-[4.5rem] leading-none sm:text-[6rem] md:text-[8rem] lg:text-[10rem]">
              {weddingConfig.couple.partnerOne} & {weddingConfig.couple.partnerTwo}
            </h1>

            {/* Ornamental lines */}
            <div className="fade-up fade-delay-2 mb-8 flex items-center justify-center gap-4">
              <div className="hero-ornament-line" />
              <p className="shrink-0 text-[10px] uppercase tracking-[0.35em] text-gold/70">
                {weddingConfig.event.city}
              </p>
              <div className="hero-ornament-line" />
            </div>

            {/* Headline */}
            <p className="fade-up fade-delay-2 mx-auto max-w-[32ch] text-base leading-8 text-foreground/70 sm:text-lg sm:leading-9 md:text-xl">
              {weddingConfig.hero.headline}
            </p>

            {/* CTAs */}
            <div className="fade-up fade-delay-2 mt-10 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
              <a
                href="#rsvp"
                className="rounded-full bg-gold px-8 py-3.5 text-[11px] uppercase tracking-[0.28em] transition hover:bg-gold-light hover:shadow-gold"
                style={{ color: "var(--bg)" }}
              >
                Confirmar asistencia
              </a>
              <a
                href="#calendario"
                className="rounded-full border border-[var(--border-gold)] px-8 py-3.5 text-[11px] uppercase tracking-[0.28em] text-gold backdrop-blur transition hover:bg-gold/10"
              >
                Guardar la fecha
              </a>
            </div>
          </div>

          {/* Scroll indicator */}
          <div className="hero-scroll-indicator z-20">
            <span className="text-[9px] uppercase tracking-[0.3em] text-gold/50">Desliza</span>
            <div className="hero-scroll-line" />
          </div>
        </section>

        {/* ──────────────────────────────────────────────────────────
            POETIC QUOTE
        ────────────────────────────────────────────────────────── */}
        <section className="section-shell py-24 md:py-32">
          <ScrollReveal direction="fade">
            <div className="mx-auto max-w-3xl text-center">
              <div className="quote-ornament mb-8">
                <span className="text-xs uppercase tracking-[0.35em] text-gold/60">Nuestra promesa</span>
              </div>
              <blockquote className="font-title text-2xl leading-relaxed text-foreground/85 sm:text-3xl md:text-4xl md:leading-relaxed">
                &ldquo;{weddingConfig.hero.headline}&rdquo;
              </blockquote>
              <p className="mx-auto mt-8 max-w-2xl text-sm leading-8 text-muted sm:text-base sm:leading-9">
                {weddingConfig.hero.subheadline}
              </p>
            </div>
          </ScrollReveal>
        </section>

        {/* ──────────────────────────────────────────────────────────
            COUNTDOWN
        ────────────────────────────────────────────────────────── */}
        <section className="section-shell pb-24 md:pb-32">
          <div className="rounded-2xl border border-[var(--border)] bg-surface p-8 backdrop-blur md:rounded-3xl md:p-12">
            <ScrollReveal>
              <div className="mb-10 grid gap-2 md:grid-cols-2 md:items-end">
                <div>
                  <p className="section-kicker">Cuenta regresiva</p>
                  <h2 className="section-title mt-3">Cada día nos acerca a este momento.</h2>
                </div>
                <p className="text-sm leading-7 text-muted md:text-right md:text-base">
                  {weddingConfig.event.displayDate} · {weddingConfig.event.time}
                </p>
              </div>
            </ScrollReveal>
            <Countdown targetDate={weddingConfig.event.startDateTime} />
          </div>
        </section>

        {/* ──────────────────────────────────────────────────────────
            INTRODUCTION
        ────────────────────────────────────────────────────────── */}
        <section className="section-shell pb-24 md:pb-32">
          <div className="grid gap-10 md:grid-cols-[0.75fr_1.25fr] md:gap-16">
            <ScrollReveal direction="left">
              <div>
                <p className="section-kicker">Introducción</p>
                <h2 className="section-title mt-4">{weddingConfig.introduction.title}</h2>
              </div>
            </ScrollReveal>
            <ScrollReveal direction="right" delay={120}>
              <p className="text-base leading-9 text-muted md:text-lg md:leading-10">
                {weddingConfig.introduction.body}
              </p>
            </ScrollReveal>
          </div>
        </section>

        {/* ──────────────────────────────────────────────────────────
            STORY TIMELINE
        ────────────────────────────────────────────────────────── */}
        <section className="section-shell pb-24 md:pb-32">
          <ScrollReveal>
            <div className="mb-12 text-center">
              <p className="section-kicker">{weddingConfig.story.title}</p>
              <h2 className="section-title mt-4">Tres capítulos, una historia</h2>
            </div>
          </ScrollReveal>

          <div className="timeline-container space-y-8 md:space-y-12">
            {weddingConfig.story.chapters.map((chapter, i) => (
              <ScrollReveal key={chapter.title} delay={i * 120}>
                <div className={`timeline-item ${i % 2 === 1 ? "md:text-right" : ""}`}>
                  {/* Left content (even items on desktop) */}
                  <div className={`hidden md:block ${i % 2 === 0 ? "order-1" : "order-3"}`}>
                    {i % 2 === 1 && (
                      <div className="timeline-card ml-auto max-w-sm">
                        <p className="mb-1 text-xs uppercase tracking-[0.3em] text-gold">
                          0{i + 1}
                        </p>
                        <h3 className="mb-3 font-title text-2xl">{chapter.title}</h3>
                        <p className="text-sm leading-7 text-muted">{chapter.text}</p>
                      </div>
                    )}
                  </div>

                  {/* Center dot */}
                  <div className="order-2 flex flex-col items-center">
                    <div className="timeline-dot" />
                  </div>

                  {/* Right content */}
                  <div className={`order-3 ${i % 2 === 1 ? "md:order-1" : ""}`}>
                    {i % 2 === 0 && (
                      <div className="timeline-card hidden max-w-sm md:block">
                        <p className="mb-1 text-xs uppercase tracking-[0.3em] text-gold">
                          0{i + 1}
                        </p>
                        <h3 className="mb-3 font-title text-2xl">{chapter.title}</h3>
                        <p className="text-sm leading-7 text-muted">{chapter.text}</p>
                      </div>
                    )}
                    {/* Mobile: always show */}
                    <div className="timeline-card md:hidden">
                      <p className="mb-1 text-xs uppercase tracking-[0.3em] text-gold">
                        0{i + 1}
                      </p>
                      <h3 className="mb-3 font-title text-2xl">{chapter.title}</h3>
                      <p className="text-sm leading-7 text-muted">{chapter.text}</p>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </section>

        {/* ──────────────────────────────────────────────────────────
            GALLERY
        ────────────────────────────────────────────────────────── */}
        <section className="section-shell pb-24 md:pb-32">
          <ScrollReveal>
            <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
              <div>
                <p className="section-kicker">Galería</p>
                <h2 className="section-title mt-4">{weddingConfig.gallery.title}</h2>
              </div>
              <p className="max-w-xs text-sm leading-7 text-muted">
                Momentos capturados de nuestra historia juntos.
              </p>
            </div>
          </ScrollReveal>
          <GallerySection />
        </section>

        {/* ──────────────────────────────────────────────────────────
            DRESS CODE — "Todos de Negro"
        ────────────────────────────────────────────────────────── */}
        <section className="dress-code-section mb-24 md:mb-32">
          <div className="section-shell">
            <div className="overflow-hidden rounded-2xl border border-[var(--border-gold)]/20 md:rounded-3xl">
              {/* Dark header */}
              <div className="bg-[var(--bg-2)] px-8 py-16 text-center md:px-16 md:py-24">
                <ScrollReveal direction="fade">
                  <p className="section-kicker mb-6 text-gold/70">Dress Code</p>
                </ScrollReveal>
                <ScrollReveal delay={80}>
                  <h2 className="font-title text-5xl leading-tight text-foreground sm:text-6xl md:text-8xl lg:text-9xl">
                    Todos de<br />
                    <span className="italic text-gold">Negro</span>
                  </h2>
                </ScrollReveal>
                <ScrollReveal delay={160} direction="fade">
                  <div className="mx-auto mt-10 max-w-2xl">
                    <p className="text-sm leading-8 text-muted sm:text-base sm:leading-9">
                      Hemos elegido el negro como expresión de elegancia unificada.
                      Queremos que cada persona que nos acompañe sea parte de una imagen
                      cohesionada, sobria y hermosa. Desde el negro más profundo hasta
                      los tonos carbón y pizarra — toda la paleta oscura es bienvenida.
                    </p>
                  </div>
                </ScrollReveal>

                {/* Dress code illustration */}
                <ScrollReveal delay={200} direction="fade">
                  <div className="mx-auto mt-12 max-w-2xl">
                    <div className="relative overflow-hidden rounded-2xl">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src="/images/dresscode.png"
                        alt="Inspiración de vestuario: looks elegantes en negro para hombres y mujeres"
                        className="w-full object-contain"
                        style={{
                          filter: "invert(1) brightness(0.88) contrast(0.9)",
                          mixBlendMode: "screen",
                          opacity: 0.82,
                        }}
                      />
                    </div>
                    <p className="mt-4 text-[10px] uppercase tracking-[0.25em] text-gold/40">
                      Inspiración de looks — elige tu estilo en negro
                    </p>
                  </div>
                </ScrollReveal>

                {/* Notes */}
                <ScrollReveal delay={240} direction="fade">
                  <div className="mx-auto mt-12 grid max-w-2xl gap-4 sm:grid-cols-3">
                    {["Negro profundo", "Carbón y pizarra", "Accesorios libres"].map((note) => (
                      <div key={note} className="rounded-xl border border-[var(--border-gold)]/20 bg-surface/50 px-4 py-3">
                        <p className="text-xs uppercase tracking-[0.2em] text-gold/70">{note}</p>
                      </div>
                    ))}
                  </div>
                </ScrollReveal>
              </div>
            </div>
          </div>
        </section>

        {/* ──────────────────────────────────────────────────────────
            EVENT DETAILS
        ────────────────────────────────────────────────────────── */}
        <section className="section-shell pb-24 md:pb-32">
          <div className="grid gap-6 md:grid-cols-[1fr_1.2fr] md:gap-8">
            <ScrollReveal direction="left">
              <div className="rounded-2xl border border-[var(--border)] bg-surface p-8 md:rounded-3xl md:p-10">
                <p className="section-kicker mb-4">Detalles</p>
                <h2 className="section-title mb-5">{weddingConfig.details.title}</h2>
                <p className="mb-6 text-sm leading-7 text-muted md:text-base md:leading-8">
                  {weddingConfig.details.notes}
                </p>
                <a
                  href={weddingConfig.event.googleMapsUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2.5 rounded-full border border-[var(--border-gold)] px-6 py-3 text-[11px] uppercase tracking-[0.24em] text-gold transition hover:bg-gold/10"
                >
                  <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
                    <path d="M12 21C12 21 4 13.5 4 8.5a8 8 0 0 1 16 0c0 5-8 12.5-8 12.5Z" />
                    <circle cx="12" cy="8.5" r="2.5" />
                  </svg>
                  Abrir Google Maps
                </a>
              </div>
            </ScrollReveal>

            <div className="grid grid-cols-2 gap-3 md:gap-4">
              {[
                { label: "Fecha", value: weddingConfig.event.displayDate },
                { label: "Hora", value: weddingConfig.event.time },
                { label: "Lugar", value: weddingConfig.event.venue },
                { label: "Dress Code", value: weddingConfig.event.dressCode },
                { label: "Dirección", value: weddingConfig.event.address },
                { label: "Ciudad", value: weddingConfig.event.city },
              ].map((d, i) => (
                <ScrollReveal key={d.label} delay={i * 60}>
                  <div className="group h-full rounded-xl border border-[var(--border)] bg-surface p-5 transition-all duration-300 hover:border-[var(--border-gold)]/40 hover:bg-surface-strong md:rounded-2xl md:p-6">
                    <p className="mb-3 text-[9px] uppercase tracking-[0.3em] text-gold">{d.label}</p>
                    <p className="text-sm leading-6 text-foreground md:text-base md:leading-7">{d.value}</p>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        {/* ──────────────────────────────────────────────────────────
            RSVP
        ────────────────────────────────────────────────────────── */}
        <section id="rsvp" className="section-shell pb-24 md:pb-32">
          <div className="overflow-hidden rounded-2xl border border-[var(--border)] md:rounded-3xl">
            <div className="grid md:grid-cols-[0.8fr_1.2fr]">
              {/* Left — info */}
              <div className="border-b border-[var(--border)] bg-surface p-8 md:border-b-0 md:border-r md:p-10">
                <ScrollReveal direction="left">
                  <p className="section-kicker mb-4">RSVP</p>
                  <h2 className="section-title mb-5">{weddingConfig.rsvp.title}</h2>
                  <p className="text-sm leading-7 text-muted md:text-base md:leading-8">
                    {weddingConfig.rsvp.description}
                  </p>

                  {/* Event mini-card */}
                  <div className="mt-8 rounded-xl border border-[var(--border-gold)]/25 bg-gold/5 p-5">
                    <p className="mb-1 text-xs uppercase tracking-[0.25em] text-gold/70">El gran día</p>
                    <p className="font-title text-2xl text-foreground">{weddingConfig.event.displayDate}</p>
                    <p className="mt-1 text-sm text-muted">{weddingConfig.event.time} · {weddingConfig.event.venue}</p>
                  </div>
                </ScrollReveal>
              </div>

              {/* Right — form */}
              <div className="bg-surface/50 p-8 md:p-10">
                <ScrollReveal direction="right" delay={100}>
                  <RsvpForm
                    endpoint={weddingConfig.rsvp.endpoint}
                    method={weddingConfig.rsvp.method}
                    successMessage={weddingConfig.rsvp.successMessage}
                  />
                </ScrollReveal>
              </div>
            </div>
          </div>
        </section>

        {/* ──────────────────────────────────────────────────────────
            CALENDAR
        ────────────────────────────────────────────────────────── */}
        <section id="calendario" className="section-shell pb-24 md:pb-32">
          <ScrollReveal>
            <div className="rounded-2xl border border-[var(--border-gold)]/20 bg-surface px-8 py-12 text-center md:rounded-3xl md:px-16 md:py-16">
              <p className="section-kicker mb-4">Agenda</p>
              <h2 className="section-title mb-5">{weddingConfig.calendar.title}</h2>
              <p className="mx-auto mb-10 max-w-xl text-sm leading-7 text-muted md:text-base md:leading-8">
                {weddingConfig.calendar.description}
              </p>
              <CalendarActions />
            </div>
          </ScrollReveal>
        </section>

        {/* ──────────────────────────────────────────────────────────
            CLOSING — Cinematic finale
        ────────────────────────────────────────────────────────── */}
        <section className="closing-section section-shell pb-24 md:pb-32">
          <div className="rounded-2xl border border-[var(--border-gold)]/20 md:rounded-3xl">
            {/* Main closing content */}
            <div className="px-8 py-20 text-center md:px-16 md:py-28">
              <ScrollReveal direction="fade">
                <div className="quote-ornament mb-10">
                  <span className="text-xs uppercase tracking-[0.3em] text-gold/50">Con amor</span>
                </div>
              </ScrollReveal>

              <ScrollReveal delay={80}>
                <p className="font-title text-2xl leading-relaxed text-foreground/80 sm:text-3xl md:text-4xl md:leading-relaxed lg:text-5xl lg:leading-relaxed">
                  &ldquo;{weddingConfig.closing.quote}&rdquo;
                </p>
              </ScrollReveal>

              <ScrollReveal delay={160} direction="fade">
                <p className="mx-auto mt-8 max-w-2xl text-sm leading-8 text-muted md:text-base md:leading-9">
                  {weddingConfig.closing.farewell}
                </p>
              </ScrollReveal>

              <ScrollReveal delay={240} direction="fade">
                <div className="mt-12">
                  <div className="quote-ornament mb-8">
                    <span className="text-xs uppercase tracking-[0.25em] text-gold/40">14 · 11 · 2026</span>
                  </div>
                  <p className="font-script text-5xl text-gold sm:text-6xl md:text-7xl" style={{ fontFamily: "var(--font-script)" }}>
                    {weddingConfig.couple.signature}
                  </p>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </section>

        {/* ──────────────────────────────────────────────────────────
            FOOTER
        ────────────────────────────────────────────────────────── */}
        <footer className="section-shell pb-16">
          <div className="gold-divider mb-8" />
          <div className="flex flex-col items-center gap-4 text-center sm:flex-row sm:justify-between">
            <p className="text-[9px] uppercase tracking-[0.3em] text-muted">
              {weddingConfig.footer.text}
            </p>
            <p className="font-script text-xl text-gold/60" style={{ fontFamily: "var(--font-script)" }}>
              M & J
            </p>
          </div>
        </footer>
      </main>
    </>
  );
}

import Image from "next/image";
import { ScrollReveal } from "@/components/scroll-reveal";

export function GiftEnvelopeSection() {
  return (
    <section className="section-shell pb-24 md:pb-32">
      <ScrollReveal direction="fade">
        <div className="overflow-hidden rounded-2xl border border-[var(--border-gold)]/25 bg-surface/45 px-6 py-14 text-center backdrop-blur md:rounded-3xl md:px-12 md:py-20">
          <div className="mx-auto max-w-4xl">
            <div className="mb-5 flex items-center justify-center gap-4 text-gold/60">
              <svg viewBox="0 0 46 22" className="h-5 w-10" fill="none" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round">
                <path d="M42 18C31 16 20 10 7 3" />
                <path d="M32 13c2-5 5-7 9-8M26 10c0-4 2-7 5-9M20 8c-3-1-6 0-9 2M14 5C11 4 8 5 5 7" />
              </svg>
              <h2
                className="text-[2.8rem] leading-none text-foreground sm:text-6xl md:text-7xl"
                style={{ fontFamily: "var(--font-script)" }}
              >
                Lluvia de sobres
              </h2>
              <svg viewBox="0 0 46 22" className="h-5 w-10 -scale-x-100" fill="none" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round">
                <path d="M42 18C31 16 20 10 7 3" />
                <path d="M32 13c2-5 5-7 9-8M26 10c0-4 2-7 5-9M20 8c-3-1-6 0-9 2M14 5C11 4 8 5 5 7" />
              </svg>
            </div>

            <p className="mx-auto max-w-2xl text-sm leading-7 text-muted sm:text-base sm:leading-8">
              Tu presencia es el mejor regalo que podemos recibir.
              <br />
              Si deseas hacernos un detalle, agradecemos tu lluvia de sobres.
            </p>

            <div className="mx-auto mt-10 grid max-w-3xl overflow-hidden rounded-2xl border border-[var(--border-gold)]/40 bg-[var(--bg-2)]/70 md:grid-cols-[0.9fr_1.1fr]">
              <div className="flex min-h-[260px] flex-col items-center justify-center px-8 py-10 md:border-r md:border-[var(--border-gold)]/25">
                <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-full border border-[var(--border-gold)]/30 text-gold/75">
                  <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4 9h16v11H4z" />
                    <path d="M12 9v11M3 9h18V6H3z" />
                    <path d="M12 6c-1.5-3.2-5.8-3.1-5.8-.2C6.2 7.3 8 9 12 9M12 6c1.5-3.2 5.8-3.1 5.8-.2 0 1.5-1.8 3.2-5.8 3.2" />
                  </svg>
                </div>
                <p className="font-title text-2xl text-gold sm:text-3xl">Para transferencias</p>
                <div className="my-6 flex items-center gap-3 text-gold/35">
                  <span className="h-px w-16 bg-[var(--border-gold)]/35" />
                  <span className="text-xs">♡</span>
                  <span className="h-px w-16 bg-[var(--border-gold)]/35" />
                </div>
                <p className="text-sm leading-7 text-muted">
                  Con cariño,
                  <br />
                  Michael &amp; Juliana
                </p>
              </div>

              <div className="flex items-center justify-center px-7 py-9 md:px-10">
                <div className="w-full max-w-[300px] rounded-2xl bg-white p-4 shadow-[0_18px_60px_rgba(0,0,0,0.35)]">
                  <Image
                    src="/images/lluvia-sobres-qr.png"
                    alt="Código QR para transferencias por Bre-B / Bancolombia"
                    width={360}
                    height={360}
                    className="mx-auto h-auto w-full"
                  />
                  <div className="mt-3 rounded-lg border border-black/10 bg-[#f7f7f7] px-3 py-2.5 text-center">
                    <p className="text-[11px] uppercase tracking-[0.18em] text-black/55">Llave Bre-B</p>
                    <p className="mt-1 text-base font-semibold tracking-wide text-black">@michaelz8234</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </ScrollReveal>
    </section>
  );
}

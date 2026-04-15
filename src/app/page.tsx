import { CalendarActions } from "@/components/calendar-actions";
import { Countdown } from "@/components/countdown";
import { GalleryCard } from "@/components/gallery-card";
import { MusicControl } from "@/components/music-control";
import { RsvpForm } from "@/components/rsvp-form";
import { ThemeSwitch } from "@/components/theme-switch";
import { weddingConfig } from "@/config/weddingConfig";

export default function Home() {
  const coupleNames = `${weddingConfig.couple.partnerOne} & ${weddingConfig.couple.partnerTwo}`;

  return (
    <main className="overflow-hidden pb-14 sm:pb-16">
      <div className="fixed right-3 top-3 z-50 flex items-center gap-2 md:right-8 md:top-8">
        <MusicControl src={weddingConfig.music.trackUrl} enabled={weddingConfig.music.enabled} />
        <ThemeSwitch />
      </div>

      <section className="section-shell pt-20 sm:pt-24 md:pt-10">
        <div className="theme-surface-soft rounded-[1.75rem] border border-white/50 bg-glow px-4 py-5 shadow-soft backdrop-blur sm:px-6 sm:py-8 md:rounded-[2.5rem] md:px-10 md:py-10">
          <div className="flex flex-col gap-2 text-[10px] uppercase tracking-[0.26em] text-muted sm:flex-row sm:items-center sm:justify-between sm:gap-4 sm:text-xs sm:tracking-[0.3em]">
            <span>{weddingConfig.hero.badge}</span>
            <span>{weddingConfig.event.venue}</span>
          </div>

          <div className="grid gap-7 pt-7 md:grid-cols-[1.15fr_0.85fr] md:items-end md:gap-10 md:pt-16">
            <div className="space-y-4 md:space-y-6">
              <p className="section-kicker fade-up text-[10px] tracking-[0.28em] sm:text-xs sm:tracking-[0.35em]">Invitacion de boda</p>
              <h1 className="fade-up max-w-[7ch] text-[4rem] leading-[0.88] tracking-[-0.04em] text-foreground sm:max-w-none sm:text-6xl sm:tracking-normal md:text-8xl">
                {coupleNames}
              </h1>
              <p className="fade-up fade-delay-1 max-w-[12ch] text-[1.7rem] leading-[1.02] text-foreground/88 sm:max-w-2xl sm:text-2xl sm:leading-tight md:text-4xl">
                {weddingConfig.hero.headline}
              </p>
              <p className="fade-up fade-delay-2 max-w-[34ch] text-[15px] leading-7 text-muted sm:max-w-xl sm:text-base md:text-lg md:leading-8">
                {weddingConfig.hero.subheadline}
              </p>

              <div className="fade-up fade-delay-2 flex flex-col gap-2.5 sm:flex-row sm:gap-3">
                <a
                  href="#rsvp"
                  className="theme-button-primary w-full rounded-full px-5 py-3 text-center text-[10px] uppercase tracking-[0.24em] transition hover:bg-gold hover:text-black sm:w-auto sm:px-6 sm:text-xs sm:tracking-[0.3em]"
                >
                  Confirmar asistencia
                </a>
                <a
                  href="#calendario"
                  className="theme-button-secondary w-full rounded-full border px-5 py-3 text-center text-[10px] uppercase tracking-[0.22em] transition hover:border-gold hover:bg-gold/10 sm:w-auto sm:px-6 sm:text-xs sm:tracking-[0.3em]"
                >
                  Agregar al calendario
                </a>
              </div>

            </div>

            <div className="space-y-4">
              <GalleryCard
                src={weddingConfig.gallery.images[0].src}
                alt={weddingConfig.gallery.images[0].alt}
                priority
                className="min-h-[280px] sm:min-h-[380px] md:min-h-[420px]"
              />
              <div className="theme-surface-strong rounded-[1.35rem] border p-4 backdrop-blur sm:rounded-[1.75rem] sm:p-5">
                <p className="text-[10px] uppercase tracking-[0.28em] text-gold sm:text-xs sm:tracking-[0.32em]">Save the date</p>
                <p className="mt-3 font-title text-2xl leading-tight sm:text-3xl md:text-4xl">{weddingConfig.event.displayDate}</p>
                <p className="mt-2 text-sm leading-6 text-muted sm:leading-7">
                  {weddingConfig.event.time} · {weddingConfig.event.venue} · {weddingConfig.event.city}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-shell pt-14 sm:pt-20 md:pt-24">
        <div className="theme-surface grid gap-6 rounded-[1.75rem] border px-4 py-5 shadow-soft md:grid-cols-[0.8fr_1.2fr] md:gap-8 md:px-10 md:py-10">
          <div>
            <p className="section-kicker">Cuenta regresiva</p>
            <h2 className="section-title mt-4">Cada dia nos acerca a este momento.</h2>
          </div>
          <Countdown targetDate={weddingConfig.event.startDateTime} />
        </div>
      </section>

      <section className="section-shell pt-14 sm:pt-20 md:pt-24">
        <div className="grid gap-8 md:grid-cols-[0.8fr_1.2fr] md:gap-12">
          <div>
            <p className="section-kicker">Introduccion</p>
            <h2 className="section-title mt-4">{weddingConfig.introduction.title}</h2>
          </div>
          <p className="max-w-3xl text-base leading-8 text-muted md:text-lg md:leading-9">{weddingConfig.introduction.body}</p>
        </div>
      </section>

      <section className="section-shell pt-14 sm:pt-20 md:pt-24">
        <div className="theme-inverse rounded-[1.75rem] border px-4 py-7 shadow-soft md:rounded-[2.5rem] md:px-10 md:py-10">
          <p className="section-kicker text-gold/90">{weddingConfig.story.title}</p>
          <div className="mt-6 grid gap-4 md:mt-8 md:gap-6 md:grid-cols-3">
            {weddingConfig.story.chapters.map((chapter) => (
              <article key={chapter.title} className="theme-inverse-card rounded-[1.5rem] border p-5 md:rounded-[2rem] md:p-6">
                <h3 className="text-2xl md:text-3xl">{chapter.title}</h3>
                <p className="theme-inverse-muted mt-4 text-sm leading-7">{chapter.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section-shell pt-14 sm:pt-20 md:pt-24">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="section-kicker">Galeria</p>
            <h2 className="section-title mt-4">{weddingConfig.gallery.title}</h2>
          </div>
          <p className="max-w-xl text-sm leading-7 text-muted">{weddingConfig.gallery.description}</p>
        </div>

        <div className="mt-8 grid auto-rows-[220px] gap-4 sm:auto-rows-[260px] md:mt-10 md:auto-rows-[280px] md:gap-5 md:grid-cols-12">
          <GalleryCard
            src={weddingConfig.gallery.images[1].src}
            alt={weddingConfig.gallery.images[1].alt}
            className="md:col-span-7 md:row-span-2"
          />
          <GalleryCard
            src={weddingConfig.gallery.images[2].src}
            alt={weddingConfig.gallery.images[2].alt}
            className="md:col-span-5"
          />
          <GalleryCard
            src={weddingConfig.gallery.images[3].src}
            alt={weddingConfig.gallery.images[3].alt}
            className="md:col-span-5"
          />
          <GalleryCard
            src={weddingConfig.gallery.images[4].src}
            alt={weddingConfig.gallery.images[4].alt}
            className="md:col-span-7"
          />
        </div>
      </section>

      <section className="section-shell pt-14 sm:pt-20 md:pt-24">
        <div className="theme-surface grid gap-6 rounded-[1.75rem] border px-4 py-7 shadow-soft md:grid-cols-[0.95fr_1.05fr] md:gap-8 md:px-10 md:py-10">
          <div className="space-y-5">
            <p className="section-kicker">Detalles</p>
            <h2 className="section-title">{weddingConfig.details.title}</h2>
            <p className="text-sm leading-7 text-muted md:text-base md:leading-8">{weddingConfig.details.notes}</p>
            <a
              href={weddingConfig.event.googleMapsUrl}
              target="_blank"
              rel="noreferrer"
              className="theme-button-primary inline-flex w-full justify-center rounded-full px-6 py-3 text-[11px] uppercase tracking-[0.26em] transition hover:bg-gold hover:text-black sm:w-auto sm:text-xs sm:tracking-[0.3em]"
            >
              Abrir Google Maps
            </a>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {[
              { label: "Fecha", value: weddingConfig.event.displayDate },
              { label: "Hora", value: weddingConfig.event.time },
              { label: "Lugar", value: weddingConfig.event.venue },
              { label: "Dress code", value: weddingConfig.event.dressCode },
              { label: "Direccion", value: weddingConfig.event.address },
              { label: "Ciudad", value: weddingConfig.event.city }
            ].map((detail) => (
              <div key={detail.label} className="theme-surface-strong rounded-[1.5rem] border p-4 md:rounded-[1.75rem] md:p-5">
                <p className="text-[10px] uppercase tracking-[0.24em] text-gold md:text-xs md:tracking-[0.28em]">{detail.label}</p>
                <p className="mt-3 text-base leading-7 text-foreground md:mt-4 md:text-lg md:leading-8">{detail.value}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="rsvp" className="section-shell pt-14 sm:pt-20 md:pt-24">
        <div className="theme-surface grid gap-6 rounded-[1.75rem] border px-4 py-7 shadow-soft md:grid-cols-[0.8fr_1.2fr] md:gap-8 md:px-10 md:py-10">
          <div>
            <p className="section-kicker">RSVP</p>
            <h2 className="section-title mt-4">{weddingConfig.rsvp.title}</h2>
            <p className="mt-4 max-w-md text-sm leading-7 text-muted md:mt-5 md:text-base md:leading-8">
              {weddingConfig.rsvp.description}
            </p>
          </div>
          <RsvpForm
            endpoint={weddingConfig.rsvp.endpoint}
            method={weddingConfig.rsvp.method}
            successMessage={weddingConfig.rsvp.successMessage}
          />
        </div>
      </section>

      <section id="calendario" className="section-shell pt-14 sm:pt-20 md:pt-24">
        <div className="theme-inverse rounded-[1.75rem] border px-4 py-7 shadow-soft md:rounded-[2.5rem] md:px-10 md:py-10">
          <p className="section-kicker text-gold/90">Calendario</p>
          <div className="mt-4 flex flex-col gap-6 md:mt-5 md:flex-row md:items-end md:justify-between md:gap-8">
            <div className="max-w-2xl">
              <h2 className="section-title" style={{ color: "var(--inverse-foreground)" }}>{weddingConfig.calendar.title}</h2>
              <p className="theme-inverse-muted mt-4 text-sm leading-7 md:mt-5 md:text-base md:leading-8">{weddingConfig.calendar.description}</p>
            </div>
            <CalendarActions />
          </div>
        </div>
      </section>

      <section className="section-shell pt-14 sm:pt-20 md:pt-24">
        <div className="theme-surface rounded-[1.75rem] border px-4 py-7 text-center shadow-soft md:rounded-[2.5rem] md:px-10 md:py-12">
          <p className="font-title text-3xl leading-tight sm:text-4xl md:text-6xl">
            “{weddingConfig.closing.quote}”
          </p>
          <p className="mx-auto mt-5 max-w-3xl text-sm leading-7 text-muted md:mt-6 md:text-base md:leading-8">
            {weddingConfig.closing.farewell}
          </p>
          <p className="mt-6 font-title text-2xl text-gold sm:text-3xl md:mt-8 md:text-4xl">
            {weddingConfig.couple.signature}
          </p>
        </div>
      </section>

      <footer className="section-shell pt-12 md:pt-16">
        <div className="border-t border-line py-6 text-center text-[10px] uppercase tracking-[0.22em] text-muted sm:text-xs sm:tracking-[0.28em] md:py-8">
          {weddingConfig.footer.text}
        </div>
      </footer>
    </main>
  );
}

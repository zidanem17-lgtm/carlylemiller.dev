import { Reveal } from "./Reveal";
import { SectionLabel } from "./SectionLabel";

const DEFAULT_DESCRIPTION =
  "Open to cybersecurity, digital forensics, SOC, SIEM, and federal or defense contractor " +
  "opportunities aligned with mission-focused security work.";

export function Contact({ description = DEFAULT_DESCRIPTION }: { description?: string }) {
  return (
    <section id="contact" className="relative border-t border-border py-28">
      <div className="mx-auto max-w-4xl px-6 text-center">
        <Reveal className="flex justify-center">
          <SectionLabel index="05" title="Contact" />
        </Reveal>
        <Reveal delay={80}>
          <h2 className="mt-8 font-serif text-5xl leading-tight sm:text-6xl">
            Let&rsquo;s <span className="italic text-gradient">connect.</span>
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-muted-foreground">
            {description}
          </p>
        </Reveal>
        <Reveal delay={160} className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <a
            href="mailto:c.miller@carlylemiller.dev"
            className="rounded-lg bg-primary px-6 py-3 font-display text-sm font-medium text-primary-foreground transition-all hover:bg-primary/90 hover:glow-primary"
          >
            Email Me
          </a>
          <a
            href="https://www.linkedin.com/in/carlyle-miller"
            target="_blank"
            rel="noreferrer"
            className="rounded-lg border border-border px-6 py-3 font-display text-sm font-medium text-foreground transition-colors hover:bg-secondary"
          >
            LinkedIn
          </a>
          <a
            href="https://github.com/zidanem17-lgtm"
            target="_blank"
            rel="noreferrer"
            className="rounded-lg border border-border px-6 py-3 font-display text-sm font-medium text-foreground transition-colors hover:bg-secondary"
          >
            GitHub
          </a>
        </Reveal>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="border-t border-border py-10">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-6 sm:flex-row">
        <span className="font-mono text-sm text-muted-foreground">carlylemiller.dev</span>
        <span className="font-mono text-xs text-muted-foreground">
          © 2016 Carlyle Miller
        </span>
      </div>
    </footer>
  );
}
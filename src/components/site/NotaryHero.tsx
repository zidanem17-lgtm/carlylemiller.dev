import { useRef } from "react";
import { NotarySeal } from "@/components/scene/NotarySeal";

const HIGHLIGHTS = [
  { label: "Commissioned", value: "State of Oklahoma" },
  { label: "Remote Signings", value: "Available via BlueNotary" },
  { label: "In-Person / Mobile", value: "Available on request" },
];

export function NotaryHero() {
  const contentRef = useRef<HTMLDivElement>(null);

  const handleParallax = (e: React.PointerEvent<HTMLElement>) => {
    const el = contentRef.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const x = e.clientX / window.innerWidth - 0.5;
    const y = e.clientY / window.innerHeight - 0.5;
    el.style.transform = `translate3d(${x * -16}px, ${y * -12}px, 0)`;
  };

  return (
    <section
      id="notary-top"
      onPointerMove={handleParallax}
      className="relative min-h-screen overflow-hidden"
    >
      <div className="absolute inset-0">
        <NotarySeal stateName="Oklahoma" />
      </div>
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_30%_40%,transparent_0%,var(--background)_78%)]" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-background to-transparent" />

      <div
        ref={contentRef}
        className="relative z-10 mx-auto flex min-h-screen max-w-7xl flex-col items-end justify-center px-6 pt-28 pb-16 text-right transition-transform duration-500 ease-out will-change-transform"
      >
        <p className="reveal reveal-in font-mono text-xs uppercase tracking-[0.28em] text-primary-glow">
          Notary Public · Remote &amp; Mobile Signings
        </p>

        <h1
          className="reveal reveal-in mt-6 max-w-2xl text-balance text-5xl leading-[0.95] sm:text-7xl"
          style={{ animationDelay: "80ms" }}
        >
          <span className="font-serif text-foreground">Sealed, signed, </span>
          <span className="font-serif italic text-gradient">and notarized.</span>
        </h1>

        <p
          className="reveal reveal-in mt-8 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg"
          style={{ animationDelay: "160ms" }}
        >
          Commissioned notary public in the State of Oklahoma, offering acknowledgments, jurats,
          oaths and affirmations, loan signings, and more — in person, mobile, or remotely online
          via BlueNotary.
        </p>

        <div
          className="reveal reveal-in mt-10 flex flex-wrap items-center justify-end gap-4"
          style={{ animationDelay: "240ms" }}
        >
          <a
            href="#contact"
            className="rounded-lg bg-primary px-6 py-3 font-display text-sm font-medium text-primary-foreground transition-all hover:bg-primary/90 hover:glow-primary"
          >
            Request a Signing
          </a>
          <a
            href="/"
            className="rounded-lg border border-border px-6 py-3 font-display text-sm font-medium text-foreground transition-colors hover:bg-secondary"
          >
            Back to Portfolio
          </a>
        </div>

        <div
          className="reveal reveal-in mt-14 w-full max-w-xl overflow-hidden rounded-xl border border-border bg-card/60 shadow-elegant backdrop-blur-md"
          style={{ animationDelay: "320ms" }}
        >
          <div className="flex items-center gap-2 border-b border-border px-4 py-3">
            <span className="size-2 rounded-full bg-accent-cyan animate-pulse-dot" />
            <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
              Available for notarial services
            </span>
          </div>
          <div className="space-y-3 p-5 text-left">
            {HIGHLIGHTS.map((row) => (
              <div key={row.label} className="flex items-center justify-between gap-4">
                <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted-foreground">
                  {row.label}
                </span>
                <span className="font-display text-sm font-medium text-foreground">
                  {row.value}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

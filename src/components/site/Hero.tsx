import { useRef } from "react";
import { ThreatNetwork } from "@/components/scene/ThreatNetwork";

const TERMINAL = [
  { cmd: "whoami", out: "Carlyle Miller" },
  { cmd: "focus", out: "DFIR · SOC · Email Security · Cyber Ops" },
  { cmd: "projects", out: "MailFort · Forenstix · PhishFinder" },
  {
    cmd: "credentials",
    out: "Network+ · Security+ · CySA+ · SecAI+ · CSAP · SecurityX · COITB Web Designer",
  },
];

export function Hero() {
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
    <section id="top" onPointerMove={handleParallax} className="relative min-h-screen overflow-hidden">
      {/* 3D interactive scene */}
      <div className="absolute inset-0">
        <ThreatNetwork />
      </div>
      {/* readability gradients */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_70%_40%,transparent_0%,var(--background)_78%)]" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-background to-transparent" />

      <div
        ref={contentRef}
        className="relative z-10 mx-auto flex min-h-screen max-w-7xl flex-col justify-center px-6 pt-28 pb-16 transition-transform duration-500 ease-out will-change-transform"
      >
        <p className="reveal reveal-in font-mono text-xs uppercase tracking-[0.28em] text-primary-glow">
          Cybersecurity · Digital Forensics · Threat Analysis
        </p>

        <h1 className="reveal reveal-in mt-6 max-w-3xl text-balance text-5xl leading-[0.95] sm:text-7xl" style={{ animationDelay: "80ms" }}>
          <span className="font-serif text-foreground">Doing the work. </span>
          <span className="font-serif italic text-gradient">Building what&rsquo;s missing.</span>
        </h1>

        <p className="reveal reveal-in mt-8 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg" style={{ animationDelay: "160ms" }}>
          Active-duty U.S. Army professional transitioning into cyber operations. Background in
          investigation, evidence analysis, and incident response. The tools came from doing the
          work, not the other way around.
        </p>

        <div className="reveal reveal-in mt-10 flex flex-wrap items-center gap-4" style={{ animationDelay: "240ms" }}>
          <a
            href="#projects"
            className="rounded-lg bg-primary px-6 py-3 font-display text-sm font-medium text-primary-foreground transition-all hover:bg-primary/90 hover:glow-primary"
          >
            View Projects
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
        </div>

        {/* terminal card */}
        <div className="reveal reveal-in mt-14 w-full max-w-xl overflow-hidden rounded-xl border border-border bg-card/60 shadow-elegant backdrop-blur-md" style={{ animationDelay: "320ms" }}>
          <div className="flex items-center gap-2 border-b border-border px-4 py-3">
            <span className="size-2 rounded-full bg-accent-cyan animate-pulse-dot" />
            <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
              Available for cyber opportunities
            </span>
          </div>
          <div className="space-y-3 p-5 font-mono text-sm">
            {TERMINAL.map((row) => (
              <div key={row.cmd}>
                <div className="text-primary-glow">
                  <span className="text-muted-foreground">$ </span>
                  {row.cmd}
                </div>
                <div className="pl-4 text-foreground/80">{row.out}</div>
              </div>
            ))}
            <div className="text-muted-foreground">
              $ <span className="animate-pulse-dot">_</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
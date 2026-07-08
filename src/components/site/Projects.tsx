import { Reveal } from "./Reveal";
import { SectionLabel } from "./SectionLabel";
import { TiltCard } from "./TiltCard";

const PROJECTS = [
  {
    name: "MailFort",
    logo: "/mailfort-logo.jpg",
    tag: "Email Security",
    status: "In Development",
    live: false,
    body: "A modular Gmail threat analysis engine. OAuth authentication, folder-level mailbox scanning, header inspection, DKIM/SPF/DMARC validation, heuristic risk scoring, and explainable structured reports. Expanding into enterprise IMAP abstraction for multi-provider coverage.",
    stack: ["Python", "OAuth 2.0", "Gmail API", "IMAP"],
    href: "https://github.com/zidanem17-lgtm",
    hrefLabel: "View on GitHub",
  },
  {
    name: "Forenstix",
    logo: "/forenstix-logo.png",
    tag: "Digital Forensics",
    status: "Live",
    live: true,
    body: "Flask-based forensic file triage platform. SHA256/MD5 hashing, magic-byte detection, entropy scoring, IOC extraction, VirusTotal API integration, and AI-generated investigation reports.",
    stack: ["Python", "Flask", "VirusTotal"],
    href: "https://forenstix.onrender.com/",
    hrefLabel: "View Forenstix Live",
  },
  {
    name: "PhishFinder",
    logo: "/phishfinder-logo.png",
    tag: "Phishing Defense",
    status: "Live",
    live: true,
    body: "Deployed phishing analysis engine with DNS intelligence, SPF/DKIM/DMARC header inspection, and weighted risk scoring. Produces structured threat reports. Live on Railway.",
    stack: ["Python", "Flask", "Railway"],
    href: "https://github.com/zidanem17-lgtm",
    hrefLabel: "View on GitHub",
  },
];

export function Projects() {
  return (
    <section id="projects" className="relative border-t border-border py-28">
      <div className="mx-auto max-w-7xl px-6">
        <Reveal>
          <SectionLabel index="03" title="Projects" />
          <h2 className="mt-8 font-serif text-4xl leading-tight sm:text-5xl">
            Security work with <span className="italic text-gradient">proof behind it</span>
          </h2>
        </Reveal>

        <div className="mt-12 space-y-6">
          {PROJECTS.map((p, i) => (
            <Reveal key={p.name} delay={i * 80}>
              <TiltCard className="group grid gap-6 rounded-2xl border border-border bg-card/50 p-8 backdrop-blur-sm transition-[transform,border-color] duration-300 hover:border-primary/50 md:grid-cols-[1fr_2fr] md:items-start">
              <div>
                <div className="flex items-center gap-3">
                  <img
                    src={p.logo}
                    alt={p.name}
                    className="size-10 shrink-0 rounded-lg border border-border bg-card object-contain p-1"
                  />
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="rounded-full border border-border px-3 py-1 font-mono text-[11px] uppercase tracking-[0.14em] text-muted-foreground">
                      {p.tag}
                    </span>
                    <span
                      className={
                        "flex items-center gap-1.5 rounded-full px-3 py-1 font-mono text-[11px] uppercase tracking-[0.14em] " +
                        (p.live
                          ? "bg-accent-cyan/10 text-accent-cyan"
                          : "bg-primary/10 text-primary-glow")
                      }
                    >
                      {p.live && <span className="size-1.5 rounded-full bg-accent-cyan animate-pulse-dot" />}
                      {p.status}
                    </span>
                  </div>
                </div>
                <h3 className="mt-4 font-display text-3xl font-bold transition-colors group-hover:text-gradient">
                  {p.name}
                </h3>
              </div>

              <div>
                <p className="text-sm leading-relaxed text-muted-foreground">{p.body}</p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {p.stack.map((t) => (
                    <span
                      key={t}
                      className="rounded-md border border-border bg-secondary/60 px-2.5 py-1 font-mono text-[11px] text-foreground/80"
                    >
                      {t}
                    </span>
                  ))}
                </div>
                <a
                  href={p.href}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-6 inline-flex items-center gap-2 font-display text-sm font-medium text-primary-glow transition-colors hover:text-foreground"
                >
                  {p.hrefLabel}
                  <span aria-hidden className="transition-transform group-hover:translate-x-1">→</span>
                </a>
              </div>
              </TiltCard>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
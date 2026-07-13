import { Reveal } from "./Reveal";
import { SectionLabel } from "./SectionLabel";

const CERTS = [
  "Network+",
  "Security+",
  "CySA+",
  "SecAI+",
  "CSAP",
  "SecurityX",
  "COITB HTML/CSS Web Designer",
];

const ITEMS = [
  {
    title: "U.S. Army, Active Duty",
    body: "Two years of active-duty service built on a decade of self-directed cybersecurity study: systems troubleshooting, operational discipline, accountability, and mission execution under pressure.",
  },
  {
    title: "B.S. Cybersecurity, American Military University",
    body: "Digital forensics concentration. Coursework spans network forensics, computer forensics, cryptography, biometrics, and incident response. Completing August 2026.",
  },
];

export function Experience() {
  return (
    <section id="experience" className="relative border-t border-border bg-grid py-28">
      <div className="mx-auto max-w-7xl px-6">
        <Reveal>
          <SectionLabel index="04" title="Experience" />
          <h2 className="mt-8 font-serif text-4xl leading-tight sm:text-5xl">
            Built through service, <span className="italic text-gradient">study, and execution</span>
          </h2>
        </Reveal>

        <div className="mt-12 grid gap-10 lg:grid-cols-[1.4fr_1fr]">
          <div className="relative space-y-8 border-l border-border pl-8">
            {ITEMS.map((item, i) => (
              <Reveal key={item.title} delay={i * 100} className="relative">
                <span className="absolute -left-[41px] top-1.5 size-3 rounded-full border-2 border-primary bg-background shadow-[0_0_12px_rgba(124,116,255,0.6)]" />
                <h3 className="font-display text-xl font-medium">{item.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{item.body}</p>
              </Reveal>
            ))}
          </div>

          <Reveal delay={120} className="rounded-2xl border border-border bg-card/50 p-8 backdrop-blur-sm">
            <h3 className="font-display text-xl font-medium">Certifications</h3>
            <div className="mt-5 flex flex-wrap gap-2">
              {CERTS.map((c) => (
                <span
                  key={c}
                  className="rounded-lg border border-border bg-secondary/60 px-3 py-1.5 font-mono text-xs text-foreground/85"
                >
                  {c}
                </span>
              ))}
            </div>
            <p className="mt-5 text-sm text-muted-foreground">CompTIA certifications expiring 2029.</p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
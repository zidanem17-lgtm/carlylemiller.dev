import { Reveal } from "./Reveal";
import { SectionLabel } from "./SectionLabel";

const SKILLS = [
  {
    title: "Digital Forensics",
    body: "File triage, hash verification, entropy analysis, Windows artifacts, registry forensics, and structured incident reconstruction.",
  },
  {
    title: "Email Threat Analysis",
    body: "Header inspection, DKIM/SPF/DMARC validation, phishing pattern detection, attachment risk scoring, and BEC investigation.",
  },
  {
    title: "Security Operations",
    body: "SIEM concepts, alert triage, log review, network forensics, incident response workflows, and threat indicator correlation.",
  },
  {
    title: "Tool-Agnostic Execution",
    body: "Effective with or without a dedicated platform. Python, PowerShell, and custom tooling when needed. Capability first; the tool is just how it gets done.",
  },
  {
    title: "Penetration Testing",
    body: "Reconnaissance, enumeration, exploitation fundamentals, vulnerability assessment, and structured reporting — informed by a defender's mindset.",
  },
];

export function Skills() {
  return (
    <section id="skills" className="relative border-t border-border bg-grid py-28">
      <div className="mx-auto max-w-7xl px-6">
        <Reveal>
          <SectionLabel index="02" title="Skills" />
          <h2 className="mt-8 font-serif text-4xl leading-tight sm:text-5xl">
            Where I bring <span className="italic text-gradient">value</span>
          </h2>
        </Reveal>

        <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {SKILLS.map((s, i) => (
            <Reveal
              key={s.title}
              delay={i * 80}
              className="group relative overflow-hidden rounded-2xl border border-border bg-card/50 p-7 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary/50"
            >
              <div className="absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent via-primary to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              <span className="font-mono text-xs text-primary-glow">0{i + 1}</span>
              <h3 className="mt-4 font-display text-xl font-medium">{s.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{s.body}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
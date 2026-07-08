import { Reveal } from "./Reveal";
import { SectionLabel } from "./SectionLabel";

const STATS = [
  { value: "10", label: "Years Learning" },
  { value: "7", label: "Years Practicing" },
  { value: "6", label: "Certifications" },
  { value: "3", label: "Deployed Tools" },
];

export function About() {
  return (
    <section id="about" className="relative border-t border-border py-28">
      <div className="mx-auto max-w-7xl px-6">
        <Reveal>
          <SectionLabel index="01" title="About" />
        </Reveal>

        <div className="mt-10 grid gap-14 lg:grid-cols-[0.9fr_1.1fr]">
          <Reveal>
            <img
              src="/photo.jpg"
              alt="Carlyle Miller"
              className="aspect-square w-32 rounded-2xl border border-border object-cover"
            />
            <h2 className="mt-8 font-serif text-4xl leading-tight sm:text-5xl">
              Calm under pressure. <span className="italic text-gradient">Technical by intent.</span>
            </h2>
            <div className="mt-8 grid grid-cols-2 gap-4">
              {STATS.map((s) => (
                <div
                  key={s.label}
                  className="rounded-xl border border-border bg-card/50 p-5 backdrop-blur-sm"
                >
                  <div className="font-display text-4xl font-bold text-gradient">{s.value}</div>
                  <div className="mt-1 font-mono text-[11px] uppercase tracking-[0.16em] text-muted-foreground">
                    {s.label}
                  </div>
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal delay={120} className="space-y-6 text-base leading-relaxed text-muted-foreground">
            <p>
              Ten years of learning and seven years of hands-on practice produced something
              certifications confirm but do not fully capture: the ability to stay focused under
              pressure, communicate across technical and non-technical teams, and solve problems
              that don&rsquo;t come with instructions.
            </p>
            <p>
              The tools I&rsquo;ve built are evidence of how I think, not a substitute for doing the
              work. <span className="text-foreground">MailFort</span> came from investigating
              email-based threats and needing cleaner signal.{" "}
              <span className="text-foreground">Forenstix</span> came from needing faster file
              triage during forensic analysis.{" "}
              <span className="text-foreground">PhishFinder</span> came from identifying phishing
              patterns without a platform to surface them clearly. The work drove the builds, not the
              other way around.
            </p>
            <p>
              I am expected to complete my Bachelor&rsquo;s degree in cybersecurity with a digital
              forensics concentration in August 2026. The goal: become the analyst who investigates
              clearly, responds quickly, and communicates findings without confusion.
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
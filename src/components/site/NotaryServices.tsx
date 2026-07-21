import { Reveal } from "./Reveal";
import { SectionLabel } from "./SectionLabel";

const SERVICES = [
  {
    title: "Acknowledgments",
    body: "Confirming a signer's identity and willing signature on deeds, contracts, and other legal documents.",
  },
  {
    title: "Jurats",
    body: "Administering an oath and witnessing a signature made under penalty of perjury, such as affidavits.",
  },
  {
    title: "Oaths & Affirmations",
    body: "Formal declarations administered for depositions, sworn statements, and other legal proceedings.",
  },
  {
    title: "Loan Signings",
    body: "Full loan and refinance document packages — mortgage closings handled accurately and on schedule.",
  },
  {
    title: "Real Estate Documents",
    body: "Deeds, title transfers, and other property documents requiring notarization.",
  },
  {
    title: "Powers of Attorney",
    body: "Financial, medical, and general powers of attorney, along with other legal authorizations.",
  },
];

const OPTIONS = [
  {
    title: "Remote Online Notarization",
    body: "Available anywhere via BlueNotary — sign from your own device with a live, recorded video session.",
  },
  {
    title: "Mobile Notary",
    body: "I travel to you — home, office, hospital, or another location that works for your schedule.",
  },
  {
    title: "In-Person by Appointment",
    body: "Meet directly for straightforward signings that don't require travel or a remote session.",
  },
];

export function NotaryServices() {
  return (
    <>
      <section id="services" className="relative border-t border-border bg-grid py-28">
        <div className="mx-auto max-w-7xl px-6">
          <Reveal>
            <SectionLabel index="01" title="Services" />
            <h2 className="mt-8 font-serif text-4xl leading-tight sm:text-5xl">
              Notarial acts, <span className="italic text-gradient">done right.</span>
            </h2>
          </Reveal>

          <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {SERVICES.map((s, i) => (
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

          <Reveal delay={480} className="mt-8 text-sm text-muted-foreground">
            Fees vary by document type and signing complexity —{" "}
            <a href="#contact" className="text-primary-glow underline-offset-4 hover:underline">
              get in touch for a quote
            </a>
            .
          </Reveal>
        </div>
      </section>

      <section id="how-it-works" className="relative border-t border-border py-28">
        <div className="mx-auto max-w-7xl px-6">
          <Reveal>
            <SectionLabel index="02" title="How to Get Notarized" />
            <h2 className="mt-8 font-serif text-4xl leading-tight sm:text-5xl">
              Wherever you are, <span className="italic text-gradient">however works.</span>
            </h2>
          </Reveal>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {OPTIONS.map((o, i) => (
              <Reveal
                key={o.title}
                delay={i * 100}
                className="rounded-2xl border border-border bg-card/50 p-8 backdrop-blur-sm"
              >
                <h3 className="font-display text-xl font-medium">{o.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{o.body}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

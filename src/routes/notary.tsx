import { createFileRoute } from "@tanstack/react-router";
import { NotaryNavbar } from "@/components/site/NotaryNavbar";
import { NotaryHero } from "@/components/site/NotaryHero";
import { NotaryServices } from "@/components/site/NotaryServices";
import { Contact, Footer } from "@/components/site/Contact";

export const Route = createFileRoute("/notary")({
  head: () => ({
    meta: [
      { title: "Carlyle Miller — Notary Public" },
      {
        name: "description",
        content:
          "Commissioned notary public in the State of Oklahoma. Acknowledgments, jurats, oaths and affirmations, loan signings, and more — in person, mobile, or remotely online via BlueNotary.",
      },
      { property: "og:title", content: "Carlyle Miller — Notary Public" },
      {
        property: "og:description",
        content:
          "Commissioned notary public in the State of Oklahoma, offering remote online notarization via BlueNotary as well as in-person and mobile signings.",
      },
      { property: "og:type", content: "website" },
    ],
  }),
  component: NotaryPage,
});

function NotaryPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <NotaryNavbar />
      <main>
        <NotaryHero />
        <NotaryServices />
        <Contact description="Need something notarized? Reach out with the document type, timeline, and whether you'd prefer a remote, mobile, or in-person signing." />
      </main>
      <Footer />
    </div>
  );
}

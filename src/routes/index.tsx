import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { Registration } from "@/components/Registration";
import { About } from "@/components/About";
import { Impact } from "@/components/Impact";
import { Process } from "@/components/Process";
import { Quotes } from "@/components/Quotes";
import { Gallery } from "@/components/Gallery";
import { Volunteer } from "@/components/Volunteer";
import { CTA } from "@/components/CTA";
import { Footer } from "@/components/Footer";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "गाथालिखाण — संत तुकाराम महाराज गाथा हस्तलिखाण अभियान" },
      {
        name: "description",
        content:
          "एक लाख गाथा हस्तलिखाण सेवेत सहभागी व्हा. संत तुकाराम महाराजांच्या गाथेच्या हस्तलिखाणाद्वारे भक्ती, सेवा आणि वारकरी परंपरेचे संवर्धन.",
      },
      { property: "og:title", content: "गाथालिखाण — सामूहिक गाथा हस्तलिखाण अभियान" },
      { property: "og:description", content: "भक्ती, सेवा व संस्कृतीचा दिव्य उपक्रम." },
      { property: "og:type", content: "website" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
});

function Index() {
  return (
    <main className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <Navbar />
      <Hero />
      <About />
      <Impact />
      <Process />
      <Quotes />
      <Gallery />
      <Volunteer />
      <CTA />
      <Footer />
    </main>
  );
}

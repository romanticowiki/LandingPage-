import { FinalCallout } from "@/components/FinalCallout";
import { Footer } from "@/components/Footer";
import { FrequentlyAsked } from "@/components/FrequentlyAsked";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Interfaces } from "@/components/Interfaces";
import { LabContext } from "@/components/LabContext";
import { Outcomes } from "@/components/Outcomes";
import { RfdSignature } from "@/components/RfdSignature";
import { SessionJourney } from "@/components/SessionJourney";
import { faqs } from "@/lib/content";
import { serializeJsonLd } from "@/lib/json-ld";

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      name: "Aula Remota",
      url: "https://aulasremotas.net",
      inLanguage: "es-MX",
      description:
        "Proyecto de RFD Innovations para acceder a escritorios y aplicaciones académicas desde el navegador.",
      publisher: { "@id": "https://aulasremotas.net/#organization" },
    },
    {
      "@type": "Organization",
      "@id": "https://aulasremotas.net/#organization",
      name: "RFD Innovations",
      url: "https://aulasremotas.net",
      logo: "https://aulasremotas.net/rfd-innovations-logo.png",
    },
    {
      "@type": "FAQPage",
      mainEntity: faqs.map((item) => ({
        "@type": "Question",
        name: item.question,
        acceptedAnswer: { "@type": "Answer", text: item.answer },
      })),
    },
  ],
};

export default function Home() {
  return (
    <>
      <a className="skip-link" href="#contenido-principal">
        Saltar al contenido
      </a>
      <Header />
      <main id="contenido-principal">
        <Hero />
        <LabContext />
        <Outcomes />
        <SessionJourney />
        <Interfaces />
        <RfdSignature />
        <FrequentlyAsked />
        <FinalCallout />
      </main>
      <Footer />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(structuredData) }}
      />
    </>
  );
}

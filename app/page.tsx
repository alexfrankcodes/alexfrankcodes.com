import Header from "@/components/Header";
import Hero from "@/components/Hero";
import About from "@/components/About";
import WorkingWith from "@/components/WorkingWith";
import Building from "@/components/Building";
import Mentorship from "@/components/Mentorship";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import ContourField from "@/components/ContourField";
import { socialLinks } from "@/data/socialLinks";

const SITE_URL = "https://alexfrankcodes.com";

export default function Home() {
  const personJsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Alex Frank",
    url: SITE_URL,
    image: `${SITE_URL}/img/pro.png`,
    jobTitle: "Software Engineer",
    worksFor: {
      "@type": "Organization",
      name: "Southwest Airlines",
    },
    address: {
      "@type": "PostalAddress",
      addressLocality: "San Jose",
      addressRegion: "CA",
      addressCountry: "US",
    },
    sameAs: socialLinks
      .filter((link) => link.href.startsWith("http"))
      .map((link) => link.href),
  };

  return (
    <div className="relative">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
      />
      <ContourField />
      <div className="mx-auto max-w-column px-6">
        <Header />
        <main>
          <Hero />
          <About />
          <WorkingWith />
          <Building />
          <Mentorship />
          <Contact />
        </main>
        <Footer />
      </div>
    </div>
  );
}

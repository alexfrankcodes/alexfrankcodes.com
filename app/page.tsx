import Header from "@/components/Header";
import Hero from "@/components/Hero";
import About from "@/components/About";
import WorkingWith from "@/components/WorkingWith";
import Building from "@/components/Building";
import Mentorship from "@/components/Mentorship";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import ContourField from "@/components/ContourField";

export default function Home() {
  return (
    <div className="relative">
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

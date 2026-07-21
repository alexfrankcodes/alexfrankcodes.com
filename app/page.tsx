import Header from "@/components/Header";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Building from "@/components/Building";
import Mentorship from "@/components/Mentorship";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="mx-auto max-w-column px-6">
      <Header />
      <main>
        <Hero />
        <About />
        <Building />
        <Mentorship />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

import About from "../components/About";
import Contact from "../components/Contact";
import FeaturedProjects from "../components/FeaturedProjects";
import Footer from "../components/Footer";
import Landing from "../components/Landing";
import Mentorship from "../components/Mentorship";
import Navbar from "../components/Navbar";
import ProgressBar from "../components/ProgressBar";

export default function Home() {
  return (
    <main className="flex flex-col items-center mx-auto max-w-screen-lg">
      <Navbar />
      <Landing />
      <About />
      <FeaturedProjects />
      <Mentorship />
      <Contact />
      <Footer />
      <ProgressBar />
    </main>
  );
}

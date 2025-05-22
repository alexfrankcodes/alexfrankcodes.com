import Navbar from "../components/common/Navbar";
import ProgressBar from "../components/common/ProgressBar";
import About from "../components/about/About";
import Contact from "../components/Contact";
import FeaturedProjects from "../components/projects/FeaturedProjects";
import Footer from "../components/common/Footer";
import Landing from "../components/Landing";
import Mentorship from "../components/mentorship/Mentorship";

export default function Home() {
  return (
    <main className="flex flex-col items-center mx-auto max-w-screen-lg pt-16">
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

import About from "./components/About";
import FeaturedProjects from "./components/FeaturedProjects";
import Landing from "./components/Landing";
import Navbar from "./components/Navbar";

export default function Home() {
  return (
    <main className="flex flex-col items-center mx-auto max-w-screen-lg">
      <Navbar />
      <Landing />
      <About />
      <FeaturedProjects />
    </main>
  );
}

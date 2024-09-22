import dynamic from "next/dynamic";

import Navbar from "../components/common/Navbar";
import ProgressBar from "../components/common/ProgressBar";

const About = dynamic(() => import("../components/about/About"), {
  loading: () => <p>Loading...</p>,
});
const Contact = dynamic(() => import("../components/Contact"), {
  loading: () => <p>Loading...</p>,
});
const FeaturedProjects = dynamic(
  () => import("../components/projects/FeaturedProjects"),
  {
    loading: () => <p>Loading...</p>,
  }
);
const Footer = dynamic(() => import("../components/common/Footer"), {
  loading: () => <p>Loading...</p>,
});
const Landing = dynamic(() => import("../components/Landing"), {
  loading: () => <p>Loading...</p>,
});
const Mentorship = dynamic(
  () => import("../components/mentorship/Mentorship"),
  {
    loading: () => <p>Loading...</p>,
  }
);

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

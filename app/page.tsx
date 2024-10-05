import dynamic from "next/dynamic";

import Navbar from "../components/common/Navbar";
import ProgressBar from "../components/common/ProgressBar";
import SkeletonLoader from "../components/common/SkeletonLoader";

const About = dynamic(() => import("../components/about/About"), {
  loading: () => <SkeletonLoader />,
});
const Contact = dynamic(() => import("../components/Contact"), {
  loading: () => <SkeletonLoader />,
});
const FeaturedProjects = dynamic(
  () => import("../components/projects/FeaturedProjects"),
  {
    loading: () => <SkeletonLoader />,
  }
);
const Footer = dynamic(() => import("../components/common/Footer"), {
  loading: () => <SkeletonLoader />,
});
const Landing = dynamic(() => import("../components/Landing"), {
  loading: () => <SkeletonLoader />,
});
const Mentorship = dynamic(
  () => import("../components/mentorship/Mentorship"),
  {
    loading: () => <SkeletonLoader />,
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

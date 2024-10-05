import dynamic from "next/dynamic";

import Navbar from "../components/common/Navbar";
import ProgressBar from "../components/common/ProgressBar";
import SkeletonLoader from "../components/common/SkeletonLoader";

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const About = dynamic(() => 
  sleep(2000).then(() => {
    console.log('About component loaded');
    return import("../components/about/About");
  }), {
  loading: () => {
    console.log('About component loading');
    return <SkeletonLoader />;
  },
  ssr: false,
});
const Contact = dynamic(() => 
  sleep(2000).then(() => import("../components/Contact")), {
  loading: () => <SkeletonLoader />,
  ssr: false,
});
const FeaturedProjects = dynamic(
  () => sleep(2000).then(() => import("../components/projects/FeaturedProjects")),
  {
    loading: () => <SkeletonLoader />,
    ssr: false,
  }
);
const Footer = dynamic(() => 
  sleep(2000).then(() => import("../components/common/Footer")), {
  loading: () => <SkeletonLoader />,
  ssr: false,
});
const Landing = dynamic(() => 
  sleep(2000).then(() => import("../components/Landing")), {
  loading: () => <SkeletonLoader />,
  ssr: false,
});
const Mentorship = dynamic(
  () => sleep(2000).then(() => import("../components/mentorship/Mentorship")),
  {
    loading: () => <SkeletonLoader />,
    ssr: false,
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

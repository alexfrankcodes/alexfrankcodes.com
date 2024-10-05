import dynamic from "next/dynamic";

import Navbar from "../components/common/Navbar";
import ProgressBar from "../components/common/ProgressBar";
import {
  LandingSkeleton,
  AboutSkeleton,
  ProjectsSkeleton,
  MentorshipSkeleton,
  ContactSkeleton,
  FooterSkeleton
} from "../components/common/SkeletonLoader";

const About = dynamic(() => import("../components/about/About"), {
  loading: () => <AboutSkeleton />,
  ssr: false,
});

const Contact = dynamic(() => import("../components/Contact"), {
  loading: () => <ContactSkeleton />,
  ssr: false,
});

const FeaturedProjects = dynamic(
  () => import("../components/projects/FeaturedProjects"),
  {
    loading: () => <ProjectsSkeleton />,
    ssr: false,
  }
);

const Footer = dynamic(() => import("../components/common/Footer"), {
  loading: () => <FooterSkeleton />,
  ssr: false,
});

const Landing = dynamic(() => import("../components/Landing"), {
  loading: () => <LandingSkeleton />,
  ssr: false,
});

const Mentorship = dynamic(
  () => import("../components/mentorship/Mentorship"),
  {
    loading: () => <MentorshipSkeleton />,
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

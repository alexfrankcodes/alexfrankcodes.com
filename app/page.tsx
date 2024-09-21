import dynamic from "next/dynamic";

const About = dynamic(() => import("../components/about/About"), {
  loading: () => <p>Loading...</p>,
});
const Contact = dynamic(() => import("../components/Contact"));
const FeaturedProjects = dynamic(
  () => import("../components/projects/FeaturedProjects")
);
const Footer = dynamic(() => import("../components/common/Footer"));
const Landing = dynamic(() => import("../components/Landing"));
const Mentorship = dynamic(() => import("../components/mentorship/Mentorship"));
const Navbar = dynamic(() => import("../components/common/Navbar"), { ssr: true });
const ProgressBar = dynamic(() => import("../components/common/ProgressBar"));

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

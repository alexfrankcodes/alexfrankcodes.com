import dynamic from 'next/dynamic';

const About = dynamic(() => import("../components/About"), {
  loading: () => <p>Loading...</p>
});
const Contact = dynamic(() => import("../components/Contact"));
const FeaturedProjects = dynamic(() => import("../components/FeaturedProjects"));
const Footer = dynamic(() => import("../components/Footer"));
const Landing = dynamic(() => import("../components/Landing"));
const Mentorship = dynamic(() => import("../components/Mentorship"));
const Navbar = dynamic(() => import("../components/Navbar"), { ssr: true });
const ProgressBar = dynamic(() => import("../components/ProgressBar"));

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

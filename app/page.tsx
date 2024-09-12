import About from "./components/About";
import Landing from "./components/Landing";
import Navbar from "./components/Navbar";

export default function Home() {
  return (
    <main className="flex flex-col items-center">
      <Navbar />
      <Landing />
      <About />
    </main>
  );
}

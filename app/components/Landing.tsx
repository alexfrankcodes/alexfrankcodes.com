import Link from "next/link";
import { FaDownload, FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";

const Landing = () => {
  return (
    <section className=" text-white py-16 text-center mt-24">
      <h1 className="text-7xl font-bold mb-4">Alex Frank</h1>
      <p className="text-3xl text-gray-400 mb-6">Full-Stack Developer</p>
      <div className="flex justify-center space-x-4 mb-8">
        <Link
          href="https://github.com"
          className="text-gray-400 hover:text-pink-500"
        >
          <FaGithub size={24} />
        </Link>
        <Link
          href="https://linkedin.com"
          className="text-gray-400 hover:text-pink-500"
        >
          <FaLinkedin size={24} />
        </Link>
        <Link
          href="https://twitter.com"
          className="text-gray-400 hover:text-pink-500"
        >
          <FaTwitter size={24} />
        </Link>
      </div>

      <Link
        href="/work"
        className="bg-pink-600 hover:bg-pink-700 text-white py-2 px-6 rounded-full inline-flex items-center"
      >
        Download My Resume
        <FaDownload size={18} className="m-2" />
      </Link>
    </section>
  );
};

export default Landing;

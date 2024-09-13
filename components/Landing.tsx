"use client";
import Link from "next/link";
import { FaDownload, FaGithub, FaLinkedin } from "react-icons/fa";
import { MdEmail } from "react-icons/md";

const Landing = () => {
  return (
    <section id="home" className=" text-white py-16 text-center mt-12">
      <h1 className="text-7xl font-bold mb-4">Alex Frank</h1>
      <p className="text-3xl text-gray-400 mb-6">Full-Stack Developer</p>
      <div className="flex justify-center space-x-4 mb-8">
        <Link
          href="https://github.com/alexfrankcodes"
          className="text-gray-400 hover:text-pink-500"
        >
          <FaGithub size={24} />
        </Link>
        <Link
          href="https://www.linkedin.com/in/alexfrankcodes/"
          className="text-gray-400 hover:text-pink-500"
        >
          <FaLinkedin size={24} />
        </Link>
        <Link
          href="mailto:alexfrankcodes@gmail.com"
          className="text-gray-400 hover:text-pink-500"
        >
          <MdEmail size={24} />
        </Link>
      </div>

      <a
        href="./AlexanderFrank_Resume.pdf"
        className="bg-pink-600 hover:bg-pink-700 text-white py-2 px-6 rounded-full inline-flex items-center"
        download
      >
        Download My Resume
        <FaDownload size={18} className="m-2" />
      </a>
    </section>
  );
};

export default Landing;

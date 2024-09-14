"use client";
import { motion } from "framer-motion";
import { FaDownload } from "react-icons/fa";
import SocialLinks from "./common/SocialLinks";
const Landing = () => {
  return (
    <section id="home" className=" text-white py-16 text-center mt-12">
      <h1 className="text-7xl font-bold mb-4">Alex Frank</h1>
      <p className="text-3xl text-gray-400 mb-6">Full-Stack Developer</p>

      <SocialLinks size={24} />

      <motion.a
        href="./AlexanderFrank_Resume.pdf"
        className="bg-pink-600 hover:bg-pink-700 text-white py-2 px-6 mt-8 rounded-full inline-flex items-center"
        download
        whileHover={{ scale: 1.1 }}
        transition={{ duration: 0.2, ease: "easeInOut" }}
      >
        Download My Resume
        <FaDownload size={18} className="m-2" />
      </motion.a>
    </section>
  );
};

export default Landing;

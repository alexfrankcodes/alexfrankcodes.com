"use client";
import { motion } from "framer-motion";
import { FaDownload } from "react-icons/fa";
import SocialLinks from "./common/SocialLinks";
const Landing = () => {
  return (
    <section id="home" className="text-white py-16 text-center ">
      <h1 className="text-7xl font-bold mb-4 text-foreground dark:text-foreground-dark">
        Alex Frank
      </h1>
      <p className="text-3xl text-muted-foreground dark:text-muted-foreground-dark mb-6">
        Full-Stack Developer
      </p>

      <SocialLinks size={24} />

      <motion.a
        href="./AlexanderFrank_Resume.pdf"
        className="bg-accent dark:bg-accent-dark hover:bg-accent-secondary dark:hover:bg-accent-secondary-dark text-white py-2 px-6 mt-8 rounded-full inline-flex items-center"
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

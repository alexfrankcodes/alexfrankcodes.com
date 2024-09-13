"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { MdEmail } from "react-icons/md";

const Contact = () => {
  return (
    <section id="contact" className="bg-gray-900 py-16">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-4xl font-bold mb-8 text-white">Get in Touch</h2>
        <p className="text-xl text-gray-400 mb-12 max-w-2xl mx-auto">
          I{"'"}m always open to new opportunities, collaborations, and
          mentorship requests. Feel free to reach out!
        </p>
        <div className="flex justify-center space-x-8">
          <motion.div whileHover={{ scale: 1.1, y: -5 }}>
            <Link
              href="https://github.com/alexfrankcodes"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition-colors"
            >
              <FaGithub size={32} />
            </Link>
          </motion.div>
          <motion.div whileHover={{ scale: 1.1, y: -5 }}>
            <Link
              href="https://www.linkedin.com/in/alexfrankcodes/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition-colors"
            >
              <FaLinkedin size={32} />
            </Link>
          </motion.div>
          <motion.div whileHover={{ scale: 1.1, y: -5 }}>
            <Link
              href="mailto:alexfrankcodes@gmail.com"
              className="text-gray-400 hover:text-white transition-colors"
            >
              <MdEmail size={32} />
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;

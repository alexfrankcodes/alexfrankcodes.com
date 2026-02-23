"use client";
import { motion } from "framer-motion";
import { FaDownload } from "react-icons/fa";
import { SECTION_IDS } from "@/data/navigation";
import SocialLinks from "@/components/common/SocialLinks";

const stagger = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.15, delayChildren: 0.1 },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

const Landing = () => {
  return (
    <section id={SECTION_IDS.home} className="relative py-24 md:py-32 text-center overflow-hidden">
      {/* Radial glow */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none" aria-hidden="true">
        <div className="w-[600px] h-[600px] rounded-full bg-accent/10 blur-[120px]" />
      </div>

      {/* Decorative accent line */}
      <div className="absolute top-12 left-1/2 -translate-x-1/2 w-12 h-px bg-accent/60" aria-hidden="true" />

      <motion.div
        className="relative z-10"
        variants={stagger}
        initial="hidden"
        animate="visible"
      >
        <motion.h1
          className="text-6xl md:text-8xl lg:text-9xl font-display italic mb-3 text-foreground tracking-tight"
          variants={fadeUp}
        >
          Alex Frank
        </motion.h1>

        <motion.p
          className="text-lg md:text-xl tracking-[0.2em] uppercase text-muted-foreground mb-10 font-body"
          variants={fadeUp}
        >
          Full-Stack Software Engineer
        </motion.p>

        <motion.div variants={fadeUp}>
          <SocialLinks size={22} />
        </motion.div>

        <motion.a
          href="./AlexanderFrank_Resume.pdf"
          className="group bg-accent hover:bg-accent-secondary text-white py-2.5 px-7 mt-10 rounded-full inline-flex items-center gap-2 focus:outline-none focus:ring-2 focus:ring-accent-secondary transition-colors duration-300 text-sm font-medium tracking-wide"
          download
          variants={fadeUp}
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.2, ease: "easeInOut" }}
        >
          Download My Resume
          <FaDownload size={14} className="transition-transform duration-200 group-hover:-translate-y-0.5" />
        </motion.a>
      </motion.div>
    </section>
  );
};

export default Landing;

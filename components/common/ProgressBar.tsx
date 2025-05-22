"use client";

import { motion, useScroll } from "framer-motion";

const ProgressBar = () => {
  const { scrollYProgress } = useScroll();
  return (
    <motion.div
      className="fixed bottom-0 left-0 right-0 h-2 bg-accent dark:bg-accent-dark z-50"
      style={{ scaleX: scrollYProgress, transformOrigin: "0%" }}
      role="presentation"
      aria-hidden="true"
    />
  );
};

export default ProgressBar;

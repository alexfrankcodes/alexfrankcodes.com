"use client";

import { motion, useScroll } from "framer-motion";

const ProgressBar = () => {
  const { scrollYProgress } = useScroll();
  return (
    <motion.div
      className="fixed bottom-0 left-0 right-0 h-[3px] z-50"
      style={{
        scaleX: scrollYProgress,
        transformOrigin: "0%",
        background: "linear-gradient(90deg, rgb(var(--accent)), rgb(var(--accent-secondary)))",
      }}
      role="presentation"
      aria-hidden="true"
    />
  );
};

export default ProgressBar;

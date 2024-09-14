"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import pro from "../../public/img/pro.png";

const hoverEffect = { scale: 1.1 };

const Avatar = () => (
  <motion.div className="hidden lg:block" whileHover={hoverEffect}>
    <div className="w-64 h-64 rounded-full border-4 border-gray-700 overflow-hidden">
      <Image src={pro} alt="Alex Frank" className="cover" />
    </div>
  </motion.div>
);

export default Avatar;

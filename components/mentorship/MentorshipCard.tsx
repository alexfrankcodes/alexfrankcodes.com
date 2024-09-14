"use client";
import { motion } from "framer-motion";

export const MentorshipCard = ({
  icon: Icon,
  title,
  description,
}: {
  icon: React.ElementType;
  title: string;
  description: string;
}) => (
  <motion.div
    className="bg-gray-800 rounded-lg p-6 flex flex-col items-center text-center"
    whileHover={{ scale: 1.05, y: 0.5, x: -1 }}
  >
    <div className="text-pink-500 mb-4">
      <Icon size={48} />
    </div>
    <h3 className="text-xl font-bold mb-2 text-white">{title}</h3>
    <p className="text-gray-400">{description}</p>
  </motion.div>
);

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
    className="bg-secondary dark:bg-secondary-dark rounded-lg p-6 flex flex-col items-center text-center"
    whileHover={{ scale: 1.05, y: 0.5, x: -1 }}
  >
    <div className="text-accent dark:text-accent-dark mb-4">
      <Icon size={48} />
    </div>
    <h3 className="text-xl font-bold mb-2 text-foreground dark:text-foreground-dark">
      {title}
    </h3>
    <p className="text-muted-foreground dark:text-muted-foreground-dark">
      {description}
    </p>
  </motion.div>
);

"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { FaFile, FaGraduationCap, FaUserFriends } from "react-icons/fa";
import { MentorshipCard } from "./MentorshipCard";

const Mentorship = () => {
  const mentorshipAreas = [
    {
      icon: FaUserFriends,
      title: "One-on-One Coaching",
      description:
        "Personalized guidance tailored to your career goals and current skill level.",
    },
    {
      icon: FaFile,
      title: "Resume Reviews",
      description:
        "Detailed feedback to optimize your resume and improve your chances with potential employers.",
    },
    {
      icon: FaGraduationCap,
      title: "Career Advice",
      description:
        "Insights on job searching, interview preparation, and navigating the tech industry.",
    },
  ];

  return (
    <section
      id="mentorship"
      className="bg-background dark:bg-background-dark my-8"
    >
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold mb-8 text-foreground dark:text-foreground-dark text-center lg:text-start">
          Mentorship
        </h2>
        <p className="text-xl text-muted-foreground dark:text-muted-foreground-dark mb-12 max-w-3xl">
          I{"'"}m passionate about helping the next generation of developers
          grow and succeed. Here are some ways I offer{" "}
          <span className="font-bold italic text-green-500">(100% free!)</span>{" "}
          mentorship to junior engineers and students:
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {mentorshipAreas.map((area, index) => (
            <MentorshipCard key={index} {...area} />
          ))}
        </div>
        <motion.div className="text-center" whileHover={{ scale: 1.1 }}>
          <Link
            href="mailto:alexfrankcodes@gmail.com?subject=Mentorship Request"
            className="inline-block bg-accent dark:bg-accent-dark hover:bg-accent-secondary dark:hover:bg-accent-secondary-dark text-white  py-3 px-8 rounded-full text-lg transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-accent-secondary dark:focus:ring-accent-secondary-dark"
          >
            Hit Me Up!
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default Mentorship;

"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { FaFile, FaGraduationCap, FaUserFriends } from "react-icons/fa";

const MentorshipCard = ({
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
        "In-depth feedback on your projects to help you write cleaner, more efficient code.",
    },
    {
      icon: FaGraduationCap,
      title: "Career Advice",
      description:
        "Insights on job searching, interview preparation, and navigating the tech industry.",
    },
  ];

  return (
    <section id="mentorship" className="bg-gray-900 ">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold mb-8 text-white text-center lg:text-start">
          Mentorship
        </h2>
        <p className="text-xl text-gray-400 mb-12 max-w-3xl">
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
            href="mailto:alexfrankcodes@gmail.com? subject=Mentorship Request"
            className="inline-block bg-pink-600 hover:bg-pink-700 text-white  py-3 px-8 rounded-full text-lg transition-colors duration-300"
          >
            Hit Me Up!
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default Mentorship;

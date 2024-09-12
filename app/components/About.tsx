import Image from "next/image";
import { FaNodeJs, FaReact } from "react-icons/fa";
import {
  SiGraphql,
  SiNextdotjs,
  SiTailwindcss,
  SiTypescript,
} from "react-icons/si";

import pro from "../img/pro.png";

const Avatar = () => (
  <div className="hidden lg:block">
    <div className="w-64 h-64 rounded-full border-4 border-gray-700 overflow-hidden">
      <Image src={pro} alt="Alex Frank" className="cover" />
    </div>
  </div>
);

const Skills = () => (
  <div className="mt-8 lg:mt-0 ">
    <h2 className="text-2xl font-bold mt-6 mb-8 text-white">Skills</h2>
    <div className="lg:ml-24 grid lg:grid-cols-3 grid-cols-2 gap-x-8 gap-y-4 ">
      {[
        { icon: FaReact, name: "React", color: "text-blue-400" },
        {
          icon: SiNextdotjs,
          name: "Next.js",
          color: "text-white",
        },
        { icon: SiTailwindcss, name: "Tailwind", color: "text-teal-400" },
        { icon: SiTypescript, name: "TypeScript", color: "text-blue-500" },
        { icon: FaNodeJs, name: "Node.js", color: "text-green-500" },
        { icon: SiGraphql, name: "GraphQL", color: "text-pink-500" },
      ].map((skill) => (
        <div key={skill.name} className="flex items-center space-x-3">
          <div className={`${skill.bg || ""}`}>
            <skill.icon className={`${skill.color}`} size={28} />
          </div>
          <span className="text-lg">{skill.name}</span>
        </div>
      ))}
    </div>
    <p className="mt-8 text-xl italic">... and many more! 😁</p>
  </div>
);

const About = () => {
  return (
    <section id="about" className="bg-gray-900 text-gray-400 py-82">
      <div className="container mx-auto px-4">
        <div className="lg:flex lg:space-x-12 items-center">
          <div className="lg:w-2/3">
            <h1 className="text-4xl font-bold mb-8 text-white">About Me</h1>
            <p className="mb-4 mr-4">
              Hi there! My name is Alex. I'm currently working as a Software
              Engineer for Southwest Airlines! ✈💖 I work remotely from San
              Jose, CA.
            </p>
            <p className="mb-4 mr-4">
              I'm passionate about building accessible, performant web apps with
              a focus on user experience. I'm experienced with modern web
              technologies including React, Next.js, and GraphQL.
            </p>
            <p className="mb-4 mr-4">
              When I'm not hacking away at code, you can find me exploring new
              hiking trails, spending time with my friends and family, reading,
              or playing video games.
            </p>
          </div>
          <div className="lg:w-1/3 flex flex-col items-center ml-4">
            <Avatar />
          </div>
        </div>
        <Skills />
      </div>
    </section>
  );
};

export default About;

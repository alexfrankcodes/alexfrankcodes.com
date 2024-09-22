import { FaNodeJs, FaReact } from "react-icons/fa";
import {
  SiGraphql,
  SiNextdotjs,
  SiTailwindcss,
  SiTypescript,
} from "react-icons/si";

const Skills = () => {
  const skillsList = [
    { icon: FaReact, name: "React", color: "text-blue-400" },
    {
      icon: SiNextdotjs,
      name: "Next.js",
      color: "text-black dark:text-white",
    },
    { icon: SiTailwindcss, name: "Tailwind", color: "text-teal-400" },
    { icon: SiTypescript, name: "TypeScript", color: "text-blue-500" },
    { icon: FaNodeJs, name: "Node.js", color: "text-green-500" },
    { icon: SiGraphql, name: "GraphQL", color: "text-pink-500" },
  ];

  return (
    <div className="mt-8 lg:mt-0 ">
      <h2 className="text-2xl font-bold mt-6 mb-8 text-foreground dark:text-foreground-dark">
        Skills
      </h2>
      <div className="lg:ml-24 grid lg:grid-cols-3 grid-cols-2 gap-x-8 gap-y-4 ">
        {skillsList.map((skill) => (
          <div key={skill.name} className="flex items-center space-x-3">
            <div className={`${skill.color || ""}`}>
              <skill.icon size={28} />
            </div>
            <span className="text-lg">{skill.name}</span>
          </div>
        ))}
      </div>
      <p className="mt-8 text-xl italic text-center">... and many more!</p>
    </div>
  );
};

export default Skills;

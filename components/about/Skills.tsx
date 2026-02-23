import { skills } from "@/data/skills";

const Skills = () => {
  return (
    <div className="mt-12 lg:mt-8">
      <h2 className="text-2xl font-display italic mt-6 mb-8 text-foreground">
        Skills
      </h2>
      <div className="lg:ml-24 grid lg:grid-cols-3 grid-cols-2 gap-3">
        {skills.map((skill) => (
          <div
            key={skill.name}
            className="group flex items-center gap-3 p-3 rounded-lg transition-all duration-300 hover:bg-accent/5"
          >
            <div className={`${skill.colorClass} p-2 rounded-lg bg-surface transition-colors duration-300 group-hover:bg-accent/10`}>
              <skill.icon size={22} />
            </div>
            <span className="text-sm font-medium text-muted-foreground group-hover:text-foreground transition-colors duration-300">
              {skill.name}
            </span>
          </div>
        ))}
      </div>
      <p className="mt-10 text-base italic text-center text-muted-foreground">
        ... and many more!
      </p>
    </div>
  );
};

export default Skills;

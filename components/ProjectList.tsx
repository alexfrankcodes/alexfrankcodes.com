import { FC } from "react";
import { projects } from "../assets/projects";
import Project from "./Project";
import styles from "../styles/ProjectList.module.scss";

const ProjectList = () => {
  return (
    <>
      <h3>Recent Projects</h3>
      <div className={styles.container}>
        {projects.map((project) => (
          <Project
            title={project.title}
            codeURL={project.codeURL}
            description={project.description}
            demo={project.demo}
            image={project.image}
          />
        ))}
      </div>
    </>
  );
};

export default ProjectList;

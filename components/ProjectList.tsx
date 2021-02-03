import { FC } from "react";
import { projects } from "../assets/projects";
import Project from "./Project";
import styles from "../styles/ProjectList.module.scss";

const ProjectList = () => {
  return (
    <>
      <h3 className={styles.title}>Recent Projects</h3>
      <p className={styles.intro}>
        {" "}
        Here is small portfolio of recent projects I've worked on. More projects
        (as well as additional information on the ones listed) can be found{" "}
        <a
          href="https://github.com/alexfrankcodes"
          target="_blank"
          rel="noopener noreferrer"
        >
          on my Github
        </a>
        .
      </p>
      <div className={styles.container}>
        {projects.map((projectInfo) => (
          <Project {...projectInfo} />
        ))}
      </div>
    </>
  );
};

export default ProjectList;

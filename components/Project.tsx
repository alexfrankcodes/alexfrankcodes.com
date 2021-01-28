import Image from "next/image";
import { ProjectInfo } from "../common/types";
import styles from "../styles/Project.module.scss";

const Project = ({ title, codeURL, description, demo, image }: ProjectInfo) => {
  return (
    <div className={styles.container}>
      <h4 className={styles.projectTitle}>{title}</h4>

      <p>{description}</p>

      <div className={styles.buttons}>
        <button className={styles.viewCodeButton}>
          <a href={codeURL} target="_blank" rel="noopener noreferrer">
            View Code{" "}
          </a>
        </button>
        {demo && (
          <button className={styles.viewDemoButton}>
            <a href={demo} target="_blank" rel="noopener noreferrer">
              View Demo
            </a>
          </button>
        )}
      </div>
    </div>
  );
};

export default Project;

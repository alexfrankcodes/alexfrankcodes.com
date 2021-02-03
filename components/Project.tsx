import { ProjectInfo } from "../common/types";
import styles from "../styles/Project.module.scss";

const Project = ({
  title,
  codeURL,
  description,
  demo,
  technologies,
}: ProjectInfo) => {
  return (
    <div className={styles.container}>
      <div>
        <h4 className={styles.projectTitle}>{title}</h4>
        <a href={codeURL} target="_blank" rel="noopener noreferrer">
          {codeURL}
        </a>
        <p>{description}</p>
      </div>

      {demo && (
        <div className={styles.buttons}>
          <button className={styles.demoButton}>
            <a href={demo} target="_blank" rel="noopener noreferrer">
              View Demo
            </a>
          </button>
        </div>
      )}

      <div>
        <h5> Made with: </h5>
        <ul className={styles.techList}>
          {technologies.map((technology) => (
            <li>{technology}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Project;

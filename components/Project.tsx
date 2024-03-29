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
        <a
          href={`https://${codeURL}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          {codeURL}
        </a>
        <p>{description}</p>
      </div>

      <div>
        {demo && (
          <div className={styles.buttons}>
            <a href={demo} target="_blank" rel="noopener noreferrer">
              <button className={styles.demoButton}>View Demo</button>
            </a>
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
    </div>
  );
};

export default Project;

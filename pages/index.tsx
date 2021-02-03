import Head from "next/head";
import Image from "next/image";
import ProjectList from "../components/ProjectList";
import styles from "../styles/Home.module.scss";

const currentYear = new Date().getFullYear();

const Home = () => (
  <div className={styles.container}>
    <Head>
      <title>Alex Frank | Software Engineer</title>
      <link rel="icon" href="/favicon.ico" />
    </Head>

    <main className={styles.main}>
      <h1 className={styles.title}>Alexander Frank</h1>

      <h2 className={styles.subtitle}>Software Engineer</h2>

      <div className={styles.imgContainer}>
        <Image
          className={styles.img}
          src="/images/me.jpg"
          width="350px"
          height="350px"
          layout="fixed"
        />
      </div>

      <p className={styles.about}>
        Hi there!{" "}
        <span role="img" aria-label="waving hand emoji">
          👋
        </span>{" "}
        My name is Alex. <br /> I'm a passionate, driven engineer seeking a
        full-time position in software development. Please{" "}
        <a
          className={styles.link}
          href="https://github.com/alexfrankcodes"
          target="_blank"
          rel="noopener noreferrer"
        >
          visit my Github
        </a>{" "}
        and{" "}
        <a
          className={styles.link}
          href="/public/documents/AlexanderFrank_Resume.pdf"
          target="_blank"
          rel="noopener noreferrer"
        >
          download the latest version of my resume
        </a>
        .
      </p>

      <ProjectList />
    </main>

    <footer className={styles.footer}>
      <p>
        Built with Next.js + TypeScript. View the source code{" "}
        <a target="_blank" rel="noopener noreferrer">
          here
        </a>
        .
      </p>
      <p>Copyright &copy; Alexander Frank {currentYear}</p>
    </footer>
  </div>
);

export default Home;

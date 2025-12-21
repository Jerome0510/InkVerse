import Link from "next/link";
import styles from "./page.module.css";

const Home = () => {
  return (
    <>
      <section className={styles.homeBackground}>
        <img
          className={styles.homeLogo}
          src="/logos/InkLogoBlanc.png"
          alt="Logo InkVerse"
        />
        <Link href="">
          <img
            className={styles.aboutLogo}
            src="/logos/About.png"
            alt="alller vers About"
          />
        </Link>
      </section>
    </>
  );
};

export default Home;

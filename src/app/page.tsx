import Link from "next/link";
import styles from "./page.module.css";
import ToCategories from "../components/ToCategories";
import LoginButton from "../components/LoginButton";

const Home = () => {
  return (
    <>
      <section className={styles.homeBackground}>
        <LoginButton />
        <img
          className={styles.homeLogo}
          src="/logos/InkLogoBlanc.png"
          alt="Logo InkVerse"
        />
        <Link href="/about">
          <img
            className={styles.aboutLogo}
            src="/logos/About.png"
            alt="alller vers About"
          />
        </Link>
        <ToCategories />
      </section>
    </>
  );
};

export default Home;

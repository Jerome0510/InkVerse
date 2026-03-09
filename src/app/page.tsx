import Link from "next/link";
import styles from "./page.module.css";
import ToCategories from "../components/ToCategories";
import LoginButton from "../components/LoginButton";
import DeleteProfile from "@/components/DeleteProfil";

const Home = () => {
  return (
    <>
      <section className={styles.homeBackground}>
        <LoginButton />
        <DeleteProfile />
        <img
          className={styles.homeLogo}
          src="/logos/InkLogoBlanc.png"
          alt="Logo InkVerse"
        />
        <Link href="/about">
          <img
            className={styles.aboutLogo}
            src="/logos/About.png"
            alt="aller vers About"
          />
        </Link>
        <ToCategories />
      </section>
    </>
  );
};

export default Home;

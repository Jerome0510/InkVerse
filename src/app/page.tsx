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
      </section>
    </>
  );
};

export default Home;

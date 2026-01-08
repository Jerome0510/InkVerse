"use client";

import Link from "next/link";
import styles from "./LinkToHome.module.css";

const LinkToHome = () => {
  return (
    <header className={styles.logoHome}>
      <Link href="/">
        <img
          src="/logos/InkVerseNoTitle.png"
          alt="Aller vers accueil"
          className={styles.logo}
        />
        <p>Accueil</p>
      </Link>
    </header>
  );
};

export default LinkToHome;

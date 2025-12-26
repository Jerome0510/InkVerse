"use client";

import Link from "next/link";
import styles from "./ToCategories.module.css";

const ToCategories = () => {
  return (
    <Link href="/categories" className={styles.linkToCategories}>
      <span className={styles.glow}></span>
      <span className={styles.content}>Entrez dans l'histoire</span>
    </Link>
  );
};

export default ToCategories;

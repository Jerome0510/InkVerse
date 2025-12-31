"use client";

import Link from "next/link";
import { useState } from "react";
import { signIn, useSession } from "next-auth/react";
import Modal from "@/app/ui/Modal";
import styles from "./ToCategories.module.css";

const ToCategories = () => {
  const { data: session } = useSession();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handlePotectClick = () => {
    setIsModalOpen(true);
  };

  return (
    <>
      {session ? (
        <Link href="/categories" className={styles.linkToCategories}>
          <span className={styles.glow}></span>
          <span className={styles.content}>Entrez dans l'histoire</span>
        </Link>
      ) : (
        <button
          type="button"
          onClick={handlePotectClick}
          className={styles.linkToCategories}
        >
          <span className={styles.glow}></span>
          <span className={styles.content}>Entrez dans l'histoire</span>
        </button>
      )}

      {isModalOpen && (
        <Modal
          onClose={() => setIsModalOpen(false)}
          onLogin={() => {
            signIn("google");
          }}
        />
      )}
    </>
  );
};

export default ToCategories;

"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import NextImage from "next/image";
import styles from "./LoginButton.module.css";

const LoginButton = () => {
  const { data: session } = useSession();

  if (session) {
    return (
      <section className={styles.logOutContainer}>
        <button onClick={() => signOut()} className={styles.deconnexionButton}>
          <NextImage
            className={styles.logOutLogo}
            src={session.user?.image || "/default-avatar.png"}
            alt="deconnexion"
            width={20}
            height={20}
          />
          <p>Se deconnecter</p>
        </button>
      </section>
    );
  }

  return (
    <div className={styles.logInContainer}>
      <button
        onClick={() => signIn("google")}
        className={styles.connexionButton}
      >
        <img
          className={styles.googleLogo}
          src="/logos/GoogleImg.png"
          alt="conexion"
        />
        <p>Se connecter</p>
      </button>
    </div>
  );
};

export default LoginButton;

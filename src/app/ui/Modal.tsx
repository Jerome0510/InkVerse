import React from "react";
import styles from "./Modal.module.css";

const Modal = ({
  onClose,
  onLogin,
}: {
  onClose: () => void;
  onLogin: () => void;
}) => {
  return (
    <div className={styles.modalContainer}>
      <div className={styles.modal}>
        <button onClick={onClose} className={styles.close}>
          <img src="/logos/close.png" alt="Fermer" />
        </button>
        <h2 className={styles.title}>CONNEXION RECQUISE</h2>
        <p className={styles.text}>
          Pour acceder aux histoires, veuillez vous connecter.
        </p>
        <div className={styles.loginButton}>
          <button onClick={onLogin} className={styles.logoGoogle}>
            <img src="/logos/GoogleImg.png" alt="connexion" />
            <p>Se connecter</p>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;

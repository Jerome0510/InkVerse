"use client";

import styles from "./ModalDeleteProfil.module.css";

interface ConfirmBoxProps {
  onConfirm: () => void;
  onCancel: () => void;
  isLoading: boolean;
}

const ModalDeleteProfil = ({
  onConfirm,
  onCancel,
  isLoading,
}: ConfirmBoxProps) => {
  return (
    <div className={styles.overlay}>
      <div className={styles.confirmBox}>
        <p>Etes-vous sûr ? </p>
        <p>Cette action supprimera votre compte.</p>
        <div className={styles.validationButton}>
          <button onClick={onConfirm} disabled={isLoading}>
            {isLoading ? "Suppression..." : "Oui, supprimer"}
          </button>
          <button onClick={onCancel} disabled={isLoading}>
            Annuler
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalDeleteProfil;

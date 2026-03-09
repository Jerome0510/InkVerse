"use client";

import { useSession, signOut } from "next-auth/react";
import { useState } from "react";
import ModalDeleteProfil from "@/app/ui/ModalDeleteProfil";
import styles from "./DeleteProfil.module.css";

const DeleteProfile = () => {
  const { data: session } = useSession();
  const [confirm, setConfirm] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleDelete = async () => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/user/deleteAccount", { method: "DELETE" });
      if (res.ok) {
        await signOut({ callbackUrl: "/" });
      } else {
        console.error("Erreur lors de la suppression");
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
      setConfirm(false);
    }
  };

  if (!session) return null;

  return (
    <section className={styles.deleteProfilContainer}>
      <button
        className={styles.deleteProfilButton}
        onClick={() => setConfirm(true)}
      >
        Supprimer mon profil
      </button>

      {confirm && (
        <ModalDeleteProfil
          onConfirm={handleDelete}
          onCancel={() => setConfirm(false)}
          isLoading={isLoading}
        />
      )}
    </section>
  );
};

export default DeleteProfile;

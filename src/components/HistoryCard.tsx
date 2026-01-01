"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import HistoriesModel from "../model/HistoriesModel";
import styles from "./HistoryCard.module.css";

interface HistoryCardProps {
  histories: HistoriesModel[];
}

interface ProgressState {
  [historyId: number]: number;
}

const HistoryCard = ({ histories }: HistoryCardProps) => {
  const router = useRouter();
  const [progress, setProgress] = useState<ProgressState>({});

  useEffect(() => {
    const fetchProgressForHistory = async (historyId: number) => {
      try {
        const res = await fetch(`/api/progress/${historyId}`, {
          cache: "no-store",
        });
        if (res.ok) {
          const data = await res.json();
          if (data?.steps_id != null) {
            setProgress((prev) => ({
              ...prev,
              [historyId]: data.steps_id,
            }));
          }
        }
      } catch (err) {
        console.error("Erreur fetch progress pour histoire", historyId, err);
      }
    };

    histories.forEach((history) => {
      if (history.id) fetchProgressForHistory(history.id);
    });
  }, [histories]);

  const enterHistory = async (history: HistoriesModel) => {
    if (!history.id) return;
    const stepId = progress[history.id] ?? history.first_step_id;
    await router.push(
      `/categories/${history.categories_id}/histories/${history.id}/steps/${stepId}`
    );
  };

  return (
    <section>
      <div className={styles.historiesCard}></div>
      {histories.map((history) => (
        <div key={history.id} className={styles.historyContain}>
          <h2>{history.title}</h2>
          <p>{history.description}</p>
          <button
            onClick={() => enterHistory(history)}
            className={styles.linkToStep}
            disabled={!history.id}
          >
            {progress[history.id] != null
              ? "Continuez votre histoire"
              : "Entrez dans l'histoire"}
          </button>
        </div>
      ))}
    </section>
  );
};

export default HistoryCard;

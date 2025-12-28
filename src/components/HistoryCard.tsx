"use client";

import HistoriesModel from "../model/HistoriesModel";
import Link from "next/link";
import styles from "./HistoryCard.module.css";
import { appRoutes } from "../data/ROUTES";

interface HistoryCardProps {
  histories: HistoriesModel[];
}

const HistoryCard = ({ histories }: HistoryCardProps) => {
  return (
    <section>
      <div className={styles.historiesCard}></div>
      {histories.map((history) => (
        <div key={history.id} className={styles.historyContain}>
          <h2>{history.title}</h2>
          <p>{history.description}</p>
          <Link
            href={appRoutes.STEPS(
              history.categories_id,
              history.id,
              history.first_step_id
            )}
            className={styles.linkToStep}
          >
            entrez dans l'histoire
          </Link>
        </div>
      ))}
    </section>
  );
};

export default HistoryCard;

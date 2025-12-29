"use client";

import ChoiceModel from "../model/ChoiceModel";
import { appRoutes } from "../data/ROUTES";
import styles from "./ChoicesCard.module.css";
import Link from "next/link";
import HistoriesModel from "../model/HistoriesModel";
import CategorieModel from "../model/CategorieModel";

interface ChoicesCardProps {
  categories: CategorieModel;
  histories: HistoriesModel;
  choices: ChoiceModel[];
}

const ChoicesCard = ({ categories, histories, choices }: ChoicesCardProps) => {
  return (
    <div className={styles.choicesContain}>
      <ul className={styles.choicesList}>
        {choices.map((choice) => (
          <li key={choice.id} className={styles.choicesButton}>
            <Link
              href={
                choice.link_to_step_id === 0
                  ? "/"
                  : `/categories/${categories.id}/histories/${histories.id}/steps/${choice.link_to_step_id}`
              }
            >
              {choice.text}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ChoicesCard;

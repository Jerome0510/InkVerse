"use client";

import { useRef, useState } from "react";
import ChoiceModel from "../model/ChoiceModel";
import styles from "./ChoicesCard.module.css";
import Link from "next/link";
import { useRouter } from "next/navigation";
import HistoriesModel from "../model/HistoriesModel";
import CategorieModel from "../model/CategorieModel";

interface ChoicesCardProps {
  categories: CategorieModel;
  histories: HistoriesModel;
  choices: ChoiceModel[];
}

const ChoicesCard = ({ categories, histories, choices }: ChoicesCardProps) => {
  const router = useRouter();
  const [timerChoice, setTimerChoice] = useState<number | null>(null);
  const holdTimerRef = useRef<NodeJS.Timeout | null>(null);

  const timerDown = (
    e: React.MouseEvent<HTMLAnchorElement>,
    choice: ChoiceModel
  ) => {
    e.preventDefault();
    setTimerChoice(choice.id);

    holdTimerRef.current = setTimeout(() => {
      const saveAndNavigate = async (): Promise<void> => {
        if (choice.link_to_step_id !== 0) {
          await fetch("/api/progress", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              historyId: histories.id,
              stepId: choice.link_to_step_id,
            }),
          });
        }

        const targetUrl =
          choice.link_to_step_id === 0
            ? "/"
            : `/categories/${categories.id}/histories/${histories.id}/steps/${choice.link_to_step_id}`;

        router.push(targetUrl);
      };

      void saveAndNavigate();
    }, 1000);
  };

  const timerUp = () => {
    if (holdTimerRef.current) {
      clearTimeout(holdTimerRef.current);
      holdTimerRef.current = null;
    }
    setTimerChoice(null);
  };

  const timerLeave = () => {
    if (holdTimerRef.current) {
      clearTimeout(holdTimerRef.current);
      holdTimerRef.current = null;
    }
    setTimerChoice(null);
  };

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
  };

  return (
    <div className={styles.choicesContain}>
      <ul className={styles.choicesList}>
        {choices.map((choice) => (
          <li
            key={choice.id}
            className={`${styles.choicesButton} ${
              timerChoice === choice.id ? styles.holding : ""
            } ${
              timerChoice !== null && timerChoice !== choice.id
                ? styles.blurred
                : ""
            }`}
          >
            <Link
              href={
                choice.link_to_step_id === 0
                  ? "/"
                  : `/categories/${categories.id}/histories/${histories.id}/steps/${choice.link_to_step_id}`
              }
              onClick={handleClick}
              onMouseDown={(e) => timerDown(e, choice)}
              onMouseUp={timerUp}
              onMouseLeave={timerLeave}
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

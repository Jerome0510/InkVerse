"use client";

import StepModel from "../model/StepModel";
import HistoriesModel from "../model/HistoriesModel";
import styles from "./StepsCard.module.css";

interface StepsCardProps {
  steps: StepModel[];
  histories: HistoriesModel[];
}

const StepsCard = ({ steps, histories }: StepsCardProps) => {
  return (
    <section>
      <h2 className={styles.stepTitle}>{histories[0].title}</h2>
      <div className={styles.StepCard}>
        {steps.map((step) => (
          <div key={step.id} className={styles.stepContain}>
            <div
              className={styles.text}
              dangerouslySetInnerHTML={{ __html: step.text }}
            />
          </div>
        ))}
      </div>
    </section>
  );
};

export default StepsCard;

import { apiRoutes } from "@/src/data/ROUTES";
import StepModel from "@/src/model/StepModel";
import styles from "./steps.module.css";

interface StepsProps {
  params: Promise<{
    categoryId: string | number;
    historyId: string | number;
    stepId: string | number;
  }>;
}

const StepsPage = async ({ params }: StepsProps) => {
  try {
    const { categoryId, historyId, stepId } = await params;

    const apiResult = await fetch(
      apiRoutes.STEPS(categoryId, historyId, stepId),
      {
        cache: "no-store",
      }
    );

    if (!apiResult.ok) {
      throw new Error("Erreur lors du fetch");
    }

    const step: StepModel[] = await apiResult.json();

    return (
      <section className={styles.forStepBackground}>
        <img src={step[0].background} alt="Fond d'ecran" />
        <div>
          <p>ici composant stepCard</p>
        </div>
      </section>
    );
  } catch (error) {
    console.error("Erreur:", error);
    return (
      <div>
        <h1>Erreur</h1>
        <p>Erreur lors du chargement de l' histoire</p>
      </div>
    );
  }
};

export default StepsPage;

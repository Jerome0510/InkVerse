import { apiRoutes } from "@/src/data/ROUTES";
import StepModel from "@/src/model/StepModel";
import styles from "./steps.module.css";
import StepsCard from "@/src/components/StepsCard";
import HistoriesModel from "@/src/model/HistoriesModel";
import ChoiceModel from "@/src/model/ChoiceModel";
import ChoicesCard from "@/src/components/ChoicesCard";
import CategorieModel from "@/src/model/CategorieModel";

interface StepsProps {
  params: {
    categoryId: string | number;
    historyId: string | number;
    stepId: string | number;
  };
}

const StepsPage = async ({ params }: StepsProps) => {
  const { categoryId, historyId, stepId } = await params;
  try {
    const [categoryRes, historyRes, stepRes, choiceRes] = await Promise.all([
      fetch(apiRoutes.CATEGORY(categoryId), { cache: "no-store" }),
      fetch(apiRoutes.HISTORY(categoryId, historyId), { cache: "no-store" }),
      fetch(apiRoutes.STEPS(categoryId, historyId, stepId), {
        cache: "no-store",
      }),
      fetch(apiRoutes.CHOICES(categoryId, historyId, stepId), {
        cache: "no-store",
      }),
    ]);

    if (!historyRes.ok || !stepRes.ok) {
      throw new Error("Erreur lors du fetch ");
    }

    const category: CategorieModel = await categoryRes.json();
    const history: HistoriesModel[] = await historyRes.json();
    const step: StepModel[] = await stepRes.json();
    const choices: ChoiceModel[] = await choiceRes.json();

    return (
      <section className={styles.forStepBackground}>
        <img src={step[0].background} alt="Fond d'ecran" />
        <div>
          <StepsCard histories={history} steps={step} />
          <ChoicesCard
            categories={category}
            histories={history[0]}
            choices={choices}
          />
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

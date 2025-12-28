import { apiRoutes } from "@/src/data/ROUTES";
import HistoriesModel from "@/src/model/HistoriesModel";
import styles from "./history.module.css";

interface HistoriesProps {
  params: Promise<{
    categoryId: string | number;
    historyId: string | number;
  }>;
}

const HistoryPage = async ({ params }: HistoriesProps) => {
  try {
    const { categoryId, historyId } = await params;

    const apiResult = await fetch(apiRoutes.HISTORY(categoryId, historyId), {
      cache: "no-store",
    });

    if (!apiResult.ok) {
      throw new Error("Erreur lors du fetch");
    }

    const history: HistoriesModel[] = await apiResult.json();

    return (
      <section className={styles.forBackground}>
        <img src={history[0].background} alt={history[0].title} />
        <div className={styles.historyContainer}>
          ici le composant historyCard
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

export default HistoryPage;

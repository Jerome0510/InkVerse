type Props = {
  params: {
    categoryId: string;
    historyId: string;
  };
};

const HistoryPage = ({ params }: Props) => {
  return (
    <>
      <h1>Historique {params.historyId}</h1>
      <p>Catégorie {params.categoryId}</p>
    </>
  );
};

export default HistoryPage;

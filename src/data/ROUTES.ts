const apiUrl = process.env.NEXT_PUBLIC_API_URL;
const appUrl = process.env.NEXT_PUBLIC_APP_URL;

const apiRoutes = {
  CATEGORIES: `${apiUrl}/api/categories`,
  CATEGORY: (categoryId: string | number) =>
    `${apiUrl}/api/categories/${categoryId}`,

  HITSORIES: `${apiUrl}/api/histories`,
  HISTORY: (historyId: string | number) =>
    `${apiUrl}/api/histories/${historyId},`,
};

const appRoutes = {
  CATEGORIES: `${appUrl}/categories`,
  CATEGORY: (categoryId: string | number) =>
    `${appUrl}/categories/${categoryId}`,

  HISTORY: (categoryId: string | number, HistoryId: string | number) =>
    `${appUrl}/categories/${categoryId}/histories/${HistoryId}`,
};

export default { apiRoutes, appRoutes };

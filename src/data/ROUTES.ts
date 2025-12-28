const apiUrl = process.env.NEXT_PUBLIC_API_URL;
const appUrl = process.env.NEXT_PUBLIC_APP_URL;

const apiRoutes = {
  CATEGORIES: `${apiUrl}/api/categories`,
  CATEGORY: (categoryId: string | number) =>
    `${apiUrl}/api/categories/${categoryId}`,
  CATEGORY_HISTORIES: (categoryId: string | number) =>
    `${apiUrl}/api/categories/${categoryId}/histories`,
  HISTORY: (categoryId: string | number, historyId: string | number) =>
    `${apiUrl}/api/categories/${categoryId}/histories/${historyId}`,

  STEPS: (
    categoryId: string | number,
    historyId: string | number,
    stepId: string | number
  ) =>
    `${apiUrl}/api/categories/${categoryId}/histories/${historyId}/steps/${stepId}`,
};

const appRoutes = {
  CATEGORIES: `${appUrl}/categories`,
  CATEGORY: (categoryId: string | number) =>
    `${appUrl}/categories/${categoryId}`,
  HISTORY: (categoryId: string | number, historyId: string | number) =>
    `${appUrl}/categories/${categoryId}/histories/${historyId}`,

  STEPS: (
    categoryId: string | number,
    historyId: string | number,
    stepId: string | number
  ) =>
    `${appUrl}/categories/${categoryId}/histories/${historyId}/steps/${stepId}`,
};

export { apiRoutes, appRoutes };

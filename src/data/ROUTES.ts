const apiUrl = process.env.NEXT_PUBLIC_API_URL;
const appUrl = process.env.NEXT_PUBLIC_APP_URL;

const apiRoutes = {
  CATEGORIES: `${apiUrl}/api/categories`,
  CATEGORY: (categoryId: string | number) =>
    `${apiUrl}/api/categories/${categoryId}`,
  CATEGORY_HISTORIES: (categoryId: string | number) =>
    `${apiUrl}/api/categories/${categoryId}/histories`,

  HISTORIES: `${apiUrl}/api/histories`,
  HISTORY: (historyId: string | number) =>
    `${apiUrl}/api/histories/${historyId}`,
};

const appRoutes = {
  CATEGORIES: `${appUrl}/categories`,
  CATEGORY: (categoryId: string | number) =>
    `${appUrl}/categories/${categoryId}`,

  HISTORY: (categoryId: string | number, historyId: string | number) =>
    `${appUrl}/categories/${categoryId}/histories/${historyId}`,
};

export default { apiRoutes, appRoutes };

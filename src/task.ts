import { Category, CategoryListElement, CategoryTree } from './models';

type ApiFunctionResponse = { data: Category[] };

export type CategoryTreeOptions = {
  getApiFunction: () => Promise<ApiFunctionResponse>;
};

export const categoryTree = async (
  options: CategoryTreeOptions
): Promise<CategoryListElement[]> => {
  const { getApiFunction } = options;
  const res = await getApiFunction();

  if (!res.data) {
    return [];
  }

  const tree = CategoryTree.fromCategories(res.data);
  const result = tree.toCategoryListElements();
  return result;
};

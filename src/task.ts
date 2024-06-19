import { getCategories } from './mockedApi';
import { CategoryTree } from './models';

export interface CategoryListElement {
  name: string;
  id: number;
  image: string;
  order: number;
  children: CategoryListElement[];
  showOnHome: boolean;
}

export const categoryTree = async (): Promise<CategoryListElement[]> => {
  const res = await getCategories();

  if (!res.data) {
    return [];
  }

  const tree = CategoryTree.fromCategories(res.data);
  const result = tree.toCategoryListElements();
  return result;
};

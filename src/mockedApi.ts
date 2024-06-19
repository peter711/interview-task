import { INPUT } from './input';
import { Category } from './models';

export const getCategories = async (): Promise<{ data: Category[] }> => ({
  data: INPUT,
});

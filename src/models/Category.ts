/**
 * API response about category
 *
 * @export
 * @interface Category
 */
export interface Category {
  id: number;
  name: string;
  hasChildren: boolean;
  url: string;
  Title: string;
  MetaTagDescription: string;
  children: Category[];
}

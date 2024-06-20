/**
 * Category list element to be displayed
 *
 * @export
 * @interface CategoryListElement
 */
export interface CategoryListElement {
  name: string;
  id: number;
  image: string;
  order: number;
  children: CategoryListElement[];
  showOnHome: boolean;
}

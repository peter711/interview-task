import { CategoryMapper } from '../mappers';

import { Category } from './Category';
import { CategoryListElement } from './CategoryListItem';

export class CategoryTreeItem implements CategoryListElement {
  constructor(
    public id: number,
    public name: string,
    public image: string,
    private _children: CategoryTreeItem[],
    public showOnHome: boolean,
    public order: number
  ) {}

  get children(): CategoryTreeItem[] {
    return this._children.sort((a, b) => a.order - b.order);
  }

  static fromCategory(category: Category) {
    return CategoryMapper.fromCategory(category);
  }

  toCategoryListElement(
    { showOnHome } = { showOnHome: this.showOnHome }
  ): CategoryListElement {
    return CategoryMapper.toCategoryListElement(this, { showOnHome });
  }
}

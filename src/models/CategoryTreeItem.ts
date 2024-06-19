import { containsHashtag } from '../utils';

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
    const { MetaTagDescription, Title, children, id, name } = category;
    const order = CategoryTreeItem.createOrderValue(Title, id);
    const childrenTreeItems = this.createChildren(children);
    return new CategoryTreeItem(
      id,
      name,
      MetaTagDescription,
      childrenTreeItems,
      false,
      order
    );
  }

  toCategoryListElement(
    { showOnHome } = { showOnHome: this.showOnHome }
  ): CategoryListElement {
    return {
      children: this.children?.length
        ? this.children.map((child) => this.toCategoryListElement.apply(child))
        : [],
      id: this.id,
      image: this.image,
      name: this.name,
      order: this.order,
      showOnHome,
    };
  }

  private static createOrderValue(title: string, id: number) {
    let raw = title;
    if (containsHashtag(title)) {
      raw = title.split('#')[0];
    }
    let order = parseInt(raw);
    if (isNaN(order)) {
      order = id;
    }
    return order;
  }

  private static createChildren(children: Category[]): CategoryTreeItem[] {
    return children.map((category) => this.fromCategory(category));
  }
}

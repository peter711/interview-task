import { Category } from './Category';
import { CategoryListElement } from './CategoryListItem';
import { CategoryTreeItem } from './CategoryTreeItem';

export class CategoryTree {
  constructor(
    private _nodes: CategoryTreeItem[],
    private toShowOnHome: number[]
  ) {
    this.toShowOnHome = [];
  }

  get nodes(): CategoryTreeItem[] {
    return this._nodes.sort((a, b) => a.order - b.order);
  }

  toCategoryListElements(): CategoryListElement[] {
    return this.nodes.map((node, index) => {
      const showOnHome = this.getShowOnHomeValue(node.id, index);
      return node.toCategoryListElement({ showOnHome });
    });
  }

  static fromCategories(data: Category[]) {
    const toShowOnHome: number[] = [];

    const items = data.map((category) => {
      if (containsHashtag(category.Title)) {
        toShowOnHome.push(category.id);
      }
      return CategoryTreeItem.fromCategory(category);
    });

    return new CategoryTree(items, toShowOnHome);
  }

  private getShowOnHomeValue(id: number, index: number) {
    if (this.nodes.length <= 5) {
      return true;
    } else if (this.toShowOnHome.length > 0) {
      return this.toShowOnHome.includes(id);
    } else {
      return index < 3;
    }
  }
}

function containsHashtag(value?: string) {
  return value.includes('#');
}

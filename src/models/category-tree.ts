import { Category } from '../mockedApi';
import { CategoryListElement } from '../task';

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

function containsHashtag(value?: string) {
  return value.includes('#');
}

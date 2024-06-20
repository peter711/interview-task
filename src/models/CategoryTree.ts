import { containsHashtag } from '../utils';

import { Category } from './Category';
import { CategoryListElement } from './CategoryListItem';
import { CategoryTreeItem } from './CategoryTreeItem';

/**
 * Tree container class for categories
 *
 * @export
 * @class CategoryTree
 */
export class CategoryTree {
  /**
   * Creates an instance of CategoryTree.
   * @param {CategoryTreeItem[]} _nodes
   * @param {number[]} toShowOnHome
   * @memberof CategoryTree
   */
  constructor(
    private _nodes: CategoryTreeItem[],
    private toShowOnHome: number[]
  ) {
    this.toShowOnHome = [];
  }

  /**
   * Returns sorted array of nodes
   * of CategoryTreeItem.
   *
   *
   * @readonly
   * @type {CategoryTreeItem[]}
   * @memberof CategoryTree
   */
  get nodes(): CategoryTreeItem[] {
    return this._nodes.sort((a, b) => a.order - b.order);
  }

  /**
   * Converts nodes to array of pure CategoryListElement
   *
   * @return {*}  {CategoryListElement[]}
   * @memberof CategoryTree
   */
  toCategoryListElements(): CategoryListElement[] {
    return this.nodes.map((node, index) => {
      const showOnHome = this.getShowOnHomeValue(node.id, index);
      return node.toCategoryListElement({ showOnHome });
    });
  }

  /**
   * Factory method to create instance of Category Tree
   * based on API data response
   *
   * @static
   * @param {Category[]} data
   * @return {*}
   * @memberof CategoryTree
   */
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

  /**
   * Specifies show on home value according to
   * provided code in task
   *
   * @private
   * @param {number} id
   * @param {number} index
   * @return {*}
   * @memberof CategoryTree
   */
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

import { CategoryMapper } from '../mappers';

import { Category } from './Category';
import { CategoryListElement } from './CategoryListItem';

/**
 * Tree item that contains information specified
 * in the CategoryListElement interface
 *
 * @export
 * @class CategoryTreeItem
 * @implements {CategoryListElement}
 */
export class CategoryTreeItem implements CategoryListElement {
  /**
   * Creates an instance of CategoryTreeItem.
   * @param {number} id
   * @param {string} name
   * @param {string} image
   * @param {CategoryTreeItem[]} _children
   * @param {boolean} showOnHome
   * @param {number} order
   * @memberof CategoryTreeItem
   */
  constructor(
    public id: number,
    public name: string,
    public image: string,
    private _children: CategoryTreeItem[],
    public showOnHome: boolean,
    public order: number
  ) {}

  /**
   * Returns sorted children according to
   * order property
   *
   * @readonly
   * @type {CategoryTreeItem[]}
   * @memberof CategoryTreeItem
   */
  get children(): CategoryTreeItem[] {
    return this._children.sort((a, b) => a.order - b.order);
  }

  /**
   * Factory method of creating tree item
   * based on Category
   *
   * @static
   * @param {Category} category
   * @param {*} [fromCategoryMapper=CategoryMapper.fromCategory]
   * @return {*}
   * @memberof CategoryTreeItem
   */
  static fromCategory(
    category: Category,
    fromCategoryMapper = CategoryMapper.fromCategory
  ) {
    return fromCategoryMapper(category);
  }

  /**
   * Convert tree item to CategoryListElement
   *
   * @param {*} [{ showOnHome }={ showOnHome: this.showOnHome }]
   * @param {*} [toCategoryListElementMapper=CategoryMapper.toCategoryListElement]
   * @return {*}  {CategoryListElement}
   * @memberof CategoryTreeItem
   */
  toCategoryListElement(
    { showOnHome } = { showOnHome: this.showOnHome },
    toCategoryListElementMapper = CategoryMapper.toCategoryListElement
  ): CategoryListElement {
    return toCategoryListElementMapper(this, { showOnHome });
  }
}

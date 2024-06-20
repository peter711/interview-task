import { Category } from '../models/Category';
import { CategoryListElement } from '../models/CategoryListItem';
import { CategoryTreeItem } from '../models/CategoryTreeItem';
import { containsHashtag } from '../utils';

/**
 * Mapper util class for converting from Category
 * and to CategoryListItem
 *
 * @export
 * @class CategoryMapper
 */
export class CategoryMapper {
  /**
   * Converts from API data Category
   * to CategoryTreeItem
   *
   * @static
   * @param {Category} data
   * @return {*}  {CategoryTreeItem}
   * @memberof CategoryMapper
   */
  static fromCategory(data: Category): CategoryTreeItem {
    const { MetaTagDescription, Title, children, id, name } = data;

    const order = CategoryMapper.mapToOrderValue(Title, id);

    const childrenTreeItems = children.map((category) =>
      CategoryMapper.fromCategory(category)
    );

    return new CategoryTreeItem(
      id,
      name,
      MetaTagDescription,
      childrenTreeItems,
      false,
      order
    );
  }

  /**
   * Converts tree item to CategoryListElement.
   * Possible to overwrite specified props
   *
   * @static
   * @param {CategoryTreeItem} source
   * @param {{
   *       showOnHome?: boolean;
   *     }} [overwrites]
   * @return {*}  {CategoryListElement}
   * @memberof CategoryMapper
   */
  static toCategoryListElement(
    source: CategoryTreeItem,
    overwrites?: {
      showOnHome?: boolean;
    }
  ): CategoryListElement {
    return {
      children: source.children?.length
        ? source.children.map((child) =>
            CategoryMapper.toCategoryListElement(child)
          )
        : [],
      id: source.id,
      image: source.image,
      name: source.name,
      order: source.order,
      showOnHome: overwrites?.showOnHome || source.showOnHome,
    };
  }

  /**
   * Mapping to order value according to
   * title, then later on according to id
   * as fallback
   *
   * @private
   * @static
   * @param {string} title
   * @param {number} id
   * @return {*}
   * @memberof CategoryMapper
   */
  private static mapToOrderValue(title: string, id: number) {
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
}

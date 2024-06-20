import test from 'ava';

import { Category, CategoryTreeItem } from '../models';

import { CategoryMapper } from './CategoryMapper';

//#region Categories - tests

const categoryInputs: Array<Category> = [
  {
    url: 'fake-url',
    id: 1,
    hasChildren: false,
    children: [],
    MetaTagDescription: 'fake-meta-tag',
    name: 'Category 1',
    Title: 'Some example title',
  },
  {
    url: 'fake-url',
    id: 1,
    hasChildren: false,
    children: [],
    MetaTagDescription: 'fake-meta-tag',
    name: 'Category 1',
    Title: '#1',
  },
  {
    url: 'fake-url',
    id: 1,
    hasChildren: false,
    children: [],
    MetaTagDescription: 'fake-meta-tag',
    name: 'Category 1',
    Title: '2',
  },
];

categoryInputs.forEach((data, index) => {
  test(`CategoryMapper - fromCategory - should have matching snapshot - ${index}`, async (t) => {
    const result = CategoryMapper.fromCategory(data);
    t.snapshot(result);
  });
});

// #endregion

// #region CategoryListElement

const treeItems: Array<CategoryTreeItem> = [
  CategoryTreeItem.fromCategory(categoryInputs[0]),
  CategoryTreeItem.fromCategory(categoryInputs[1]),
  CategoryTreeItem.fromCategory(categoryInputs[2]),
];

treeItems.forEach((data, index) => {
  test(`CategoryMapper - toCategoryListElement - should have matching snapshot - ${index}`, async (t) => {
    const result = CategoryMapper.toCategoryListElement(data);
    t.snapshot(result);
  });
});

// #endregion

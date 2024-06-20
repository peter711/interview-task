import test from 'ava';

import { Category } from '../models';

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

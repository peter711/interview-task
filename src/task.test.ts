import test from 'ava';

import { CORRECT } from './correctResult';
import { getCategories } from './mockedApi';
import { categoryTree } from './task';

type CategoryTreeOptions = Parameters<typeof categoryTree>[0];
type ApiFunction = CategoryTreeOptions['getApiFunction'];

let getApiFunctionMock: ApiFunction;

test.beforeEach(() => {
  getApiFunctionMock = getCategories;
});

test('categoryTree - should return matching correctResult', async (t) => {
  const result = await categoryTree({
    getApiFunction: getApiFunctionMock,
  });
  t.deepEqual(result, CORRECT);
});

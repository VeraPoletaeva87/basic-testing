import { generateLinkedList } from './index';

describe('generateLinkedList', () => {
  // Check match by expect(...).toStrictEqual(...)
  test('should generate linked list from values 1', () => {
    const expectedList = {
      value: 1,
      next: {
        value: null,
        next: null,
      },
    };

    const elements = [1];
    const resultList = generateLinkedList(elements);
    expect(resultList).toStrictEqual(expectedList);
  });

  // Check match by comparison with snapshot
  test('should generate linked list from values 2', () => {
    const expectedList = {
      value: 1,
      next: {
        value: null,
        next: null,
      },
    };

    const elements = [1];
    const resultList = generateLinkedList(elements);
    expect(resultList).toMatchSnapshot(expectedList);
  });
});

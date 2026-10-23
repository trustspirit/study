function getRemovableIndices(str1: string, str2: string): number[] {
  if (str1.length !== str2.length + 1) {
    return [-1];
  }

  let commonPrefixLength = 0;
  while (
    commonPrefixLength < str2.length &&
    str1[commonPrefixLength] === str2[commonPrefixLength]
  ) {
    commonPrefixLength += 1;
  }

  let commonSuffixLength = 0;
  while (
    commonSuffixLength < str2.length &&
    str1[str1.length - 1 - commonSuffixLength] ===
      str2[str2.length - 1 - commonSuffixLength]
  ) {
    commonSuffixLength += 1;
  }

  const firstRemovableIndex = str1.length - commonSuffixLength - 1;
  if (firstRemovableIndex > commonPrefixLength) {
    return [-1];
  }

  const removableIndices: number[] = [];
  for (
    let index = firstRemovableIndex;
    index <= commonPrefixLength;
    index += 1
  ) {
    removableIndices.push(index);
  }

  return removableIndices;
}

import assert from "node:assert/strict";

assert.deepEqual(getRemovableIndices("abca", "abc"), [3]);
assert.deepEqual(getRemovableIndices("abdgggda", "abdggda"), [3, 4, 5]);
assert.deepEqual(getRemovableIndices("baaa", "aaa"), [0]);
assert.deepEqual(getRemovableIndices("abcx", "abz"), [-1]);
assert.deepEqual(getRemovableIndices("aaaa", "aaa"), [0, 1, 2, 3]);

getRemovableIndices("aabbb", "aabb");

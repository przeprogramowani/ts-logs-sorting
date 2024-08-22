import {SimpleSortCriteria} from "../types";

export function simpleAdvancedSort(
  arr: any[],
  criteria: SimpleSortCriteria
): any[] {
  return [...arr].sort((a, b) => {
    for (const key in criteria) {
      const {direction, customCompare} = criteria[key] || {};
      if (a[key] !== b[key]) {
        let comparison: number;
        if (customCompare) {
          comparison = customCompare(a[key], b[key]);
        } else {
          comparison = a[key] < b[key] ? -1 : 1;
        }
        return direction === "desc" ? -comparison : comparison;
      }
    }
    return 0;
  });
}

import {SimpleSortCriteria} from "../types";

interface LogSortingHeaderProps {
  field: string;
  label: string;
  sortCriteria: SimpleSortCriteria;
  toggleSort: (key: string) => void;
  className?: string;
}

export function LogSortingHeader({
  field,
  label,
  sortCriteria,
  toggleSort,
  className = "",
}: LogSortingHeaderProps) {
  const direction = sortCriteria[field]?.direction;
  const arrow = direction === "asc" ? "↑" : direction === "desc" ? "↓" : "";

  return (
    <th
      onClick={() => toggleSort(field)}
      className={`px-6 py-3 cursor-pointer hover:bg-gray-100 ${className}`}
    >
      {label} {arrow}
    </th>
  );
}

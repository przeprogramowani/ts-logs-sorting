export type LogLevel = "INFO" | "WARNING" | "ERROR";
export type LogSource =
  | "user-service"
  | "auth-service"
  | "payment-service"
  | "notification-service"
  | "api-gateway";

export interface LogEntry {
  timestamp: Date;
  level: LogLevel;
  message: string;
  source: LogSource;
  userId?: number;
}

export type CustomCompareFunction<ItemTypeValue> = (
  a: ItemTypeValue,
  b: ItemTypeValue
) => number;

export type SortCriteria<ItemType extends object> = {
  [Key in keyof ItemType]?: {
    direction: "asc" | "desc";
    customCompare?: CustomCompareFunction<ItemType[Key]>;
  };
};

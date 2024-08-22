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

export type SimpleSortCriteria = {
  [key: string]: {
    direction: "asc" | "desc";
    customCompare?: (a: any, b: any) => number;
  };
};

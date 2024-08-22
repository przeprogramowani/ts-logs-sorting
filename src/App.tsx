import {useMemo, useState} from "react";
import {LogLevelBadge} from "./components/LogLevelBadge";
import {LogSortingHeader} from "./components/LogSortingHeader";
import {LogEntryFields, LogLevelOrder} from "./constants";
import {simpleAdvancedSort} from "./services/logProcessing";
import {LogEntry, SimpleSortCriteria} from "./types";

interface LogDashboardProps {
  logs: LogEntry[];
}

function LogDashboard({logs}: LogDashboardProps) {
  const [sortCriteria, setSortCriteria] = useState<SimpleSortCriteria>({
    timestamp: {direction: "desc"},
  });

  const compareLogLevels = (a: string, b: string) =>
    LogLevelOrder[a] - LogLevelOrder[b];

  const toggleSort = (key: string) => {
    setSortCriteria((prev) => {
      const direction = prev[key]?.direction === "asc" ? "desc" : "asc";
      const baseCriteria = {direction} as const;

      return {
        [key]:
          key === "level"
            ? {...baseCriteria, customCompare: compareLogLevels}
            : baseCriteria,
      };
    });
  };

  const sortedLogs = useMemo(() => {
    return simpleAdvancedSort(logs, sortCriteria);
  }, [logs, sortCriteria]);

  return (
    <div className='container p-6 mx-auto'>
      <div className='overflow-x-auto shadow-md sm:rounded-lg'>
        <table className='w-full mx-auto text-sm text-left text-gray-500'>
          <thead className='text-xs text-gray-700 uppercase bg-gray-50'>
            <tr>
              {LogEntryFields.map(({key, label, className}) => (
                <LogSortingHeader
                  key={key}
                  field={key}
                  label={label}
                  sortCriteria={sortCriteria}
                  toggleSort={toggleSort}
                  className={className}
                />
              ))}
            </tr>
          </thead>
          <tbody>
            {sortedLogs.map((log, index) => (
              <tr key={index} className='bg-white border-b hover:bg-gray-50'>
                <td className='px-6 py-4'>
                  {log.timestamp.toISOString().slice(0, 19)}
                </td>
                <td className='px-6 py-4'>
                  <LogLevelBadge level={log.level} />
                </td>
                <td className='px-6 py-4'>{log.source}</td>
                <td className='px-6 py-4'>{log.message}</td>
                <td className='px-6 py-4'>{log.userId}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default LogDashboard;

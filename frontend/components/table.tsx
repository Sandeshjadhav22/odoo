type Column<T> = {
  key: string;
  header: string;
  render?: (row: T) => React.ReactNode;
};

type TableProps<T> = {
  columns: Column<T>[];
  data?: T[];
  onRowClick?: (row: T) => void; // 👈 optional
};

export default function Table<T>({
  columns,
  data = [],
  onRowClick, // 👈 destructure it
}: TableProps<T>) {
  return (
    <div className="border rounded-lg overflow-hidden bg-white">
      <table className="w-full border-collapse">
        <thead className="bg-gray-100">
          <tr>
            {columns.map((col) => (
              <th
                key={col.key}
                className="text-left px-4 py-3 text-sm font-medium text-gray-600 border-b"
              >
                {col.header}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {data.length === 0 ? (
            <tr>
              <td
                colSpan={columns.length}
                className="px-4 py-6 text-center text-gray-500"
              >
                No data available
              </td>
            </tr>
          ) : (
            data.map((row, idx) => (
              <tr
                key={idx}
                onClick={() => onRowClick?.(row)} // 👈 CLICK HANDLER
                className={`border-b last:border-b-0 ${
                  onRowClick
                    ? "cursor-pointer hover:bg-gray-50"
                    : ""
                }`}
              >
                {columns.map((col) => (
                  <td
                    key={col.key}
                    className="px-4 py-3 text-sm text-gray-700"
                  >
                    {col.render
                      ? col.render(row)
                      : (row as any)[col.key] ?? "—"}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

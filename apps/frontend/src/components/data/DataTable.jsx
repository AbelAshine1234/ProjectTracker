'use client';
export default function DataTable({ columns, rows, loading, emptyState, pagination }) {
  if (loading) return <div className="table-wrapper" style={{ padding: 40, textAlign: 'center' }}>Loading...</div>;
  if (!rows?.length && emptyState) return <div className="table-wrapper">{emptyState}</div>;
  return (
    <div className="table-wrapper">
      <table>
        <thead>
          <tr>{columns.map(col => <th key={col.key}>{col.label}</th>)}</tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={row.id || i}>
              {columns.map(col => (
                <td key={col.key}>{col.render ? col.render(row[col.key], row) : row[col.key]}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      {pagination}
    </div>
  );
}

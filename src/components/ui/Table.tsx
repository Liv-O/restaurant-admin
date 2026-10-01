import { createContext, useContext } from 'react';
import type { ReactNode } from 'react';

type TableContextType = {
  columns: string[];
};

const TableContext = createContext<TableContextType | null>(null);

const useTableContext = () => {
  const context = useContext(TableContext);

  if (!context) {
    throw new Error('useTableContext must be used within Table');
  }

  return context;
};

function Table({ children, columns }: { children: ReactNode; columns: string[] }) {
  return (
    <TableContext.Provider value={{ columns }}>
      <table className="w-full border-collapse">{children}</table>
    </TableContext.Provider>
  );
}

function TableHeader() {
  const { columns } = useTableContext();
  return (
    <thead>
      <tr className="text-left text-xs font-bold tracking-wider text-muted uppercase">
        {columns.map((column) => (
          <th className="px-5 py-3" key={column}>
            {column}
          </th>
        ))}
      </tr>
    </thead>
  );
}

function TableRow({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <tr className={`border-t border-line transition-colors hover:bg-primary/5 ${className || ''}`}>
      {children}
    </tr>
  );
}

function TableCell({ children, className }: { children: ReactNode; className?: string }) {
  return <td className={`px-5 py-3 align-middle text-sm ${className || ''}`}>{children}</td>;
}

function TableBody<T>({ data, render }: { data: T[]; render: (item: T) => ReactNode }) {
  if (!data.length)
    return (
      <tbody>
        <tr>
          <td className="px-5 py-3">No data to show at the moment</td>
        </tr>
      </tbody>
    );

  return <tbody>{data.map(render)}</tbody>;
}

Table.Row = TableRow;
Table.Header = TableHeader;
Table.Body = TableBody;
Table.Cell = TableCell;
export default Table;

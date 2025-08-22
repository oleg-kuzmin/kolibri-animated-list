import { createContext, useContext } from 'react';
import cn from 'classnames';
import type { User } from '../../model';
import styles from './Table.module.scss';

interface TableContext {
  columns: string;
}

interface TableProps {
  columns: string;
  children: React.ReactNode;
  className?: string;
}

interface BodyProps {
  data: User[];
  render: (user: User, index: number, array: User[]) => React.ReactNode;
}

interface HeadingProps {
  children: React.ReactNode;
}

interface RowProps {
  user: User;
  number: number;
}

const initialContext = {
  columns: '1fr',
};

const TableContext = createContext<TableContext>(initialContext);

export function Table({ columns, children, className }: Readonly<TableProps>) {
  const valueObject = { columns };

  return (
    <TableContext value={valueObject}>
      <div className={cn(styles.table, className)}>{children}</div>
    </TableContext>
  );
}

function Heading({ children }: Readonly<HeadingProps>) {
  const { columns } = useContext(TableContext);

  return (
    <div className={styles.heading} style={{ gridTemplateColumns: columns }}>
      {children}
    </div>
  );
}

function Row({ user, number }: Readonly<RowProps>) {
  const { columns } = useContext(TableContext);

  return (
    <div className={styles.row} style={{ gridTemplateColumns: columns }}>
      <span className={styles.row__text}>{number}</span>
      <span className={styles.row__text}>{user.name}</span>
      <span className={styles.row__text}>{user.surname}</span>
    </div>
  );
}

function Body({ data, render }: Readonly<BodyProps>) {
  return <div className={styles.body}>{data.map(render)}</div>;
}

Table.Heading = Heading;
Table.Row = Row;
Table.Body = Body;

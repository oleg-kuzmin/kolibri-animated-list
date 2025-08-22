import cn from 'classnames';
import styles from './Content.module.scss';

interface ContentProps {
  children: React.ReactNode;
  className?: string;
}

export function Content({ children, className }: Readonly<ContentProps>) {
  return <div className={cn(styles.content, className)}>{children}</div>;
}

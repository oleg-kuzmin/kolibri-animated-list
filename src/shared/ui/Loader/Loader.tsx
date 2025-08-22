import cn from 'classnames';
import styles from './Loader.module.scss';

interface LoaderProps {
  className?: string;
}

export function Loader({ className }: Readonly<LoaderProps>) {
  return (
    <div className={cn(styles.loader, className)}>
      <div className={styles.innerCircle}></div>
    </div>
  );
}

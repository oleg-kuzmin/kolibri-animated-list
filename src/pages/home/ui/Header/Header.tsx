import cn from 'classnames';
import styles from './Header.module.scss';

interface HeaderProps {
  className?: string;
}

export function Header({ className }: Readonly<HeaderProps>) {
  return (
    <header className={cn(styles.header, className)}>
      <h1 className={styles.header__title}>Hello Kolibri!</h1>
    </header>
  );
}

import { useCallback, useEffect, useState } from 'react';
import cn from 'classnames';
import { Loader } from '@/shared/ui';
import { apiGetUsers } from '../api';
import type { User } from '../model';
import { Header } from './Header';
import { Table } from './Table';
import styles from './HomePage.module.scss';

type StatusApi = 'initial' | 'loading' | 'success' | 'error';

interface HomePageProps {
  className?: string;
}

export function HomePage({ className }: Readonly<HomePageProps>) {
  const [users, setUsers] = useState<User[]>([]);
  const [statusApi, setStatusApi] = useState<StatusApi>('initial');

  // Основная моя идея постепенного отображения строк - асинхронный построчный рендеринг
  async function loadUsers() {
    setStatusApi('loading');

    try {
      const newUsers = await apiGetUsers();
      for (const newUser of newUsers) {
        // Искусственная задержка
        await new Promise<void>(resolve => {
          setTimeout(() => {
            resolve();
          }, 300);
        });
        setUsers(prev => [...prev, newUser]);
      }
      setStatusApi('success');
    } catch (error) {
      setStatusApi('error');
      console.error(error);
    }
  }

  // Первоначальная загрузка
  if (statusApi === 'initial') {
    console.log('Loading initial users');
    loadUsers();
  }

  // Запомнить функцию для повторного использования в эффектах
  const checkLoading = useCallback(() => {
    // Проверить окончание предыдущей загрузки и лимит
    if (statusApi !== 'loading' && users.length < 100) {
      console.log('Loading next users');
      loadUsers();
    }
  }, [statusApi, users.length]);

  // Эффект при скролле
  useEffect(() => {
    function handleScroll() {
      // Проверить позицию скролла страницы
      if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight) {
        checkLoading();
      }
    }
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [checkLoading]);

  // Эффект дозагрузки при неполном количестве строк на странице
  // Сработает только если высота заполненного body документа меньше чем окно браузера
  useEffect(() => {
    if (window.innerHeight > document.body.scrollHeight) {
      checkLoading();
    }
  }, [checkLoading]);

  // Функция для render prop
  function renderUserRow(user: User, index: number) {
    return <Table.Row key={user.id} user={user} number={index + 1} />;
  }

  return (
    <div className={cn(styles.homePage, className)}>
      <Header />

      <main>
        <Table columns="50px 1fr 1fr">
          <Table.Heading>
            <span>N</span>
            <span>Name</span>
            <span>Surname</span>
          </Table.Heading>
          <Table.Body data={users} render={renderUserRow} />

          {statusApi === 'error' && (
            <span className={styles.homePage__error}>Error loading users... Try reload page. 🤔</span>
          )}
        </Table>

        {statusApi === 'loading' && <Loader className={styles.homePage__loader} />}
      </main>
    </div>
  );
}

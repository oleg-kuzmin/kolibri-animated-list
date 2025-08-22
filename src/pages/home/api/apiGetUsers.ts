import { faker } from '@faker-js/faker';
import type { User } from '../model';

export async function apiGetUsers(): Promise<User[]> {
  // Создать нового пользователя
  function createRandomUser() {
    return {
      id: faker.string.uuid(),
      name: faker.person.firstName(),
      surname: faker.person.lastName(),
    };
  }

  // Создать массив пользователей
  // Работать будет с любым count, но страница ограничена 100 users
  const users = faker.helpers.multiple(createRandomUser, {
    count: 20,
  });

  // Имитация запроса api
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(users);
    }, 200);
  });
}

import { QueryInterface } from 'sequelize';
import Role from '../models/role.model';

const tableName = Role.getTableName();
const up = (
  queryInterface: QueryInterface,
): Promise<number | object> => queryInterface.bulkInsert(
  tableName,
  [
    {
      id: 1,
      name: 'Admin',
    },
    {
      id: 2,
      name: 'Guest',
    },
  ],
);

const down = (
  queryInterface: QueryInterface,
): Promise<object> => queryInterface.bulkDelete(tableName, {}, { });

export { down, up };

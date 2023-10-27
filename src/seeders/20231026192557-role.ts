import { QueryInterface } from 'sequelize';
import Role from '../models/role.model';

const seederRoles = [
  {
    id: 1,
    name: 'Admin',
  },
  {
    id: 2,
    name: 'Guest',
  },
];

const tableName = Role.getTableName();
const up = (
  queryInterface: QueryInterface,
): Promise<number | object> => queryInterface.bulkInsert(
  tableName,
  seederRoles,
);

const down = (
  queryInterface: QueryInterface,
): Promise<object> => queryInterface.bulkDelete(tableName, {}, { });

export { down, up, seederRoles };

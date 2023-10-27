import { DataTypes, Model, Sequelize } from 'sequelize';
import sequelizeConfig from '../config/sequelize.config';

class Role extends Model {
  public id!: number;

  public name!: string;

  public readonly createdAt!: Date;

  public readonly updatedAt!: Date;

  public readonly deletedAt!: Date;

  static initialize(sequelize: Sequelize) {
    this.init(
      {
        id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },
        name: {
          type: new DataTypes.STRING(128),
          allowNull: false,
        },
        createdAt: {
          type: DataTypes.DATE,
          allowNull: false,
          defaultValue: new Date(),
        },
        updatedAt: {
          type: DataTypes.DATE,
          allowNull: false,
          defaultValue: new Date(),
        },
        deletedAt: {
          type: DataTypes.DATE,
          allowNull: true,
        },
      },
      {
        tableName: 'roles',
        sequelize,
      },
    );
  }
}

Role.initialize(sequelizeConfig);

export default Role;

import {
  DataTypes, Model, Sequelize,
} from 'sequelize';
import sequelizeConfig from '../config/sequelize.config';
import { seederRoles } from '../seeders/20231026192557-role';

class User extends Model {
  public id!: number;

  public name!: string;

  public email!: string;

  public active!: boolean;

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
        email: {
          type: new DataTypes.STRING(128),
          allowNull: false,
        },
        idRole: {
          type: DataTypes.INTEGER,
          allowNull: false,
          defaultValue: seederRoles[0].id,
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
        tableName: 'users',
        sequelize,
      },
    );
  }

  static associate(models: any) {
    User.hasMany(models.Post, {
      foreignKey: 'idUser',
      onDelete: 'RESTRICT',
      onUpdate: 'RESTRICT',
      as: 'posts',
    });

    User.belongsTo(models.Role, {
      foreignKey: 'idRole',
      onDelete: 'RESTRICT',
      onUpdate: 'RESTRICT',
      as: 'role',
    });
  }
}

User.initialize(sequelizeConfig);

export default User;

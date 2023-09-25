import { DataTypes, Model, Sequelize } from 'sequelize';
import sequelizeConfig from '../config/sequelize.config';

class User extends Model {
  public id!: number;

  public name!: string;

  public email!: string;

  public active!: boolean;

  public readonly createdAt!: Date;

  public readonly updatedAt!: Date;

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
          unique: true,
        },
        createdAt: {
          type: DataTypes.DATE,
          allowNull: false,
          defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        },
        updatedAt: {
          type: DataTypes.DATE,
          allowNull: false,
          defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        },
        deletedAt: {
          type: DataTypes.DATE,
          allowNull: true,
        },
        active: {
          type: DataTypes.BOOLEAN,
          allowNull: false,
          defaultValue: true,
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
  }
}

User.initialize(sequelizeConfig);

export default User;

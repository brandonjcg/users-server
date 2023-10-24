import { DataTypes, Model, Sequelize } from 'sequelize';
import sequelizeConfig from '../config/sequelize.config';

class Post extends Model {
  public id!: number;

  public title!: string;

  public content!: string;

  public idUser!: number;

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
        title: {
          type: new DataTypes.STRING(128),
          allowNull: false,
        },
        content: {
          type: new DataTypes.TEXT(),
          allowNull: false,
        },
        idUser: {
          type: DataTypes.INTEGER,
          allowNull: false,
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
      },
      {
        tableName: 'posts',
        sequelize,
      },
    );
  }

  static associate(models: any) {
    Post.belongsTo(models.User, {
      foreignKey: 'idUser',
      onDelete: 'RESTRICT',
      onUpdate: 'RESTRICT',
      as: 'user',
    });
  }
}

Post.initialize(sequelizeConfig);

export default Post;

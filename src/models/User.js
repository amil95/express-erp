import bcrypt from 'bcrypt';
import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';

const SALT_ROUNDS = 10;

const User = sequelize.define('User', {
    uuid: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
    },
    name: { type: DataTypes.STRING(100), allowNull: false },
    email: { type: DataTypes.STRING(150), allowNull: false, unique: true },
    password: { type: DataTypes.STRING(255), allowNull: false },
    role: {
        type: DataTypes.ENUM('admin', 'manager', 'user'),
        allowNull: false,
        defaultValue: 'user',
    },
}, {
  tableName: 'users',
  underscored: true,
  timestamps: true,
  hooks: {
    beforeCreate: async (user) => {
      if (user.password) {
        user.password = await bcrypt.hash(user.password, SALT_ROUNDS);
      }
    },
    beforeUpdate: async (user) => {
      if (user.changed('password')) {
        user.password = await bcrypt.hash(user.password, SALT_ROUNDS);
      }
    },
  },
});

export default User;

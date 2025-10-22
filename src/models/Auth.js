import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';
import User from './User.js';

const Auth = sequelize.define('Auth', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
    allowNull: false,
  },
  user_uuid: {
    type: DataTypes.UUID,
    allowNull: false,
  },
  token: {
    type: DataTypes.STRING(500),
    allowNull: false,
  },
  expires_at: {
    type: DataTypes.DATE,
    allowNull: false,
  },
}, {
  tableName: 'auth',
  underscored: true,
});

Auth.belongsTo(User, { foreignKey: 'user_uuid', as: 'user' });
User.hasMany(Auth, { foreignKey: 'user_uuid', as: 'tokens' });

export default Auth;

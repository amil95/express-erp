import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';
import User from './User.js';

const Product = sequelize.define('Product', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  name: DataTypes.STRING,
  description: DataTypes.TEXT,
  price: DataTypes.DECIMAL(10, 2),
  stock: DataTypes.INTEGER,
  category: DataTypes.STRING,
  image_url: DataTypes.STRING,
  is_active: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
}, {
  tableName: 'products',
  underscored: true,
});

Product.belongsTo(User, { foreignKey: 'user_uuid', as: 'seller' });
User.hasMany(Product, { foreignKey: 'user_uuid', as: 'products' });

export default Product;

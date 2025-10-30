import Product from '../models/Product.js';
import { Op } from 'sequelize';

export const createProduct = async (req, res) => {
  try {
    const { name, description, price, stock, category, image_url } = req.body;
    const userId = req.user.uuid;

    const product = await Product.create({
      user_uuid: userId,
      name,
      description,
      price,
      stock,
      category,
      image_url,
    });

    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getProducts = async (req, res) => {
    try {
      const {
        page = 1,
        limit = 12,
        category,
        minPrice,
        maxPrice,
        search,
        sort = 'created_at',
        order = 'DESC',
      } = req.query;
  
      const offset = (page - 1) * limit;
  
      const where = {};
  
      if (category) {
        where.category = category;
      }
  
      if (minPrice || maxPrice) {
        where.price = {};
        if (minPrice) where.price[Op.gte] = parseFloat(minPrice);
        if (maxPrice) where.price[Op.lte] = parseFloat(maxPrice);
      }
  
      if (search) {
        where[Op.or] = [
          { name: { [Op.iLike]: `%${search}%` } },
          { description: { [Op.iLike]: `%${search}%` } },
        ];
      }
  
      const { count, rows: products } = await Product.findAndCountAll({
        where,
        offset: parseInt(offset),
        limit: parseInt(limit),
        order: [[sort, order.toUpperCase()]],
      });
  
      res.json({
        data: products,
        meta: {
          total: count,
          page: parseInt(page),
          limit: parseInt(limit),
          totalPages: Math.ceil(count / limit),
        },
      });
    } catch (err) {
      console.error('Error fetching products:', err);
      res.status(500).json({ error: 'Internal server error' });
    }
  };
  
  export const getProductById = async (req, res) => {
    try {
      const { id } = req.params;
      const product = await Product.findOne({ where: { uuid: id } });
  
      if (!product) {
        return res.status(404).json({ message: 'Product not found' });
      }
  
      res.json(product);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
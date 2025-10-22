import User from '../models/User.js';

export const getAllUsers = async (req, res) => {
  const users = await User.findAll();
  res.json(users);
};

import User from '../models/user.js';

export const getAllUsers = async (req, res) => {
  const users = await User.findAll();
  res.json(users);
};

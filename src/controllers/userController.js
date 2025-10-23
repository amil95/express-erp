import User from '../models/User.js';

export const getAllUsers = async (req, res) => {
  const users = await User.findAll();
  res.json(users);
};

export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Basic validation
    if (!name || !email || !password) {
      return res.status(400).json({ message: 'Name, email, and password are required' });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(409).json({ message: 'Email already in use' });
    }

    // Create new user
    const newUser = await User.create({
      name,
      email,
      password,
    });

    // Return user info without password
    const { password: _, ...userData } = newUser.toJSON();

    res.status(201).json({ message: 'User registered successfully', user: userData });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

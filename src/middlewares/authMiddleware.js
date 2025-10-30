import jwt from 'jsonwebtoken';
import Auth from '../models/Auth.js';
import User from '../models/User.js';

const JWT_SECRET = process.env.JWT_SECRET || 'supersecret';

export const authenticate = async (req, res, next) => {
  try {
    // get token from Authorization header
    const authHeader = req.headers['authorization'];
    if (!authHeader) return res.status(401).json({ message: 'Missing token' });

    const token = authHeader.split(' ')[1];
    if (!token) return res.status(401).json({ message: 'Missing token' });

    // verify JWT signature
    const payload = jwt.verify(token, JWT_SECRET);

    // check token exists in DB and is not expired
    const tokenRecord = await Auth.findOne({
      where: { token, user_uuid: payload.uuid },
      include: [{ model: User, as: 'user' }],
    });

    if (!tokenRecord) return res.status(401).json({ message: 'Invalid token' });
    if (new Date(tokenRecord.expires_at) < new Date())
      return res.status(401).json({ message: 'Token expired' });

    // attach user to request object
    req.user = {
      uuid: payload.uuid,
      email: payload.email,
      role: payload.role,
    };

    next();
  } catch (err) {
    console.error('Auth middleware error:', err);
    return res.status(401).json({ message: 'Unauthorized' });
  }
};

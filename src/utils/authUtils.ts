import jwt from 'jsonwebtoken';
import { Role } from '../constant/index.constant';
import { RoleI } from '../types/auth.types';

const JWT_SECRET = process.env.JWT_SECRET!;

// Generate a JWT token
export const generateToken = (userId: number, role: string) => {
  return jwt.sign({ userId, role }, JWT_SECRET, { expiresIn: '1h' }); // Token expires in 1 hour
};

// Verify the JWT token
export const verifyToken = (token: string) => {
  return jwt.verify(token, JWT_SECRET) as { userId: number };
};

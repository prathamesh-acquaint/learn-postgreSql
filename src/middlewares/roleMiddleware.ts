import { NextFunction, Request, Response } from 'express';
import { verifyToken } from '../utils/authUtils';

export const roleMiddleWare = (roles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const token = req.header('Authorization')?.replace('Bearer', '');
    if (!token) {
      res.status(401).json({ message: 'Authorization required.' });
    }
    try {
      const verifiedToken = verifyToken(token as string);

      // Check if user role is in the allowed roles list
      if (!roles.includes(verifiedToken.role)) {
        return res.status(403).json({ message: 'Forbidden' });
      }

      req.userId = verifiedToken.userId;
      next();
    } catch (error) {
      next({ status: 400, nessage: 'Invalid or expired token' });
    }
  };
};

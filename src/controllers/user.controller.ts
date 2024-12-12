import { Request, Response, NextFunction } from 'express';
import { getAllUsers } from '../services/user.service';

export const getAllUsersHandler = async (
  _req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const users = await getAllUsers();
    res.status(200).json({ success: true, data: users });
  } catch (error) {
    next(error);
  }
};

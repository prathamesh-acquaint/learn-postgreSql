import { Request, Response, NextFunction } from 'express';
import { AnyZodObject } from 'zod';

export const validate =
  (schema: AnyZodObject) =>
  (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse(req.body); // Validate body against schema
      next();
    } catch (error: any) {
      res.status(400).json({ success: false, message: error.errors });
    }
  };

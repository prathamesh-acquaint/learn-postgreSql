import { Request, Response, NextFunction } from 'express';
import { AnyZodObject } from 'zod';

export const validate =
  (schema: AnyZodObject) =>
  (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse(req.body); // Validate body against schema
      next();
    } catch (error: any) {
      console.log(error)
      // Map Zod errors to return only the custom message
      const errors = error.errors.map((err: any) => ({
        path: err.path.join('.'),
        message: err.message, // Your custom message
      }));
      res.status(400).json({ success: false, errors });
    }
  };

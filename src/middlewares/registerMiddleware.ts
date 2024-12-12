import { Request, Response, NextFunction } from 'express';
import {
  companyRegisterSchema,
  instructorRegisterSchema,
  jobseekerRegisterSchema,
  registerSchema,
} from '../validators/auth';
import { Role } from '../constant/index.constant';

export const validateRegister =
  () => (req: Request, res: Response, next: NextFunction) => {
    const role = req.body?.role;
    try {
      let validateSchema;
      if (role === Role.JOB_SEEKER) {
        console.log("inside Jobseeker!!")
        validateSchema = jobseekerRegisterSchema.parse(req.body);
      } else if (role === Role.COMPANY) {
        validateSchema = companyRegisterSchema.parse(req.body);
      } else if (role === Role.INSTRUCTOR) {
        validateSchema = instructorRegisterSchema.parse(req.body);
      } else {
        validateSchema = registerSchema.parse(req.body);
      }
      next();
    } catch (error: any) {
      console.log(error);
      // Map Zod errors to return only the custom message
      const errors = error.errors.map((err: any) => ({
        path: err.path.join('.'),
        message: err.message, // Your custom message
      }));
      res.status(400).json({ success: false, errors });
    }
  };

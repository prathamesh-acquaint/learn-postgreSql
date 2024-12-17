import { z } from 'zod';

export const registerSchema = z.object({
  firstName: z
    .string({ required_error: 'First name is required' })
    .min(1, 'First name is required'),
  lastName: z
    .string({ required_error: 'Last name is required' })
    .min(1, 'Last name is required'),
  email: z
    .string({ required_error: 'Email is required' })
    .email('Invalid email format')
    .min(1, 'Email is required'),
  password: z
    .string({ required_error: 'Password is required' })
    .min(6, 'Password must be at least 6 characters')
    .max(20, 'Password must not exceed 20 characters'),
  role: z.enum(['JOB_SEEKER', 'INSTRUCTOR', 'COMPANY'], {
    required_error: 'Role is required',
    invalid_type_error: 'Invalid Role Provided.',
  }),
});

export const jobseekerRegisterSchema = z.object({
  firstName: z
    .string({ required_error: 'First name is required' })
    .min(1, 'First name is required'),
  lastName: z
    .string({ required_error: 'Last name is required' })
    .min(1, 'Last name is required'),
  email: z
    .string({ required_error: 'Email is required' })
    .email('Invalid email format')
    .min(1, 'Email is required'),
  password: z
    .string({ required_error: 'Password is required' })
    .min(6, 'Password must be at least 6 characters')
    .max(20, 'Password must not exceed 20 characters'),
  role: z.enum(['JOB_SEEKER', 'INSTRUCTOR', 'COMPANY'], {
    required_error: 'Role is required',
    invalid_type_error: 'Invalid Role Provided.',
  }),
  jobSeeker: z.object({
    skills: z.array(z.number(), { required_error: 'Skills are required' }),
    industryId: z.number({
      required_error: 'Industry Id is required.',
      message: 'Industry Id is required.',
    }),
  }),
});

export const companyRegisterSchema = z.object({
  firstName: z
    .string({ required_error: 'First name is required' })
    .min(1, 'First name is required'),
  lastName: z
    .string({ required_error: 'Last name is required' })
    .min(1, 'Last name is required'),
  email: z
    .string({ required_error: 'Email is required' })
    .email('Invalid email format')
    .min(1, 'Email is required'),
  password: z
    .string({ required_error: 'Password is required' })
    .min(6, 'Password must be at least 6 characters')
    .max(20, 'Password must not exceed 20 characters'),
  role: z.enum(['JOB_SEEKER', 'INSTRUCTOR', 'COMPANY'], {
    required_error: 'Role is required',
    invalid_type_error: 'Invalid Role Provided.',
  }),
  company: z.object({
    companyType: z
      .string({ required_error: 'companyType is required' })
      .min(1, 'companyType is required'),
    companyName: z
      .string({ required_error: 'companyName is required' })
      .min(1, 'companyName is required'),
    companyWebsiteURL: z.string().optional(),
    companyProfileURL: z.string().optional(),
    contactNumber: z
      .string({ required_error: 'contactNumber is required' })
      .min(10, 'contactNumber should be 10 characters long.')
      .max(10, 'contactNumber should be 10 characters long.'),
    contactEmail: z
      .string({ required_error: 'contactEmail is required' })
      .email('Invalid email format')
      .min(1, 'contactEmail is required'),
    companyDesc: z.string().optional(),
  }),
});

export const instructorRegisterSchema = z.object({
  firstName: z
    .string({ required_error: 'First name is required' })
    .min(1, 'First name is required'),
  lastName: z
    .string({ required_error: 'Last name is required' })
    .min(1, 'Last name is required'),
  email: z
    .string({ required_error: 'Email is required' })
    .email('Invalid email format')
    .min(1, 'Email is required'),
  password: z
    .string({ required_error: 'Password is required' })
    .min(6, 'Password must be at least 6 characters')
    .max(20, 'Password must not exceed 20 characters'),
  role: z.enum(['JOB_SEEKER', 'INSTRUCTOR', 'COMPANY'], {
    required_error: 'Role is required',
    invalid_type_error: 'Invalid Role Provided.',
  }),
  instructor: z.object({
    expertise: z
      .string({ required_error: 'Expertise is required' })
      .min(1, 'Expertise is required'),
    preCourseLink: z
      .string({ required_error: 'Course Link is required' })
      .min(1, 'Course Link is required'),
  }),
});

export const loginSchema = z.object({
  email: z
    .string({ required_error: 'Email is required.' })
    .email('Invalid email format'),
  password: z
    .string({ required_error: 'Password is required.' })
    .min(6, 'Password is required'),
});

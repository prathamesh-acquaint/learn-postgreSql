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

export const loginSchema = z.object({
  email: z
    .string({ required_error: 'Email is required.' })
    .email('Invalid email format'),
  password: z
    .string({ required_error: 'Password is required.' })
    .min(6, 'Password is required'),
});

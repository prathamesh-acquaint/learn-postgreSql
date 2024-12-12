import { Request, Response, NextFunction } from 'express';
import prisma from '../config/db';
import bcrypt from 'bcryptjs';
import { createUser, findUserByEmail } from '../services/user.service';
import { generateToken } from '../utils/authUtils';

export const registerHandler = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    // Validate the Register Schema.
    const validateSchema = req.body;

    // Check if email already exist.
    const existingUser = await prisma.user.findUnique({
      where: { email: validateSchema.email },
    });
    if (existingUser) {
      return next({ status: 403, message: 'User Already Exist.' });
    }

    // Hash the Password.
    const hashedPassword = await bcrypt.hash(validateSchema.password, 10);

    // Create the User.
    const newUser = await createUser({
      ...validateSchema,
      password: hashedPassword,
    });

    res.status(200).json({
      success: true,
      message: 'User Created Successfully.',
      user: newUser,
    });
  } catch (error) {
    return next(error);
  }
};

export const loginHandler = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const validatedSchema = req.body;

    // Find the user by email.
    const user = await findUserByEmail(validatedSchema.email);
    if (!user) {
      return next({ status: 404, message: 'User is not Exist.' });
    }

    // Compare the password.
    const isMatched = await bcrypt.compare(
      validatedSchema.password,
      user?.password as string,
    );
    if (!isMatched) {
      next({ status: 403, message: 'Invalid email or password.' });
    }

    // Create a JWT Token.
    const token = generateToken(user?.id, user?.role);

    const userToSend: any = { ...user };

    delete userToSend.password;

    res.status(200).json({
      message: 'User logged in successfully.',
      token,
      user: userToSend,
    });
  } catch (error) {
    next(error);
  }
};

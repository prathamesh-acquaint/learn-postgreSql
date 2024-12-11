import prisma from '../config/db';

export const createUser = async (data: any) => {
  return await prisma.user.create({ data });
};

export const getAllUsers = async () => {
  return await prisma.user.findMany({
    include: { company: true, instructor: true, jobSeeker: true },
  });
};

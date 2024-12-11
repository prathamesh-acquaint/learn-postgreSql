import { Prisma, PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function getAllUsers() {
  const users = await prisma.user.findMany();
  return users;
}

export async function addUser(data: Prisma.UserCreateInput) {
  const newUser = await prisma.user.create({ data });
  return newUser;
}

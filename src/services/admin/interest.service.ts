import { Prisma } from '@prisma/client';
import prisma from '../../config/db';

export const createInterest = async (data: any) => {
  return prisma.interest.create({
    data,
    select: { industryId: true, id: true, name: true },
  });
};

// export const getAllInterest = async () => {
//   return prisma.interest.findMany({
//     select: {
//       id: true,
//       industryId: true,
//       name: true,
//       insustry: { select: { id: true, name: true } },
//     },
//   });
// };

export const getAllInterest = async (filters: {
  search?: string;
  page?: number;
  pageSize?: number;
}) => {
  const { page = 1, pageSize = 10, search } = filters;

  const skip = (page - 1) * pageSize; // Calculate the number of items to skip
  const take = pageSize; // Number of items to fetch

  const where: any = {
    name: search ? { contains: search, mode: 'insensitive' } : undefined,
  };

  const interests = await prisma.interest.findMany({
    where,
    skip,
    take,
    select: {
      id: true,
      industryId: true,
      name: true,
      insustry: { select: { id: true, name: true } },
    },
  });

  const totalCount = await prisma.interest.count({
    where,
  });

  return {
    data: interests,
    pagination: {
      totalItems: totalCount,
      currentPage: page,
      totalPages: Math.ceil(totalCount / pageSize),
    },
  };
};

export const updateInterest = async (id: number, data: any) => {
  return prisma.interest.update({
    where: { id },
    data,
    select: { industryId: true, id: true, name: true },
  });
};

export const getInterestByName = async (name: string) => {
  return prisma.interest.findFirst({
    where: { name },
    select: { industryId: true, id: true, name: true },
  });
};

export const getInterestById = async (id: number) => {
  return prisma.interest.findUnique({
    where: { id },
    select: { industryId: true, id: true, name: true },
  });
};

export const deleteInterest = async (id: number) => {
  return prisma.interest.delete({
    where: { id },
    select: { industryId: true, id: true, name: true },
  });
};

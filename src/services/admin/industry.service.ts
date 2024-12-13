import { Prisma } from '@prisma/client';
import prisma from '../../config/db';

export const createIndustry = async (data: Prisma.IndustryCreateInput) => {
  return await prisma.industry.create({
    data,
    select: { id: true, name: true },
  });
};

export const getAllIndustries = async (
  filters: {
    page?: number;
    pageSize?: number;
    search?: string;
  },
  includeInterest: boolean | undefined = false,
) => {
  console.log({ filters });
  const { page = 1, pageSize = 10, search } = filters;

  const skip = (page - 1) * pageSize;
  const take = pageSize;

  const where: any = {
    name: search ? { contains: search, mode: 'insensitive' } : undefined,
  };
  const industries = await prisma.industry.findMany({
    where,
    skip,
    take,
    select: {
      id: true,
      name: true,
      interests: includeInterest
        ? { select: { id: true, industryId: true, name: true } }
        : false,
    },
  });

  const totalCount = await prisma.industry.count({ where });

  return {
    data: industries,
    pagination: {
      currentPage: page,
      totalItems: totalCount,
      totalPages: Math.ceil(totalCount / pageSize),
    },
  };
};

export const getIndustryById = async (id: number) => {
  console.log('This is running !!');
  return await prisma.industry.findUnique({
    where: { id },
    select: { id: true, name: true },
  });
};

export const getIndustryByName = async (name: string) => {
  return await prisma.industry.findFirst({
    where: { name },
    select: { id: true, name: true },
  });
};

export const updateIndustry = async (
  id: number,
  data: Prisma.IndustryCreateInput,
) => {
  return await prisma.industry.update({
    where: { id },
    data,
    select: { id: true, name: true },
  });
};

export const deleteIndustry = async (id: number) => {
  return await prisma.industry.delete({
    where: { id },
    select: { id: true, name: true },
  });
};

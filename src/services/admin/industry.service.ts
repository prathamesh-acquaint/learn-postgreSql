import { Prisma } from '@prisma/client';
import prisma from '../../config/db';

export const createIndustry = async (data: Prisma.IndustryCreateInput) => {
  return await prisma.industry.create({
    data,
    select: { id: true, name: true },
  });
};

export const getIndustryById = async (id: number) => {
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

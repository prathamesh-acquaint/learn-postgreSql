import { Prisma } from '@prisma/client';
import prisma from '../../config/db';

export const createInterest = async (data: any) => {
  return prisma.interest.create({
    data,
    select: { industryId: true, id: true, name: true },
  });
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

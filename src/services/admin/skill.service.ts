import { Prisma } from '@prisma/client';
import prisma from '../../config/db';

export const createSkill = async (data: Prisma.SkillCreateInput) => {
  // Check for any duplicate values.
  const isDuplicate = await getSkillByName(data?.name.toLowerCase());
  if (isDuplicate) {
    throw new Error('Duplicate skill name not allowed.');
  }
  return await prisma.skill.create({
    data,
    select: { id: true, name: true },
  });
};

export const getAllSkills = async (filters: {
  page?: number;
  pageSize?: number;
  search?: string;
}) => {
  const { page = 1, pageSize = 10, search } = filters;

  const skip = (page - 1) * pageSize;
  const take = pageSize;

  const where: any = {
    name: search ? { contains: search, mode: 'insensitive' } : undefined,
  };
  const skills = await prisma.skill.findMany({
    where,
    skip,
    take,
    select: {
      id: true,
      name: true,
    },
  });

  const totalCount = await prisma.skill.count({ where });

  return {
    data: skills,
    pagination: {
      currentPage: page,
      totalItems: totalCount,
      totalPages: Math.ceil(totalCount / pageSize),
    },
  };
};

export const getSkillById = async (id: number) => {
  return await prisma.skill.findUnique({
    where: { id },
    select: { id: true, name: true },
  });
};

export const getSkillByName = async (name: string) => {
  return await prisma.skill.findFirst({
    where: { name },
    select: { id: true, name: true },
  });
};

export const updateSkill = async (
  id: number,
  data: Prisma.SkillCreateInput,
) => {
  // Check for any duplicate values.
  const isDuplicate = await getSkillByName(data?.name.toLowerCase());
  if (isDuplicate) {
    throw new Error('Duplicate skill name not allowed.');
  }
  return await prisma.skill.update({
    where: { id },
    data,
    select: { id: true, name: true },
  });
};

export const deleteSkill = async (id: number) => {
  const skill = await prisma.skill.findUnique({ where: { id } });
  if (skill)
    return await prisma.skill.delete({
      where: { id },
      select: { id: true, name: true },
    });
  throw new Error("Skill doesn't exist!!");
};

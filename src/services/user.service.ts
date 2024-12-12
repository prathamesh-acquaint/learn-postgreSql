import { Prisma } from '@prisma/client';
import prisma from '../config/db';
import { Role } from '../constant/index.constant';

interface UserData
  extends Omit<Prisma.UserCreateInput, 'jobSeeker' | 'instructor' | 'company'> {
  company?: Prisma.CompanyCreateInput;
  instructor?: Prisma.InstructorCreateInput;
  jobSeeker?: Prisma.JobSeekerCreateInput;
}

export const createUser = async (data: UserData, role: Role) => {
  const createData: Prisma.UserCreateInput = {
    firstName: data.firstName,
    lastName: data.lastName,
    email: data.email,
    password: data.password,
    profilePic: data.profilePic,
    role,
  };

  // Attach role-specific data
  if (role === Role.COMPANY && data.company) {
    createData.company = { create: data.company };
  } else if (role === Role.INSTRUCTOR && data.instructor) {
    createData.instructor = { create: data.instructor };
  } else if (role === Role.JOB_SEEKER && data.jobSeeker) {
    createData.jobSeeker = { create: data.jobSeeker };
  }

  // Create user and include role-specific relation
  return await prisma.user.create({
    data: createData,
    include: {
      company: role === Role.COMPANY,
      instructor: role === Role.INSTRUCTOR,
      jobSeeker: role === Role.JOB_SEEKER,
    },
  });
};

export const getAllUsers = async () => {
  return await prisma.user.findMany({
    include: { company: true, instructor: true, jobSeeker: true },
  });
};

export const findUserByEmail = async (email: string) => {
  return await prisma.user.findUnique({ where: { email } });
};

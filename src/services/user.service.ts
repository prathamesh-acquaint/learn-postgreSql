import { Prisma } from '@prisma/client';
import prisma from '../config/db';
import { Role } from '../constant/index.constant';

interface UserData
  extends Omit<Prisma.UserCreateInput, 'jobSeeker' | 'instructor' | 'company'> {
  company?: Prisma.CompanyCreateInput;
  instructor?: Prisma.InstructorCreateInput;
  jobSeeker?: Prisma.JobSeekerCreateInput & {
    industryId: number;
    skills: number[];
  };
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
    createData.jobSeeker = {
      create: { industryId: data.jobSeeker?.industryId },
    };
  }

  // Create user and include role-specific relation
  const user = await prisma.user.create({
    data: createData,
    include: {
      company: role === Role.COMPANY,
      instructor: role === Role.INSTRUCTOR,
      jobSeeker: role === Role.JOB_SEEKER,
    },
  });

  if (
    user &&
    user?.jobSeeker &&
    role === Role.JOB_SEEKER &&
    data?.jobSeeker?.skills &&
    data?.jobSeeker?.skills?.length > 0
  ) {
    const jobSeekerId: number = user?.jobSeeker?.id;
    const SkillMapData = data?.jobSeeker?.skills?.map((item) => ({
      jobSeekerId,
      skillId: item,
    }));
    await prisma.jobSeekerSkill.createMany({ data: SkillMapData });
    return user;
  }

  return user;
};

export const getAllUsers = async () => {
  return await prisma.user.findMany({
    include: { company: true, instructor: true, jobSeeker: true },
  });
};

export const findUserByEmail = async (email: string) => {
  return await prisma.user.findUnique({ where: { email } });
};

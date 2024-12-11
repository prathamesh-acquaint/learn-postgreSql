import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  await prisma.user.create({
    data: {
      firstName: 'Admin',
      lastName: 'User',
      email: 'admin@example.com',
      role: 'ADMIN',
      isVerified: true,
    },
  });

  await prisma.user.create({
    data: {
      firstName: 'Job',
      lastName: 'Seeker',
      email: 'jobseeker@example.com',
      role: 'JOB_SEEKER',
      isVerified: true,
      jobSeeker: {
        create: {
          skill: ['JavaScript', 'React'],
          noticePeriod: '2 weeks',
          ctcType: 'Fixed',
          expectedCTC: 80000,
          currentCTC: 50000,
        },
      },
    },
  });

  await prisma.user.create({
    data: {
      firstName: 'Course',
      lastName: 'Instructor',
      email: 'instructor@example.com',
      role: 'INSTRUCTOR',
      isVerified: true,
      instructor: {
        create: {
          expertise: 'Web Development',
          preCourseLink: 'https://example.com/intro-course',
        },
      },
    },
  });

  await prisma.user.create({
    data: {
      firstName: 'Tech',
      lastName: 'Company',
      email: 'company@example.com',
      role: 'COMPANY',
      isVerified: true,
      company: {
        create: {
          companyType: 'IT Services',
          companyName: 'Tech Solutions Inc.',
          contactNumber: '123-456-7890',
          contactEmail: 'contact@techsolutions.com',
        },
      },
    },
  });
}

main()
  .then(() => console.log('Seed data added'))
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

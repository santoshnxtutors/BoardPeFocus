import {
  JobStatus,
  PageStatus,
  PrismaClient,
  TutorStatus,
} from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  console.log('Starting seed process for the shared database package...');

  console.log('Seeding roles and permissions...');
  const permissions = [
    { action: 'tutor:create', description: 'Create new tutors' },
    { action: 'tutor:publish', description: 'Publish tutor profiles' },
    { action: 'page:generate', description: 'Bulk generate pages' },
    { action: 'lead:manage', description: 'Manage and update leads' },
    { action: 'system:audit', description: 'View system audit logs' },
  ];

  for (const permission of permissions) {
    await prisma.permission.upsert({
      where: { action: permission.action },
      update: {},
      create: permission,
    });
  }

  const superAdminRole = await prisma.role.upsert({
    where: { name: 'SUPERADMIN' },
    update: {},
    create: {
      name: 'SUPERADMIN',
      description: 'Full system access',
    },
  });

  const allPermissions = await prisma.permission.findMany();
  for (const permission of allPermissions) {
    await prisma.rolePermission.upsert({
      where: {
        roleId_permissionId: {
          roleId: superAdminRole.id,
          permissionId: permission.id,
        },
      },
      update: {},
      create: {
        roleId: superAdminRole.id,
        permissionId: permission.id,
      },
    });
  }

  console.log('Seeding admin user...');
  const adminPassword = process.env.ADMIN_SEED_PASSWORD;
  const adminEmail = process.env.ADMIN_SEED_EMAIL ?? 'admin@boardpefocus.local';
  const adminName = process.env.ADMIN_SEED_NAME ?? 'BoardPeFocus Admin';
  const shouldResetAdminPassword =
    process.env.RESET_ADMIN_PASSWORD_ON_SEED === 'true';

  if (!adminPassword) {
    throw new Error(
      'ADMIN_SEED_PASSWORD is required before running the seed command.',
    );
  }

  const passwordHash = await bcrypt.hash(adminPassword, 10);
  await prisma.user.upsert({
    where: { email: adminEmail },
    update: shouldResetAdminPassword ? { passwordHash } : {},
    create: {
      email: adminEmail,
      name: adminName,
      passwordHash,
      roles: {
        create: { roleId: superAdminRole.id },
      },
    },
  });

  console.log('Seeding boards and subjects...');
  const boards = [
    { slug: 'cbse', name: 'CBSE', shortName: 'CBSE', status: PageStatus.PUBLISHED },
    { slug: 'ib-dp', name: 'IB Diploma Programme', shortName: 'IB DP', status: PageStatus.PUBLISHED },
    { slug: 'igcse', name: 'IGCSE', shortName: 'IGCSE', status: PageStatus.PUBLISHED },
  ];

  const createdBoards = [];
  for (const boardInput of boards) {
    const board = await prisma.board.upsert({
      where: { slug: boardInput.slug },
      update: { status: PageStatus.PUBLISHED },
      create: boardInput,
    });
    createdBoards.push(board);
  }

  const subjects = [
    { slug: 'mathematics', name: 'Mathematics', status: PageStatus.PUBLISHED },
    { slug: 'physics', name: 'Physics', status: PageStatus.PUBLISHED },
    { slug: 'chemistry', name: 'Chemistry', status: PageStatus.PUBLISHED },
    { slug: 'biology', name: 'Biology', status: PageStatus.PUBLISHED },
    { slug: 'economics', name: 'Economics', status: PageStatus.PUBLISHED },
  ];

  const createdSubjects = [];
  for (const subjectInput of subjects) {
    const subject = await prisma.subject.upsert({
      where: { slug: subjectInput.slug },
      update: { status: PageStatus.PUBLISHED },
      create: subjectInput,
    });
    createdSubjects.push(subject);
  }

  for (const board of createdBoards) {
    for (const subject of createdSubjects) {
      await prisma.boardSubject.upsert({
        where: {
          boardId_subjectId: {
            boardId: board.id,
            subjectId: subject.id,
          },
        },
        update: {},
        create: {
          boardId: board.id,
          subjectId: subject.id,
        },
      });
    }
  }

  console.log('Seeding class levels...');
  const classes = [
    { slug: 'class-10', name: 'Class 10', level: 10 },
    { slug: 'class-12', name: 'Class 12', level: 12 },
  ];

  const createdClasses = [];
  for (const classInput of classes) {
    const classLevel = await prisma.classLevel.upsert({
      where: { slug: classInput.slug },
      update: {
        name: classInput.name,
        level: classInput.level,
        status: PageStatus.PUBLISHED,
      },
      create: {
        ...classInput,
        status: PageStatus.PUBLISHED,
      },
    });
    createdClasses.push(classLevel);
  }

  for (const board of createdBoards) {
    for (const classLevel of createdClasses) {
      await prisma.boardClass.upsert({
        where: {
          boardId_classLevelId: {
            boardId: board.id,
            classLevelId: classLevel.id,
          },
        },
        update: {},
        create: {
          boardId: board.id,
          classLevelId: classLevel.id,
        },
      });
    }
  }

  for (const subject of createdSubjects) {
    for (const classLevel of createdClasses) {
      await prisma.subjectClass.upsert({
        where: {
          subjectId_classLevelId: {
            subjectId: subject.id,
            classLevelId: classLevel.id,
          },
        },
        update: {},
        create: {
          subjectId: subject.id,
          classLevelId: classLevel.id,
        },
      });
    }
  }

  console.log('Seeding locations...');
  const sectors = [
    { slug: 'sector-43', name: 'Sector 43', status: PageStatus.PUBLISHED },
    { slug: 'sector-54', name: 'Sector 54', status: PageStatus.PUBLISHED },
    { slug: 'dlf-phase-5', name: 'DLF Phase 5', status: PageStatus.PUBLISHED },
  ];

  for (const sectorInput of sectors) {
    const sector = await prisma.sector.upsert({
      where: { slug: sectorInput.slug },
      update: { status: PageStatus.PUBLISHED },
      create: sectorInput,
    });

    if (sectorInput.slug === 'dlf-phase-5') {
      const societies = ['The Aralias', 'The Magnolias', 'The Camellias'];
      for (const societyName of societies) {
        const slug = societyName.toLowerCase().replace(/ /g, '-');
        await prisma.society.upsert({
          where: { slug },
          update: { status: PageStatus.PUBLISHED },
          create: {
            slug,
            name: societyName,
            sectorId: sector.id,
            status: PageStatus.PUBLISHED,
          },
        });
      }
    }
  }

  console.log('Seeding schools...');
  const schools = [
    {
      slug: 'the-heritage-school',
      name: 'The Heritage School, Gurugram',
      address: 'Sector 62',
      status: PageStatus.PUBLISHED,
    },
    {
      slug: 'shri-ram-school',
      name: 'The Shri Ram School, Moulsari',
      address: 'DLF Phase 3',
      status: PageStatus.PUBLISHED,
    },
  ];

  for (const schoolInput of schools) {
    await prisma.school.upsert({
      where: { slug: schoolInput.slug },
      update: { status: PageStatus.PUBLISHED },
      create: schoolInput,
    });
  }

  console.log('Seeding page templates...');
  const defaultTemplate = await prisma.pageTemplate.upsert({
    where: { name: 'STANDARD_TUTOR_LIST' },
    update: {},
    create: {
      name: 'STANDARD_TUTOR_LIST',
      layout: JSON.stringify({
        components: ['Hero', 'Filters', 'TutorGrid', 'Faq', 'InternalLinks'],
      }),
    },
  });

  console.log('Seeding tutors...');
  await prisma.tutor.upsert({
    where: { slug: 'dr-raj-malhotra' },
    update: {},
    create: {
      slug: 'dr-raj-malhotra',
      name: 'Dr. Raj Malhotra',
      displayName: 'Raj Malhotra, PhD',
      email: 'raj@example.com',
      tagline: 'Expert IB & IGCSE Physics Tutor with 15+ Years Experience',
      bio: 'PhD in Physics from IIT Delhi, helping students achieve 7s in IB DP for over a decade.',
      experienceYrs: 15,
      studentsTaught: 500,
      rating: 4.9,
      reviewsCount: 42,
      isFeatured: true,
      isVerified: true,
      status: TutorStatus.PUBLISHED,
      qualifications: {
        create: [
          {
            degree: 'PhD in Physics',
            institution: 'IIT Delhi',
            year: 2008,
          },
          {
            degree: 'MSc Physics',
            institution: 'St. Stephens College',
            year: 2003,
          },
        ],
      },
      boards: {
        create: [
          { boardId: createdBoards.find((board) => board.slug === 'ib-dp')!.id },
          { boardId: createdBoards.find((board) => board.slug === 'igcse')!.id },
        ],
      },
      subjects: {
        create: [
          {
            subjectId: createdSubjects.find(
              (subject) => subject.slug === 'physics',
            )!.id,
          },
        ],
      },
      classes: {
        create: [
          {
            classLevelId: createdClasses.find(
              (classLevel) => classLevel.slug === 'class-12',
            )!.id,
          },
        ],
      },
      faqs: {
        create: [
          {
            question: 'Do you offer online classes?',
            answer:
              'Yes, I use a high-end digital whiteboard setup for online sessions.',
          },
          {
            question: 'What is your success rate?',
            answer:
              '90% of my students have achieved a Grade 7 in IB Physics HL.',
          },
        ],
      },
    },
  });

  console.log('Seeding CMS pages...');
  await prisma.pageRecord.upsert({
    where: { slug: 'home' },
    update: {},
    create: {
      slug: 'home',
      title: 'Home | BoardPeFocus',
      status: PageStatus.PUBLISHED,
      templateId: defaultTemplate.id,
      blocks: {
        create: [
          {
            type: 'HERO',
            content: {
              title: 'Find the Best Tutors in Gurugram',
              subtitle: 'Academic Excellence Redefined',
            },
            order: 0,
          },
        ],
      },
      seo: {
        create: {
          title: 'Premium Home Tutors in Gurugram | BoardPeFocus',
          description:
            'Connect with elite IB, IGCSE, and CBSE tutors in Gurugram.',
        },
      },
    },
  });

  console.log('Seeding redirects...');
  await prisma.redirect.upsert({
    where: { from: '/old-tutors' },
    update: {},
    create: {
      from: '/old-tutors',
      to: '/tutors',
      code: 301,
    },
  });

  console.log('Seeding generation jobs...');
  const hasGenerationJobs = await prisma.generationJob.count();
  if (hasGenerationJobs === 0) {
    await prisma.generationJob.create({
      data: {
        type: 'SITEMAP',
        status: JobStatus.COMPLETED,
        progress: 100,
        startedAt: new Date(),
        completedAt: new Date(),
      },
    });
  }

  console.log('Seed completed successfully.');
}

main()
  .catch((error) => {
    console.error('Seed failed:', error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

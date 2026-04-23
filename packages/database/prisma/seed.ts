import { PrismaClient, TutorStatus, PageStatus, LeadStatus, JobStatus, DeliveryStatus, ReviewStatus } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting Seeding Process (Shared Package)...');

  // 1. Roles & Permissions
  console.log('--- Seeding Roles & Permissions ---');
  const permissions = [
    { action: 'tutor:create', description: 'Create new tutors' },
    { action: 'tutor:publish', description: 'Publish tutor profiles' },
    { action: 'page:generate', description: 'Bulk generate pages' },
    { action: 'lead:manage', description: 'Manage and update leads' },
    { action: 'system:audit', description: 'View system audit logs' },
  ];

  for (const p of permissions) {
    await prisma.permission.upsert({
      where: { action: p.action },
      update: {},
      create: p,
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

  // Assign all permissions to SuperAdmin
  const allPerms = await prisma.permission.findMany();
  for (const perm of allPerms) {
    await prisma.rolePermission.upsert({
      where: { roleId_permissionId: { roleId: superAdminRole.id, permissionId: perm.id } },
      update: {},
      create: { roleId: superAdminRole.id, permissionId: perm.id },
    });
  }

  // 2. Users
  console.log('--- Seeding Users ---');
  const adminPassword = process.env.ADMIN_SEED_PASSWORD ?? 'board@1234';
  const shouldResetAdminPassword =
    process.env.RESET_ADMIN_PASSWORD_ON_SEED === 'true';
  const passwordHash = await bcrypt.hash(adminPassword, 10);
  const admin = await prisma.user.upsert({
    where: { email: 'santosh@nxtutors.com' },
    update: shouldResetAdminPassword ? { passwordHash } : {},
    create: {
      email: 'santosh@nxtutors.com',
      name: 'Santosh',
      passwordHash,
      roles: {
        create: { roleId: superAdminRole.id },
      },
    },
  });

  // 3. Boards & Subjects
  console.log('--- Seeding Boards & Subjects ---');
  const boards = [
    { slug: 'cbse', name: 'CBSE', shortName: 'CBSE' },
    { slug: 'ib-dp', name: 'IB Diploma Programme', shortName: 'IB DP' },
    { slug: 'igcse', name: 'IGCSE', shortName: 'IGCSE' },
  ];

  const createdBoards = [];
  for (const b of boards) {
    const board = await prisma.board.upsert({
      where: { slug: b.slug },
      update: {},
      create: b,
    });
    createdBoards.push(board);
  }

  const subjects = [
    { slug: 'mathematics', name: 'Mathematics' },
    { slug: 'physics', name: 'Physics' },
    { slug: 'chemistry', name: 'Chemistry' },
    { slug: 'biology', name: 'Biology' },
    { slug: 'economics', name: 'Economics' },
  ];

  const createdSubjects = [];
  for (const s of subjects) {
    const subject = await prisma.subject.upsert({
      where: { slug: s.slug },
      update: {},
      create: s,
    });
    createdSubjects.push(subject);
  }

  // BoardSubject Relations
  for (const b of createdBoards) {
    for (const s of createdSubjects) {
      await prisma.boardSubject.upsert({
        where: { boardId_subjectId: { boardId: b.id, subjectId: s.id } },
        update: {},
        create: { boardId: b.id, subjectId: s.id },
      });
    }
  }

  // 4. Locations (Sectors & Societies)
  console.log('--- Seeding Locations ---');
  const sectors = [
    { slug: 'sector-43', name: 'Sector 43' },
    { slug: 'sector-54', name: 'Sector 54' },
    { slug: 'dlf-phase-5', name: 'DLF Phase 5' },
  ];

  for (const sec of sectors) {
    const sector = await prisma.sector.upsert({
      where: { slug: sec.slug },
      update: {},
      create: sec,
    });

    if (sec.slug === 'dlf-phase-5') {
      const societies = ['The Aralias', 'The Magnolias', 'The Camellias'];
      for (const socName of societies) {
        await prisma.society.upsert({
          where: { slug: socName.toLowerCase().replace(/ /g, '-') },
          update: {},
          create: {
            slug: socName.toLowerCase().replace(/ /g, '-'),
            name: socName,
            sectorId: sector.id,
          },
        });
      }
    }
  }

  // 5. Schools
  console.log('--- Seeding Schools ---');
  const schools = [
    { slug: 'the-heritage-school', name: 'The Heritage School, Gurugram', address: 'Sector 62' },
    { slug: 'shri-ram-school', name: 'The Shri Ram School, Moulsari', address: 'DLF Phase 3' },
  ];

  for (const sch of schools) {
    await prisma.school.upsert({
      where: { slug: sch.slug },
      update: {},
      create: sch,
    });
  }

  // 6. Page Templates
  console.log('--- Seeding Page Templates ---');
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

  // 7. Tutors
  console.log('--- Seeding Tutors ---');
  const sampleTutor = await prisma.tutor.upsert({
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
          { degree: 'PhD in Physics', institution: 'IIT Delhi', year: 2008 },
          { degree: 'MSc Physics', institution: 'St. Stephens College', year: 2003 },
        ],
      },
      boards: {
        create: [
          { boardId: createdBoards.find((b) => b.slug === 'ib-dp')!.id },
          { boardId: createdBoards.find((b) => b.slug === 'igcse')!.id },
        ],
      },
      subjects: {
        create: [
          { subjectId: createdSubjects.find((s) => s.slug === 'physics')!.id },
        ],
      },
      faqs: {
        create: [
          { question: 'Do you offer online classes?', answer: 'Yes, I use a high-end digital whiteboard setup for online sessions.' },
          { question: 'What is your success rate?', answer: '90% of my students have achieved a Grade 7 in IB Physics HL.' },
        ],
      },
    },
  });

  // 8. CMS Pages
  console.log('--- Seeding CMS Pages ---');
  const homePage = await prisma.pageRecord.upsert({
    where: { slug: 'home' },
    update: {},
    create: {
      slug: 'home',
      title: 'Home | BoardPeFocus',
      status: PageStatus.PUBLISHED,
      templateId: defaultTemplate.id,
      blocks: {
        create: [
          { type: 'HERO', content: { title: 'Find the Best Tutors in Gurugram', subtitle: 'Academic Excellence Redefined' }, order: 0 },
        ],
      },
      seo: {
        create: {
          title: 'Premium Home Tutors in Gurugram | BoardPeFocus',
          description: 'Connect with elite IB, IGCSE, and CBSE tutors in Gurugram.',
        },
      },
    },
  });

  // 9. Redirects
  console.log('--- Seeding Redirects ---');
  await prisma.redirect.upsert({
    where: { from: '/old-tutors' },
    update: {},
    create: {
      from: '/old-tutors',
      to: '/tutors',
      code: 301,
    },
  });

  // 10. Generation Jobs (Sample)
  console.log('--- Seeding Generation Jobs ---');
  await prisma.generationJob.create({
    data: {
      type: 'SITEMAP',
      status: JobStatus.COMPLETED,
      progress: 100,
      startedAt: new Date(),
      completedAt: new Date(),
    },
  });

  console.log('✅ Seeding Completed Successfully!');
}

main()
  .catch((e) => {
    console.error('❌ Seeding Failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

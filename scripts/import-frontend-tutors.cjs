const { existsSync, readFileSync } = require('node:fs');
const { resolve } = require('node:path');
const {
  boards,
  schools,
  sectors,
  societies,
  societyAliases,
  subjects,
  tutors,
} = require('./frontend-tutor-import-data.cjs');

function parseEnvFile(content) {
  const parsed = {};

  for (const rawLine of content.split(/\r?\n/)) {
    const line = rawLine.trim();
    if (!line || line.startsWith('#')) {
      continue;
    }

    const separatorIndex = line.indexOf('=');
    if (separatorIndex <= 0) {
      continue;
    }

    const key = line.slice(0, separatorIndex).trim();
    let value = line.slice(separatorIndex + 1).trim();

    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }

    parsed[key] = value;
  }

  return parsed;
}

function loadEnvFiles(env, filePaths) {
  for (const filePath of filePaths) {
    if (!existsSync(filePath)) {
      continue;
    }

    const parsed = parseEnvFile(readFileSync(filePath, 'utf8'));
    for (const [key, value] of Object.entries(parsed)) {
      if (env[key] === undefined) {
        env[key] = value;
      }
    }
  }
}

function buildDatabaseUrl(env) {
  if (typeof env.DATABASE_URL === 'string' && env.DATABASE_URL.trim()) {
    return env.DATABASE_URL.trim();
  }

  const requiredKeys = [
    'DB_HOST',
    'DB_PORT',
    'DB_NAME',
    'DB_USER',
    'DB_PASSWORD',
  ];
  if (
    requiredKeys.some(
      (key) => typeof env[key] !== 'string' || !env[key].trim(),
    )
  ) {
    return undefined;
  }

  return `postgresql://${encodeURIComponent(env.DB_USER)}:${encodeURIComponent(
    env.DB_PASSWORD,
  )}@${env.DB_HOST}:${env.DB_PORT}/${env.DB_NAME}`;
}

function slugify(value) {
  return value
    .trim()
    .toLowerCase()
    .replace(/&/g, 'and')
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-+|-+$/g, '');
}

async function main() {
  const repoRoot = resolve(__dirname, '..');
  const databaseRoot = resolve(repoRoot, 'packages', 'database');
  const env = { ...process.env };

  loadEnvFiles(env, [
    resolve(repoRoot, '.env.local'),
    resolve(repoRoot, '.env'),
    resolve(repoRoot, 'apps', 'backend', '.env.local'),
    resolve(repoRoot, 'apps', 'backend', '.env'),
    resolve(databaseRoot, '.env.local'),
    resolve(databaseRoot, '.env'),
  ]);

  const databaseUrl = buildDatabaseUrl(env);
  if (!databaseUrl) {
    throw new Error(
      'Missing database configuration. Set DATABASE_URL or DB_HOST/DB_PORT/DB_NAME/DB_USER/DB_PASSWORD.',
    );
  }

  const prismaClientPath = require.resolve('@prisma/client', {
    paths: [databaseRoot],
  });
  const { PrismaClient, TutorStatus } = require(prismaClientPath);
  const prisma = new PrismaClient({
    datasources: {
      db: {
        url: databaseUrl,
      },
    },
  });

  try {
    const boardMap = new Map();
    for (const board of boards) {
      const record = await prisma.board.upsert({
        where: { slug: board.slug },
        update: {
          name: board.name,
          shortName: board.shortName,
          description: board.description,
        },
        create: board,
      });
      boardMap.set(board.name, record.id);
    }

    const subjectMap = new Map();
    for (const subject of subjects) {
      const record = await prisma.subject.upsert({
        where: { slug: subject.slug },
        update: { name: subject.name },
        create: subject,
      });
      subjectMap.set(subject.name, record.id);
    }

    const boardSubjectPairs = new Set();
    for (const tutor of tutors) {
      for (const boardName of tutor.boards) {
        for (const subjectName of tutor.subjects) {
          boardSubjectPairs.add(`${boardName}::${subjectName}`);
        }
      }
    }

    for (const pair of boardSubjectPairs) {
      const [boardName, subjectName] = pair.split('::');
      const boardId = boardMap.get(boardName);
      const subjectId = subjectMap.get(subjectName);

      if (!boardId || !subjectId) {
        continue;
      }

      await prisma.boardSubject.upsert({
        where: {
          boardId_subjectId: {
            boardId,
            subjectId,
          },
        },
        update: {},
        create: {
          boardId,
          subjectId,
        },
      });
    }

    const sectorMap = new Map();
    for (const sector of sectors) {
      const record = await prisma.sector.upsert({
        where: { slug: sector.slug },
        update: { name: sector.name },
        create: sector,
      });
      sectorMap.set(sector.slug, record.id);
      sectorMap.set(sector.name, record.id);
    }

    const societyMap = new Map();
    for (const society of societies) {
      const sectorId = sectorMap.get(society.sectorSlug);
      if (!sectorId) {
        throw new Error(`Sector "${society.sectorSlug}" is missing for ${society.name}.`);
      }

      const record = await prisma.society.upsert({
        where: { slug: society.slug },
        update: {
          name: society.name,
          sectorId,
        },
        create: {
          slug: society.slug,
          name: society.name,
          sectorId,
        },
      });
      societyMap.set(society.slug, record.id);
      societyMap.set(society.name, record.id);
    }

    for (const [alias, slug] of Object.entries(societyAliases)) {
      const societyId = societyMap.get(slug);
      if (societyId) {
        societyMap.set(alias, societyId);
      }
    }

    const schoolMap = new Map();
    for (const school of schools) {
      const record = await prisma.school.upsert({
        where: { slug: school.slug },
        update: {
          name: school.name,
          address: school.address,
        },
        create: {
          slug: school.slug,
          name: school.name,
          address: school.address,
        },
      });
      schoolMap.set(school.name, record.id);

      for (const boardName of school.boards) {
        const boardId = boardMap.get(boardName);
        if (!boardId) {
          throw new Error(`Board "${boardName}" is missing for school ${school.name}.`);
        }

        await prisma.schoolBoard.upsert({
          where: {
            schoolId_boardId: {
              schoolId: record.id,
              boardId,
            },
          },
          update: {},
          create: {
            schoolId: record.id,
            boardId,
          },
        });
      }
    }

    const importedTutorIds = [];

    for (const [index, tutorInput] of tutors.entries()) {
      const tutorData = {
        name: tutorInput.name,
        slug: tutorInput.slug,
        photoUrl: tutorInput.photoUrl,
        tagline: tutorInput.tagline,
        bio: tutorInput.about,
        about: tutorInput.about,
        methodology: tutorInput.methodology,
        experienceYrs: tutorInput.experienceYrs,
        studentsTaught: tutorInput.studentsTaught,
        rating: tutorInput.rating,
        reviewsCount: tutorInput.reviewsCount,
        isFeatured: index < 3,
        isVerified: true,
        priority: tutors.length - index,
        deletedAt: null,
      };
      const existingBySlug = await prisma.tutor.findUnique({
        where: { slug: tutorInput.slug },
      });
      const existingById =
        existingBySlug?.id === tutorInput.id
          ? existingBySlug
          : await prisma.tutor.findUnique({ where: { id: tutorInput.id } });
      const existingTutor = existingBySlug ?? existingById;

      if (existingBySlug && existingById && existingBySlug.id !== existingById.id) {
        console.warn(
          `Tutor slug "${tutorInput.slug}" already belongs to ${existingBySlug.id}; importing into that record instead of ${tutorInput.id}.`,
        );
      }

      const tutor = existingTutor
        ? await prisma.tutor.update({
            where: { id: existingTutor.id },
            data: tutorData,
          })
        : await prisma.tutor.create({
            data: {
              ...tutorData,
              id: tutorInput.id,
              status: TutorStatus.PUBLISHED,
            },
          });

      const boardIds = tutorInput.boards.map((boardName) => {
        const boardId = boardMap.get(boardName);
        if (!boardId) {
          throw new Error(`Board "${boardName}" is missing for tutor ${tutorInput.name}.`);
        }
        return boardId;
      });

      const subjectIds = tutorInput.subjects.map((subjectName) => {
        const subjectId = subjectMap.get(subjectName);
        if (!subjectId) {
          throw new Error(
            `Subject "${subjectName}" is missing for tutor ${tutorInput.name}.`,
          );
        }
        return subjectId;
      });

      const schoolIds = tutorInput.schools.map((schoolName) => {
        const schoolId = schoolMap.get(schoolName);
        if (!schoolId) {
          throw new Error(`School "${schoolName}" is missing for tutor ${tutorInput.name}.`);
        }
        return schoolId;
      });

      const sectorIds = tutorInput.coverage.sectors.map((sectorName) => {
        const sectorId = sectorMap.get(sectorName) ?? sectorMap.get(slugify(sectorName));
        if (!sectorId) {
          throw new Error(`Sector "${sectorName}" is missing for tutor ${tutorInput.name}.`);
        }
        return sectorId;
      });

      const societyIds = tutorInput.coverage.societies
        .map((societyName) => {
          const societyId =
            societyMap.get(societyName) ??
            societyMap.get(societyAliases[societyName]) ??
            societyMap.get(slugify(societyName));
          return societyId ?? null;
        })
        .filter(Boolean);

      await prisma.$transaction(async (tx) => {
        await tx.tutorBoard.deleteMany({ where: { tutorId: tutor.id } });
        await tx.tutorSubject.deleteMany({ where: { tutorId: tutor.id } });
        await tx.tutorSchool.deleteMany({ where: { tutorId: tutor.id } });
        await tx.tutorLocationCoverage.deleteMany({ where: { tutorId: tutor.id } });
        await tx.tutorAchievement.deleteMany({ where: { tutorId: tutor.id } });
        await tx.tutorFaq.deleteMany({ where: { tutorId: tutor.id } });

        await tx.tutor.update({
          where: { id: tutor.id },
          data: {
            boards: {
              create: boardIds.map((boardId) => ({ boardId })),
            },
            subjects: {
              create: subjectIds.map((subjectId) => ({ subjectId })),
            },
            schools: {
              create: schoolIds.map((schoolId) => ({ schoolId })),
            },
            locations: {
              create: [
                ...sectorIds.map((sectorId) => ({ sectorId })),
                ...societyIds.map((societyId) => ({ societyId })),
              ],
            },
            achievements: {
              create: tutorInput.results.map((item) => ({
                title: item.label,
                description: item.value,
              })),
            },
            faqs: {
              create: [
                {
                  question: 'What is this tutor\'s teaching philosophy?',
                  answer: tutorInput.teachingPhilosophy,
                  order: 0,
                },
              ],
            },
          },
        });
      });

      importedTutorIds.push(tutor.id);
    }

    const summary = {
      boards: await prisma.board.count(),
      subjects: await prisma.subject.count(),
      schools: await prisma.school.count(),
      sectors: await prisma.sector.count(),
      societies: await prisma.society.count(),
      tutors: await prisma.tutor.count(),
      importedTutorIds,
    };

    console.log(JSON.stringify(summary, null, 2));
  } finally {
    await prisma.$disconnect();
  }
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : String(error));
  process.exit(1);
});

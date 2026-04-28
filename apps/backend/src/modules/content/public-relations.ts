export const publishedBoardInclude = {
  subjects: {
    where: { subject: { is: { status: 'PUBLISHED' } } },
    include: { subject: true },
  },
  classes: {
    where: { classLevel: { is: { status: 'PUBLISHED' } } },
    include: { classLevel: true },
  },
  schools: {
    where: { school: { is: { status: 'PUBLISHED' } } },
    include: { school: true },
  },
  sectors: {
    where: { sector: { is: { status: 'PUBLISHED' } } },
    include: { sector: true },
  },
  societies: {
    where: { society: { is: { status: 'PUBLISHED' } } },
    include: { society: true },
  },
} as const;

export const publishedClassLevelInclude = {
  boards: {
    where: { board: { is: { status: 'PUBLISHED' } } },
    include: { board: true },
  },
  subjects: {
    where: { subject: { is: { status: 'PUBLISHED' } } },
    include: { subject: true },
  },
} as const;

export const publishedSchoolInclude = {
  boards: {
    where: { board: { is: { status: 'PUBLISHED' } } },
    include: { board: true },
  },
  subjects: {
    where: { subject: { is: { status: 'PUBLISHED' } } },
    include: { subject: true },
  },
  sectors: {
    where: { sector: { is: { status: 'PUBLISHED' } } },
    include: { sector: true },
  },
  societies: {
    where: { society: { is: { status: 'PUBLISHED' } } },
    include: { society: true },
  },
} as const;

export const publishedSubjectInclude = {
  boards: {
    where: { board: { is: { status: 'PUBLISHED' } } },
    include: { board: true },
  },
  classes: {
    where: { classLevel: { is: { status: 'PUBLISHED' } } },
    include: { classLevel: true },
  },
  schools: {
    where: { school: { is: { status: 'PUBLISHED' } } },
    include: { school: true },
  },
  sectors: {
    where: { sector: { is: { status: 'PUBLISHED' } } },
    include: { sector: true },
  },
  societies: {
    where: { society: { is: { status: 'PUBLISHED' } } },
    include: { society: true },
  },
} as const;

export const publishedSectorInclude = {
  societies: {
    where: { status: 'PUBLISHED' },
    orderBy: { name: 'asc' },
  },
  schools: {
    where: { school: { is: { status: 'PUBLISHED' } } },
    include: { school: true },
  },
  boards: {
    where: { board: { is: { status: 'PUBLISHED' } } },
    include: { board: true },
  },
  subjects: {
    where: { subject: { is: { status: 'PUBLISHED' } } },
    include: { subject: true },
  },
} as const;

export const publishedSocietyInclude = {
  sector: true,
  schools: {
    where: { school: { is: { status: 'PUBLISHED' } } },
    include: { school: true },
  },
  boards: {
    where: { board: { is: { status: 'PUBLISHED' } } },
    include: { board: true },
  },
  subjects: {
    where: { subject: { is: { status: 'PUBLISHED' } } },
    include: { subject: true },
  },
} as const;

export const publishedTutorListInclude = {
  boards: {
    where: { board: { is: { status: 'PUBLISHED' } } },
    include: { board: true },
  },
  subjects: {
    where: { subject: { is: { status: 'PUBLISHED' } } },
    include: { subject: true },
  },
  classes: {
    where: { classLevel: { is: { status: 'PUBLISHED' } } },
    include: { classLevel: true },
  },
  locations: {
    where: {
      OR: [
        { sector: { is: { status: 'PUBLISHED' } } },
        { society: { is: { status: 'PUBLISHED' } } },
      ],
    },
    include: { sector: true, society: true },
  },
} as const;

export const publishedTutorDetailInclude = {
  ...publishedTutorListInclude,
  schools: {
    where: { school: { is: { status: 'PUBLISHED' } } },
    include: { school: true },
  },
  reviews: {
    where: { status: 'APPROVED' },
    orderBy: { createdAt: 'desc' },
  },
  faqs: { orderBy: { order: 'asc' } },
  qualifications: true,
  achievements: true,
  claimProofs: true,
} as const;

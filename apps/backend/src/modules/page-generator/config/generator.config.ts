export const PAGE_GENERATOR_CONFIG = {
  thresholds: {
    tutor_profile: {
      min_completeness: 80, // percentage
      require_photo: true,
      require_about: true,
    },
    school_page: {
      min_tutors: 3,
      require_description: true,
    },
    board_subject: {
      min_tutors: 2,
    },
    sector_page: {
      min_tutors: 5,
    },
    society_page: {
      min_tutors: 2,
      require_parent_sector: true,
    },
  },
  content: {
    min_unique_words: 150,
    max_duplication_score: 0.3, // 30% overlap allowed
  },
  linking: {
    max_related_links: 8,
    require_breadcrumb: true,
  },
};

export enum PageType {
  HOME = 'HOME',
  BOARD = 'BOARD',
  BOARD_SUBJECT = 'BOARD_SUBJECT',
  SCHOOL = 'SCHOOL',
  SCHOOL_BOARD = 'SCHOOL_BOARD',
  SCHOOL_BOARD_SUBJECT = 'SCHOOL_BOARD_SUBJECT',
  SECTOR = 'SECTOR',
  SECTOR_SOCIETY = 'SECTOR_SOCIETY',
  TUTOR = 'TUTOR',
  STATIC = 'STATIC',
}

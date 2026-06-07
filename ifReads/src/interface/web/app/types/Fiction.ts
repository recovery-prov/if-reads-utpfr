export const genres = [
  'All Genres',
  'Mystery',
  'Sci-Fi',
  'Fantasy',
  'Horror',
  'Romance',
  'Adventure',
  'Historical',
  'Thriller',
  'Comedy',
] as const;

export type Genre = (typeof genres)[number];

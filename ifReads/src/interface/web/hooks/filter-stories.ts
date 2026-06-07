import { useMemo } from 'react';
import { type Genre } from '../app/types/Fiction';
import { type SortOption } from '../app/types/Filters';
import { type Fiction } from '../app/api/fictions';

type FilterParams = {
  genre: Genre;
  fictions: Fiction[];
  searchQuery?: string;
  sortBy?: SortOption;
};

export const useFilteredStories = ({
  genre,
  fictions,
  searchQuery = '',
  sortBy = 'popular',
}: FilterParams) =>
  useMemo(() => {
    let result = [...fictions];

    if (genre !== 'All Genres') {
      result = result.filter((f) =>
        f.genre
          ?.split(',')
          .map((g) => g.trim())
          .includes(genre),
      );
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (f) =>
          f.title.toLowerCase().includes(q) ||
          f.description?.toLowerCase().includes(q) ||
          f.author.name.toLowerCase().includes(q),
      );
    }

    if (sortBy === 'recent') {
      result.sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
      );
    } else if (sortBy === 'rating') {
      result.sort((a, b) => (b.averageRating ?? 0) - (a.averageRating ?? 0));
    }

    return result;
  }, [fictions, genre, searchQuery, sortBy]);

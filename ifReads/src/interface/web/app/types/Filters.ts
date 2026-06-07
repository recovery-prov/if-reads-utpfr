import { TrendingUp, Star, Clock, Heart } from 'lucide-react';

export const sortOptions = [
  { value: 'popular', label: 'Most Popular', icon: TrendingUp },
  { value: 'rating', label: 'Highest Rated', icon: Star },
  { value: 'recent', label: 'Most Recent', icon: Clock },
  { value: 'favorites', label: 'Most Favorited', icon: Heart },
] as const;

export type SortOption = (typeof sortOptions)[number]['value'];

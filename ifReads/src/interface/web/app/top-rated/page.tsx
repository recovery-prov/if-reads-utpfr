'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import {
  BookOpen,
  Star,
  Trophy,
  Crown,
  Medal,
  TrendingUp,
  Filter,
  ChevronDown,
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { fictionsApi, type Fiction } from '@/app/api/fictions';
import { Genre, genres } from '../types/Fiction';
import { useFilteredStories } from '../../hooks/filter-stories';

export default function TopRatedPage() {
  const [genreFilter, setGenreFilter] = useState<Genre>('All Genres');
  const [fictions, setFictions] = useState<Fiction[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fictionsApi
      .findAll(1, 100)
      .then((res) => setFictions(res.data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Crown className="w-5 h-5 text-yellow-400" />;
      case 2:
        return <Medal className="w-5 h-5 text-gray-300" />;
      case 3:
        return <Medal className="w-5 h-5 text-amber-600" />;
      default:
        return (
          <span className="text-sm font-bold text-muted-foreground">
            #{rank}
          </span>
        );
    }
  };

  const filteredStories = useFilteredStories({
    genre: genreFilter,
    fictions,
  });

  return (
    <div className="min-h-screen bg-background">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Page Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Trophy className="w-10 h-10 text-yellow-400" />
            <h1 className="font-serif text-4xl md:text-5xl font-bold text-foreground">
              Top Rated Stories
            </h1>
          </div>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            The highest-rated interactive fiction as chosen by our community of
            readers
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-4 mb-8 pb-6 border-b border-border">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Filter className="w-4 h-4" />
            <span>Filter by:</span>
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                className="bg-secondary/30 border-border hover:bg-secondary/50"
              >
                {genreFilter}
                <ChevronDown className="w-4 h-4 ml-2" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-card border-border">
              {genres.map((genre) => (
                <DropdownMenuItem
                  key={genre}
                  onClick={() => setGenreFilter(genre)}
                  className={
                    genreFilter === genre ? 'bg-primary/20 text-primary' : ''
                  }
                >
                  {genre}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          <div className="ml-auto text-sm text-muted-foreground">
            {filteredStories.length} stories
          </div>
        </div>

        {/* Top 3 Featured */}
        {loading ? (
          <div className="text-center py-12 text-muted-foreground">
            Loading...
          </div>
        ) : (
          <>
            <div className="grid md:grid-cols-3 gap-6 mb-12">
              {filteredStories.slice(0, 3).map((fiction, index) => {
                const genres =
                  fiction.genre
                    ?.split(',')
                    .map((g) => g.trim())
                    .filter(Boolean) ?? [];
                const rank = index + 1;
                return (
                  <Link key={fiction.id} href={`/story/${fiction.id}`}>
                    <div
                      className={`relative group rounded-2xl overflow-hidden border transition-all hover:scale-[1.02] ${
                        index === 0
                          ? 'bg-linear-to-br from-yellow-500/20 to-amber-600/10 border-yellow-500/30'
                          : index === 1
                            ? 'bg-linear-to-br from-gray-300/20 to-gray-400/10 border-gray-400/30'
                            : 'bg-linear-to-br from-amber-600/20 to-orange-700/10 border-amber-600/30'
                      }`}
                    >
                      <div className="p-6">
                        <div className="flex items-center gap-2 mb-4">
                          {getRankIcon(rank)}
                          <span className="text-sm font-medium text-muted-foreground">
                            #{rank} Top Rated
                          </span>
                        </div>

                        <div className="flex gap-4">
                          <div className="w-24 h-36 rounded-lg bg-muted flex items-center justify-center shrink-0 shadow-lg">
                            <BookOpen className="w-8 h-8 text-muted-foreground" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h3 className="font-serif text-lg font-semibold text-foreground line-clamp-2 group-hover:text-primary transition-colors">
                              {fiction.title}
                            </h3>
                            <p className="text-sm text-muted-foreground mt-1">
                              by {fiction.author.name}
                            </p>
                            {fiction.averageRating != null && (
                              <div className="flex items-center gap-1 mt-2">
                                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                                <span className="font-semibold text-foreground">
                                  {fiction.averageRating.toFixed(1)}
                                </span>
                              </div>
                            )}
                            <div className="flex flex-wrap gap-1 mt-3">
                              {genres.map((genre) => (
                                <span
                                  key={genre}
                                  className="text-xs px-2 py-0.5 bg-primary/20 text-primary rounded-full"
                                >
                                  {genre}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>

            {/* Rest of the list */}
            <div className="space-y-4">
              <h2 className="font-serif text-xl font-semibold text-foreground flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-primary" />
                More Top Stories
              </h2>

              <div className="space-y-3">
                {filteredStories.slice(3).map((fiction, index) => {
                  const genres =
                    fiction.genre
                      ?.split(',')
                      .map((g) => g.trim())
                      .filter(Boolean) ?? [];
                  const rank = index + 4;
                  return (
                    <Link
                      key={fiction.id}
                      href={`/story/${fiction.id}`}
                      className="block"
                    >
                      <div className="flex items-center gap-4 p-4 rounded-xl bg-card border border-border hover:border-primary/30 hover:bg-card/80 transition-all group">
                        <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center shrink-0">
                          {getRankIcon(rank)}
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-serif font-semibold text-foreground group-hover:text-primary transition-colors truncate">
                            {fiction.title}
                          </h3>
                          <p className="text-sm text-muted-foreground">
                            by {fiction.author.name}
                          </p>
                          <div className="flex flex-wrap gap-1 mt-2">
                            {genres.map((genre) => (
                              <span
                                key={genre}
                                className="text-xs px-2 py-0.5 bg-secondary text-secondary-foreground rounded-full"
                              >
                                {genre}
                              </span>
                            ))}
                          </div>
                        </div>
                        {fiction.averageRating != null && (
                          <div className="text-right shrink-0">
                            <div className="flex items-center gap-1">
                              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                              <span className="font-semibold text-foreground">
                                {fiction.averageRating.toFixed(1)}
                              </span>
                            </div>
                          </div>
                        )}
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          </>
        )}
      </main>
    </div>
  );
}

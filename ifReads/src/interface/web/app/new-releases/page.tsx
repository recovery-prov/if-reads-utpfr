'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import {
  BookOpen,
  Sparkles,
  Star,
  Clock,
  Flame,
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
import { genres, type Genre } from '../types/Fiction';
import { formatDate } from '../services/formatDate';
import { useFilteredStories } from '@/hooks/filter-stories';

export default function NewReleasesPage() {
  const [genreFilter, setGenreFilter] = useState<Genre>('All Genres');
  const [fictions, setFictions] = useState<Fiction[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fictionsApi
      .findAll(1, 100)
      .then((res) => {
        const sorted = res.data.sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
        );
        setFictions(sorted);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const filteredStories = useFilteredStories({ genre: genreFilter, fictions });

  return (
    <div className="min-h-screen bg-background">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Page Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Sparkles className="w-10 h-10 text-primary" />
            <h1 className="font-serif text-4xl md:text-5xl font-bold text-foreground">
              New Releases
            </h1>
          </div>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Fresh interactive fiction hot off the press. Discover the latest
            stories from our community.
          </p>
        </div>

        {/* Trending Banner */}
        <div className="mb-10 p-6 rounded-2xl bg-linear-to-r from-primary/20 via-accent/10 to-primary/20 border border-primary/30">
          <div className="flex items-center gap-3 mb-4">
            <Flame className="w-6 h-6 text-orange-400" />
            <h2 className="font-serif text-xl font-semibold text-foreground">
              Latest Additions
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-4">
            {fictions.slice(0, 3).map((fiction) => (
              <Link key={fiction.id} href={`/story/${fiction.id}`}>
                <div className="flex items-center gap-3 p-3 rounded-lg bg-card/50 hover:bg-card transition-colors group">
                  <div className="w-12 h-16 rounded bg-muted flex items-center justify-center shrink-0">
                    <BookOpen className="w-5 h-5 text-muted-foreground" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium text-foreground truncate group-hover:text-primary transition-colors">
                      {fiction.title}
                    </h3>
                    <p className="text-xs text-muted-foreground">
                      {fiction.author.name}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {formatDate(fiction.createdAt)}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
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
            {filteredStories.length} new{' '}
            {filteredStories.length === 1 ? 'story' : 'stories'}
          </div>
        </div>

        {/* New Releases Grid */}
        {loading ? (
          <div className="text-center py-12 text-muted-foreground">
            Loading...
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {filteredStories.map((fiction) => {
              const genres =
                fiction.genre
                  ?.split(',')
                  .map((g) => g.trim())
                  .filter(Boolean) ?? [];
              return (
                <Link key={fiction.id} href={`/story/${fiction.id}`}>
                  <div className="group rounded-xl overflow-hidden bg-card border border-border hover:border-primary/30 transition-all">
                    <div className="relative aspect-3/4 overflow-hidden bg-muted flex items-center justify-center">
                      <BookOpen className="w-12 h-12 text-muted-foreground" />
                      <div className="absolute top-2 left-2 flex gap-2">
                        <span className="px-2 py-1 bg-primary text-primary-foreground text-xs font-medium rounded-full">
                          NEW
                        </span>
                      </div>
                    </div>
                    <div className="p-4">
                      <h3 className="font-serif font-semibold text-foreground line-clamp-1 group-hover:text-primary transition-colors">
                        {fiction.title}
                      </h3>
                      <p className="text-sm text-muted-foreground mt-1">
                        by {fiction.author.name}
                      </p>
                      <p className="text-xs text-muted-foreground mt-2 line-clamp-2">
                        {fiction.description}
                      </p>
                      <div className="flex items-center justify-between mt-3">
                        {fiction.averageRating != null ? (
                          <div className="flex items-center gap-1">
                            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                            <span className="text-sm font-medium text-foreground">
                              {fiction.averageRating.toFixed(1)}
                            </span>
                          </div>
                        ) : (
                          <span />
                        )}
                        <div className="flex items-center gap-1 text-xs text-muted-foreground">
                          <Clock className="w-3 h-3" />
                          {formatDate(fiction.createdAt)}
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-1 mt-3">
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
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </main>
    </div>
  );
}

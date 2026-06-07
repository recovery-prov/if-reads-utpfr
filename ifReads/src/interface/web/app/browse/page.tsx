'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Search,
  Star,
  Filter,
  SlidersHorizontal,
  Grid3X3,
  List,
  ChevronDown,
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { StoryCard } from '@/components/story-card';
import { fictionsApi, type Fiction } from '@/app/api/fictions';
import { sortOptions, type SortOption } from '../types/Filters';
import { genres, type Genre } from '../types/Fiction';
import { useFilteredStories } from '@/hooks/filter-stories';

export default function BrowsePage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGenre, setSelectedGenre] = useState<Genre>('All Genres');
  const [sortBy, setSortBy] = useState<SortOption>('popular');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [fictions, setFictions] = useState<Fiction[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(false);

  useEffect(() => {
    setLoading(true);
    fictionsApi
      .findAll(1, 50)
      .then((res) => {
        setFictions(res.data);
        setPage(1);
        setHasMore(res.total > res.data.length);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const loadMore = () => {
    const nextPage = page + 1;
    fictionsApi
      .findAll(nextPage, 50)
      .then((res) => {
        setFictions((prev) => [...prev, ...res.data]);
        setPage(nextPage);
        setHasMore(res.total > nextPage * 50);
      })
      .catch(console.error);
  };

  const filteredFictions = useFilteredStories({
    fictions,
    genre: selectedGenre,
    searchQuery,
    sortBy,
  });

  const currentSort =
    sortOptions.find((s) => s.value === sortBy) || sortOptions[0];

  return (
    <div className="min-h-screen bg-background">
      {/* Background effects */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-150 h-75 bg-primary/5 blur-[120px] rounded-full" />
        <div className="absolute bottom-1/4 right-0 w-100 h-100 bg-accent/5 blur-[100px] rounded-full" />
      </div>

      {/* Main Content */}
      <main className="relative z-10 px-6 md:px-12 lg:px-20 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-2">
            Browse Interactive Fiction
          </h1>
          <p className="text-muted-foreground">
            Discover stories where your choices matter
          </p>
        </div>

        {/* Search and Filters */}
        <div className="flex flex-col lg:flex-row gap-4 mb-8">
          {/* Search */}
          <div className="relative flex-1 max-w-xl">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search stories, authors, or tags..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-secondary/50 border-border/50 focus:border-primary/50 text-foreground placeholder:text-muted-foreground"
            />
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {/* Genre Filter */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  className="bg-secondary/30 border-border/50 hover:bg-secondary/50 text-foreground gap-2"
                >
                  <Filter className="w-4 h-4" />
                  {selectedGenre}
                  <ChevronDown className="w-4 h-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-card border-border/50">
                {genres.map((genre) => (
                  <DropdownMenuItem
                    key={genre}
                    onClick={() => setSelectedGenre(genre)}
                    className={
                      selectedGenre === genre
                        ? 'bg-primary/10 text-primary'
                        : 'text-foreground'
                    }
                  >
                    {genre}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Sort */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  className="bg-secondary/30 border-border/50 hover:bg-secondary/50 text-foreground gap-2"
                >
                  <SlidersHorizontal className="w-4 h-4" />
                  {currentSort.label}
                  <ChevronDown className="w-4 h-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-card border-border/50">
                {sortOptions.map((option) => (
                  <DropdownMenuItem
                    key={option.value}
                    onClick={() => setSortBy(option.value)}
                    className={
                      sortBy === option.value
                        ? 'bg-primary/10 text-primary'
                        : 'text-foreground'
                    }
                  >
                    <option.icon className="w-4 h-4 mr-2" />
                    {option.label}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            {/* View Toggle */}
            <div className="flex items-center rounded-lg border border-border/50 bg-secondary/30 p-1">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-md transition-colors ${
                  viewMode === 'grid'
                    ? 'bg-primary text-primary-foreground'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                <Grid3X3 className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-md transition-colors ${
                  viewMode === 'list'
                    ? 'bg-primary text-primary-foreground'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                <List className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Genre Pills */}
        <div className="flex flex-wrap gap-2 mb-8">
          {genres.slice(1).map((genre) => (
            <button
              key={genre}
              onClick={() =>
                setSelectedGenre(genre === selectedGenre ? 'All Genres' : genre)
              }
              className={`px-4 py-2 rounded-full text-sm transition-all ${
                genre === selectedGenre
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-secondary/50 text-muted-foreground hover:bg-secondary hover:text-foreground border border-border/50'
              }`}
            >
              {genre}
            </button>
          ))}
        </div>

        {/* Results Count */}
        <div className="mb-6 text-sm text-muted-foreground">
          Showing{' '}
          <span className="text-foreground font-medium">
            {filteredFictions.length}
          </span>{' '}
          stories
          {selectedGenre !== 'All Genres' && (
            <>
              {' '}
              in <span className="text-primary">{selectedGenre}</span>
            </>
          )}
        </div>

        {/* Stories Grid/List */}
        <div
          className={
            viewMode === 'grid'
              ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'
              : 'flex flex-col gap-4'
          }
        >
          {loading ? (
            <div className="col-span-full text-center py-12 text-muted-foreground">
              Loading...
            </div>
          ) : filteredFictions.length === 0 ? (
            <div className="col-span-full text-center py-12 text-muted-foreground">
              No fiction found.
            </div>
          ) : (
            filteredFictions.map((f) => (
              <StoryCard
                key={f.id}
                viewMode={viewMode}
                story={{
                  id: f.id.toString(),
                  title: f.title,
                  author: { id: f.author.id.toString(), name: f.author.name },
                  genre: f.genre ?? '',
                  description: f.description ?? '',
                }}
              />
            ))
          )}
        </div>

        {hasMore && (
          <div className="flex justify-center mt-12">
            <Button
              variant="outline"
              size="lg"
              onClick={loadMore}
              className="bg-secondary/30 border-border/50 hover:bg-secondary/50 text-foreground"
            >
              Load More Stories
            </Button>
          </div>
        )}
      </main>
    </div>
  );
}

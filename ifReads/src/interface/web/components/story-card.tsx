'use client';

import { useState } from 'react';
import Link from 'next/link';
import { BookOpen, Star, Clock, FileText, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { usersApi } from '@/app/api/middleware/users';

interface Story {
  id: string;
  title: string;
  author: { id: string; name: string };
  genre: string;
  rating?: number;
  reviewCount?: number;
  description: string;
  wordCount?: number;
  playTime?: string;
  tags?: string[];
}

interface StoryCardProps {
  story: Story;
  viewMode?: 'grid' | 'list';
  initialFavorited?: boolean;
  onToggleFavorite?: (fictionId: number, nowFavorited: boolean) => void;
}

export function StoryCard({
  story,
  viewMode = 'grid',
  initialFavorited = false,
  onToggleFavorite,
}: StoryCardProps) {
  const [isFav, setIsFav] = useState(initialFavorited);
  const [favLoading, setFavLoading] = useState(false);

  const handleFavorite = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (favLoading) return;
    setFavLoading(true);
    const fictionId = Number(story.id);
    try {
      if (isFav) {
        await usersApi.removeFavorite(fictionId);
        setIsFav(false);
        onToggleFavorite?.(fictionId, false);
      } else {
        await usersApi.addFavorite(fictionId);
        setIsFav(true);
        onToggleFavorite?.(fictionId, true);
      }
    } catch (err: any) {
      if (err?.response?.status !== 401) {
        console.error(
          '[StoryCard] favorite toggle failed:',
          err?.response?.data ?? err?.message ?? err,
        );
      }
    } finally {
      setFavLoading(false);
    }
  };
  if (viewMode === 'list') {
    return (
      <div className="group relative flex gap-6 p-5 rounded-2xl bg-card border border-border/50 hover:border-primary/30 transition-all duration-300 hover:shadow-xl hover:shadow-primary/5">
        <Link
          href={`/story/${story.id}`}
          className="absolute inset-0 z-0"
          aria-label={story.title}
        />
        {/* Cover */}
        <div className="w-32 h-40 shrink-0 rounded-xl bg-secondary/50 relative overflow-hidden">
          <div className="absolute inset-0 bg-linear-to-br from-primary/20 to-accent/20" />
          <div className="absolute inset-0 flex items-center justify-center">
            <BookOpen className="w-10 h-10 text-primary/40" />
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs px-2 py-1 rounded-full bg-primary/10 text-primary">
                  {story.genre}
                </span>
                {story.rating !== undefined && (
                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <Star className="w-3.5 h-3.5 fill-primary text-primary" />
                    <span className="text-foreground font-medium">
                      {story.rating}
                    </span>
                    <span>({story.reviewCount ?? 0})</span>
                  </div>
                )}
              </div>
              <h3 className="text-xl font-serif font-semibold text-foreground group-hover:text-primary transition-colors">
                {story.title}
              </h3>
              <Link
                href={`/author/${story.author.id}`}
                className="relative z-1 text-sm text-muted-foreground hover:text-primary transition-colors"
                onClick={(e) => e.stopPropagation()}
              >
                by {story.author.name}
              </Link>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="relative z-1 text-muted-foreground hover:text-primary hover:bg-primary/10 shrink-0"
              onClick={(e) => void handleFavorite(e)}
              disabled={favLoading}
            >
              <Heart
                className={`w-5 h-5 transition-colors ${isFav ? 'fill-primary text-primary' : ''}`}
              />
            </Button>
          </div>

          <p className="text-sm text-muted-foreground mt-3 line-clamp-2">
            {story.description}
          </p>

          {(story.playTime || story.wordCount || story.tags?.length) && (
            <div className="flex flex-wrap items-center gap-4 mt-4">
              {story.playTime && (
                <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                  <Clock className="w-3.5 h-3.5" />
                  {story.playTime}
                </div>
              )}
              {story.wordCount && (
                <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                  <FileText className="w-3.5 h-3.5" />
                  {(story.wordCount / 1000).toFixed(0)}k words
                </div>
              )}
              {story.tags && story.tags.length > 0 && (
                <div className="flex flex-wrap gap-1.5">
                  {story.tags.slice(0, 3).map((tag) => (
                    <span
                      key={tag}
                      className="text-xs px-2 py-0.5 rounded-full bg-secondary/50 text-muted-foreground"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="group relative rounded-2xl overflow-hidden bg-card border border-border/50 hover:border-primary/30 transition-all duration-300 hover:shadow-xl hover:shadow-primary/5">
      <Link
        href={`/story/${story.id}`}
        className="absolute inset-0 z-0"
        aria-label={story.title}
      />
      {/* Cover Image */}
      <div className="aspect-4/3 bg-secondary/50 relative overflow-hidden">
        <div className="absolute inset-0 bg-linear-to-br from-primary/20 to-accent/20" />
        <div className="absolute inset-0 flex items-center justify-center">
          <BookOpen className="w-12 h-12 text-primary/40" />
        </div>

        {/* Favorite Button */}
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-3 right-3 z-1 bg-background/50 backdrop-blur-sm text-muted-foreground hover:text-primary hover:bg-background/80"
          onClick={(e) => void handleFavorite(e)}
          disabled={favLoading}
        >
          <Heart
            className={`w-4 h-4 transition-colors ${isFav ? 'fill-primary text-primary' : ''}`}
          />
        </Button>
      </div>

      {/* Content */}
      <div className="p-5">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-xs px-2 py-1 rounded-full bg-primary/10 text-primary">
            {story.genre}
          </span>
          {story.rating !== undefined && (
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <Star className="w-3 h-3 fill-primary text-primary" />
              <span className="text-foreground font-medium">
                {story.rating}
              </span>
              <span>({story.reviewCount ?? 0})</span>
            </div>
          )}
        </div>

        <h3 className="font-serif text-lg font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-1">
          {story.title}
        </h3>

        <Link
          href={`/author/${story.author.id}`}
          className="relative z-1 text-sm text-muted-foreground hover:text-primary transition-colors"
          onClick={(e) => e.stopPropagation()}
        >
          by {story.author.name}
        </Link>

        <p className="text-sm text-muted-foreground/80 mt-3 line-clamp-2">
          {story.description}
        </p>

        {(story.playTime || story.wordCount) && (
          <div className="flex items-center gap-3 mt-4 text-xs text-muted-foreground">
            {story.playTime && (
              <div className="flex items-center gap-1">
                <Clock className="w-3 h-3" />
                {story.playTime}
              </div>
            )}
            {story.wordCount && (
              <div className="flex items-center gap-1">
                <FileText className="w-3 h-3" />
                {(story.wordCount / 1000).toFixed(0)}k
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

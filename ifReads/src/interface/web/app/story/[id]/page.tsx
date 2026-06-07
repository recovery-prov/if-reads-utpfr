import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Button } from '@/components/ui/button';
import {
  BookOpen,
  Sparkles,
  Star,
  Share2,
  ExternalLink,
  ChevronLeft,
  User,
  Calendar,
} from 'lucide-react';
import { ReviewSection } from '@/components/review-section';
import { FavoriteButton } from '@/components/favorite-button';
import { fictionsApi } from '@/app/api/fictions';

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function StoryDetailPage({ params }: PageProps) {
  const { id } = await params;

  let fiction: any = null;
  try {
    fiction = await fictionsApi.findOne(parseInt(id));
  } catch {
    notFound();
  }

  const reviews: any[] = fiction.reviews ?? [];
  const avg = (
    key: 'narrative' | 'interactivity' | 'originality' | 'rating',
  ) =>
    reviews.length
      ? +(
          reviews.reduce((s: number, r: any) => s + (r[key] ?? 0), 0) /
          reviews.length
        ).toFixed(1)
      : 0;
  const mappedReviews = reviews.map((r: any) => ({
    id: r.id.toString(),
    user: { name: r.author?.name ?? 'Anonymous', avatar: null as null },
    rating: r.rating,
    narrative: r.narrative,
    interactivity: r.interactivity,
    originality: r.originality,
    date: new Date(r.createdAt).toLocaleDateString('pt-BR'),
    content: r.comment ?? '',
    helpful: 0,
  }));
  const authorName = fiction.author?.name ?? 'Unknown';
  const authorId = (fiction.author?.id ?? fiction.authorId).toString();
  const avgRating = avg('rating');
  const avgNarrative = avg('narrative');
  const avgInteractivity = avg('interactivity');
  const avgOriginality = avg('originality');

  return (
    <div className="min-h-screen bg-background">
      {/* Background effects */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/3 w-125 h-75 bg-primary/5 blur-[120px] rounded-full" />
        <div className="absolute bottom-1/3 right-0 w-100 h-100 bg-accent/5 blur-[100px] rounded-full" />
      </div>

      {/* Header */}

      <main className="relative z-10 px-6 md:px-12 lg:px-20 py-8">
        {/* Back Link */}
        <Link
          href="/browse"
          className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors mb-6"
        >
          <ChevronLeft className="w-4 h-4" />
          Back to Browse
        </Link>

        {/* Story Header */}
        <div className="flex flex-col lg:flex-row gap-8 mb-12">
          {/* Cover */}
          <div className="w-full lg:w-80 shrink-0">
            <div className="aspect-3/4 rounded-2xl bg-card border border-border/50 relative overflow-hidden">
              <div className="absolute inset-0 bg-linear-to-br from-primary/20 to-accent/20" />
              <div className="absolute inset-0 flex items-center justify-center">
                <BookOpen className="w-20 h-20 text-primary/40" />
              </div>
            </div>

            {/* Action Buttons */}
            <div className="mt-4 space-y-3">
              <Button
                className="w-full bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg shadow-primary/20"
                size="lg"
              >
                <ExternalLink className="w-4 h-4 mr-2" />
                Play Story
              </Button>
              <div className="flex gap-3">
                <FavoriteButton fictionId={parseInt(id)} />
                <Button
                  variant="outline"
                  className="bg-secondary/30 border-border/50 hover:bg-secondary/50 text-foreground"
                >
                  <Share2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>

          {/* Story Info */}
          <div className="flex-1">
            <div className="flex flex-wrap items-center gap-2 mb-3">
              {fiction.genre && (
                <span className="text-sm px-3 py-1 rounded-full bg-primary/10 text-primary">
                  {fiction.genre}
                </span>
              )}
            </div>

            <h1 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-3">
              {fiction.title}
            </h1>

            <Link
              href={`/author/${authorId}`}
              className="inline-flex items-center gap-2 text-lg text-muted-foreground hover:text-primary transition-colors mb-6"
            >
              <User className="w-4 h-4" />
              by {authorName}
            </Link>

            {/* Rating Summary */}
            {reviews.length > 0 && (
              <div className="flex flex-col gap-4 mb-6">
                <div className="flex flex-wrap items-center gap-4">
                  <div className="flex items-center gap-2">
                    <div className="flex items-center">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          className={`w-5 h-5 ${
                            star <= Math.round(avgRating)
                              ? 'fill-primary text-primary'
                              : 'text-muted-foreground/30'
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-xl font-semibold text-foreground">
                      {avgRating}
                    </span>
                    <span className="text-muted-foreground">
                      ({reviews.length} reviews)
                    </span>
                  </div>
                </div>
                {/* Sub-rating breakdown */}
                <div className="flex flex-wrap gap-4">
                  {[
                    { label: 'Narrative', value: avgNarrative },
                    { label: 'Interactivity', value: avgInteractivity },
                    { label: 'Originality', value: avgOriginality },
                  ].map(({ label, value }) => (
                    <div
                      key={label}
                      className="flex items-center gap-2 min-w-45"
                    >
                      <span className="text-sm text-muted-foreground w-24">
                        {label}
                      </span>
                      <div className="flex-1 h-1.5 rounded-full bg-secondary/60">
                        <div
                          className="h-full rounded-full bg-primary"
                          style={{ width: `${(value / 5) * 100}%` }}
                        />
                      </div>
                      <span className="text-sm font-medium text-foreground w-6 text-right">
                        {value.toFixed(1)}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Stats */}
            <div className="flex flex-wrap gap-6 mb-8">
              {fiction.publishedAt && (
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Calendar className="w-4 h-4" />
                  <span>Published {fiction.publishedAt}</span>
                </div>
              )}
            </div>

            {/* Description */}
            <div className="prose prose-invert max-w-none">
              <h2 className="text-lg font-semibold text-foreground mb-3">
                About this Story
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                {fiction.description}
              </p>
            </div>
          </div>
        </div>

        {/* Reviews Section */}
        <ReviewSection storyId={id} reviews={mappedReviews} />
      </main>
    </div>
  );
}

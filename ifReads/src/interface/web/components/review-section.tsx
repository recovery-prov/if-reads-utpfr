'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Star, ThumbsUp, MessageSquare, User } from 'lucide-react';
import { reviewsApi } from '@/app/api/reviews';

interface Review {
  id: string;
  user: { name: string; avatar: string | null };
  rating: number;
  narrative: number;
  interactivity: number;
  originality: number;
  date: string;
  content: string;
  helpful: number;
}

const SUB_RATINGS = [
  { key: 'narrative', label: 'Narrative' },
  { key: 'interactivity', label: 'Interactivity' },
  { key: 'originality', label: 'Originality' },
] as const;

type SubRatingKey = (typeof SUB_RATINGS)[number]['key'];

interface ReviewSectionProps {
  storyId: string;
  reviews: Review[];
}

export function ReviewSection({ storyId, reviews }: ReviewSectionProps) {
  const [showWriteReview, setShowWriteReview] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [subRatings, setSubRatings] = useState<Record<SubRatingKey, number>>({
    narrative: 0,
    interactivity: 0,
    originality: 0,
  });
  const [hoverRatings, setHoverRatings] = useState<
    Record<SubRatingKey, number>
  >({
    narrative: 0,
    interactivity: 0,
    originality: 0,
  });
  const [reviewText, setReviewText] = useState('');

  const overallRating = Object.values(subRatings).every((v) => v > 0)
    ? parseFloat(
        (Object.values(subRatings).reduce((a, b) => a + b, 0) / 3).toFixed(1),
      )
    : 0;

  const handleSubmitReview = async () => {
    if (overallRating === 0 || reviewText.trim() === '') return;
    setIsSubmitting(true);
    setSubmitError(null);
    try {
      await reviewsApi.create(parseInt(storyId), {
        rating: Math.round(overallRating),
        narrative: subRatings.narrative,
        interactivity: subRatings.interactivity,
        originality: subRatings.originality,
        comment: reviewText.trim() || undefined,
      });
      setShowWriteReview(false);
      setSubRatings({ narrative: 0, interactivity: 0, originality: 0 });
      setReviewText('');
    } catch (err) {
      setSubmitError(
        'Falha ao enviar review. Verifique se você está autenticado.',
      );
      console.error('Failed to submit review:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="max-w-4xl">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl font-serif font-semibold text-foreground flex items-center gap-2">
          <MessageSquare className="w-5 h-5 text-primary" />
          Reviews
        </h2>
        <Button
          onClick={() => setShowWriteReview(!showWriteReview)}
          className="bg-primary text-primary-foreground hover:bg-primary/90"
        >
          Write a Review
        </Button>
      </div>

      {/* Write Review Form */}
      {showWriteReview && (
        <div className="mb-8 p-6 rounded-2xl bg-card border border-border/50">
          <h3 className="text-lg font-semibold text-foreground mb-4">
            Your Review
          </h3>

          {/* Sub-rating Selection */}
          <div className="mb-4 space-y-3">
            <label className="text-sm text-muted-foreground block">
              Ratings
            </label>
            {SUB_RATINGS.map(({ key, label }) => (
              <div key={key} className="flex items-center gap-3">
                <span className="text-sm text-muted-foreground w-24 shrink-0">
                  {label}
                </span>
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      onClick={() =>
                        setSubRatings((prev) => ({ ...prev, [key]: star }))
                      }
                      onMouseEnter={() =>
                        setHoverRatings((prev) => ({ ...prev, [key]: star }))
                      }
                      onMouseLeave={() =>
                        setHoverRatings((prev) => ({ ...prev, [key]: 0 }))
                      }
                      className="p-0.5 transition-transform hover:scale-110"
                    >
                      <Star
                        className={`w-5 h-5 transition-colors ${
                          star <= (hoverRatings[key] || subRatings[key])
                            ? 'fill-primary text-primary'
                            : 'text-muted-foreground/30 hover:text-muted-foreground/50'
                        }`}
                      />
                    </button>
                  ))}
                  {subRatings[key] > 0 && (
                    <span className="ml-1 text-xs text-muted-foreground">
                      {subRatings[key]}/5
                    </span>
                  )}
                </div>
              </div>
            ))}
            {overallRating > 0 && (
              <p className="text-sm text-muted-foreground pt-1">
                Overall:{' '}
                <span className="text-foreground font-medium">
                  {overallRating}/5
                </span>
              </p>
            )}
          </div>

          {/* Review Text */}
          <div className="mb-4">
            <label className="text-sm text-muted-foreground mb-2 block">
              Your thoughts
            </label>
            <Textarea
              value={reviewText}
              onChange={(e) => setReviewText(e.target.value)}
              placeholder="Share your experience with this story..."
              className="min-h-30 bg-secondary/50 border-border/50 focus:border-primary/50 text-foreground placeholder:text-muted-foreground resize-none"
            />
          </div>

          <div className="flex justify-end gap-3">
            {submitError && (
              <p className="text-sm text-destructive self-center mr-auto">
                {submitError}
              </p>
            )}
            <Button
              variant="outline"
              onClick={() => setShowWriteReview(false)}
              className="bg-secondary/30 border-border/50 hover:bg-secondary/50 text-foreground"
            >
              Cancel
            </Button>
            <Button
              onClick={handleSubmitReview}
              disabled={
                overallRating === 0 || reviewText.trim() === '' || isSubmitting
              }
              className="bg-primary text-primary-foreground hover:bg-primary/90"
            >
              {isSubmitting ? 'Enviando...' : 'Submit Review'}
            </Button>
          </div>
        </div>
      )}

      {/* Reviews List */}
      <div className="space-y-6">
        {reviews.map((review) => (
          <ReviewCard key={review.id} review={review} />
        ))}
      </div>

      {/* Load More */}
      {reviews.length > 0 && (
        <div className="flex justify-center mt-8">
          <Button
            variant="outline"
            className="bg-secondary/30 border-border/50 hover:bg-secondary/50 text-foreground"
          >
            Load More Reviews
          </Button>
        </div>
      )}
    </section>
  );
}

function ReviewCard({ review }: { review: Review }) {
  const [helpfulCount, setHelpfulCount] = useState(review.helpful);
  const [hasVoted, setHasVoted] = useState(false);

  const handleHelpful = () => {
    if (!hasVoted) {
      setHelpfulCount((prev) => prev + 1);
      setHasVoted(true);
    }
  };

  return (
    <div className="p-6 rounded-2xl bg-card/50 border border-border/50">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center">
            <User className="w-5 h-5 text-muted-foreground" />
          </div>
          <div>
            <div className="font-medium text-foreground">
              {review.user.name}
            </div>
            <div className="text-sm text-muted-foreground">{review.date}</div>
          </div>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="flex items-center gap-0.5">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                className={`w-4 h-4 ${
                  star <= Math.round(review.rating)
                    ? 'fill-primary text-primary'
                    : 'text-muted-foreground/30'
                }`}
              />
            ))}
          </div>
          <span className="text-sm font-medium text-foreground">
            {review.rating}
          </span>
        </div>
      </div>

      {/* Sub-ratings */}
      <div className="flex flex-wrap gap-x-6 gap-y-1.5 mb-4">
        {SUB_RATINGS.map(({ key, label }) => (
          <div key={key} className="flex items-center gap-2">
            <span className="text-xs text-muted-foreground w-20">{label}</span>
            <div className="w-16 h-1 rounded-full bg-secondary/60">
              <div
                className="h-full rounded-full bg-primary/70"
                style={{ width: `${(review[key] / 5) * 100}%` }}
              />
            </div>
            <span className="text-xs text-muted-foreground">{review[key]}</span>
          </div>
        ))}
      </div>

      <p className="text-foreground/90 leading-relaxed mb-4">
        {review.content}
      </p>

      <div className="flex items-center gap-4">
        <button
          onClick={handleHelpful}
          disabled={hasVoted}
          className={`flex items-center gap-2 text-sm transition-colors ${
            hasVoted
              ? 'text-primary cursor-default'
              : 'text-muted-foreground hover:text-foreground'
          }`}
        >
          <ThumbsUp className={`w-4 h-4 ${hasVoted ? 'fill-primary' : ''}`} />
          Helpful ({helpfulCount})
        </button>
      </div>
    </div>
  );
}

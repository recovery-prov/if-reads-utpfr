'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { BookOpen, Sparkles, Users, ChevronRight, Star } from 'lucide-react';
import { AuthModal } from '@/components/auth-modal';
import { fictionsApi, type Fiction } from '@/app/api/fictions';

export default function LandingPage() {
  const [authModal, setAuthModal] = useState<'signin' | 'login' | null>(null);
  const [featuredStories, setFeaturedStories] = useState<Fiction[]>([]);

  useEffect(() => {
    fictionsApi
      .findAll(1, 3)
      .then((res) => {
        setFeaturedStories(res.data);
      })
      .catch(console.error);
  }, []);

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background with mystical effect */}
      <div className="fixed inset-0 bg-midnight">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,var(--tw-gradient-stops))] from-emerald-deep via-background to-midnight" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-200 h-100 bg-teal-glow/10 blur-[120px] rounded-full" />
        <div className="absolute bottom-0 left-0 w-100 h-75 bg-primary/5 blur-[100px] rounded-full" />
        <div className="absolute bottom-1/4 right-0 w-75 h-100 bg-accent/5 blur-[80px] rounded-full" />
      </div>

      {/* Content */}
      <div className="relative z-10">
        {/* Hero Section */}
        <main className="px-6 md:px-12 lg:px-20 pt-16 md:pt-24 pb-20">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/50 border border-border mb-8">
              <Sparkles className="w-4 h-4 text-teal-glow" />
              <span className="text-sm text-muted-foreground">
                Discover your next adventure
              </span>
            </div>

            <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif font-bold leading-tight text-balance mb-6">
              Where Every Choice{' '}
              <span className="text-primary">Shapes the Story</span>
            </h1>

            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 text-pretty">
              Explore thousands of interactive fiction titles. Rate, review, and
              discover text adventures, visual novels, and choice-based
              narratives crafted by talented authors worldwide.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button
                size="lg"
                asChild
                className="bg-primary text-primary-foreground hover:bg-primary/90 shadow-xl shadow-primary/25 px-8 group"
              >
                <Link href="/browse">
                  Start Exploring
                  <ChevronRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-border bg-secondary/30 hover:bg-secondary/50 text-foreground"
                onClick={() => setAuthModal('signin')}
              >
                Create Account
              </Button>
            </div>
          </div>

          {/* Stats Section */}
          <div className="max-w-4xl mx-auto mt-24 grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { value: '12K+', label: 'Stories', icon: BookOpen },
              { value: '50K+', label: 'Reviews', icon: Star },
              { value: '8K+', label: 'Authors', icon: Users },
              { value: '4.8', label: 'Avg Rating', icon: Sparkles },
            ].map((stat) => (
              <div
                key={stat.label}
                className="text-center p-6 rounded-2xl bg-card/50 border border-border/50 backdrop-blur-sm"
              >
                <stat.icon className="w-5 h-5 text-primary mx-auto mb-3" />
                <div className="text-2xl md:text-3xl font-serif font-bold text-foreground">
                  {stat.value}
                </div>
                <div className="text-sm text-muted-foreground mt-1">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>

          {/* Featured Section Preview */}
          <section className="max-w-6xl mx-auto mt-24">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl md:text-3xl font-serif font-semibold text-foreground">
                Featured Stories
              </h2>
              <Link
                href="/browse"
                className="text-primary hover:text-primary/80 flex items-center gap-1 text-sm"
              >
                View all
                <ChevronRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredStories.map((story) => (
                <Link
                  key={story.id}
                  href={`/story/${story.id}`}
                  className="group relative rounded-2xl overflow-hidden bg-card border border-border/50 hover:border-primary/30 transition-all duration-300 hover:shadow-xl hover:shadow-primary/5"
                >
                  <div className="aspect-4/3 bg-secondary/50 relative overflow-hidden">
                    <div className="absolute inset-0 bg-linear-to-br from-primary/20 to-accent/20" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <BookOpen className="w-12 h-12 text-primary/40" />
                    </div>
                  </div>
                  <div className="p-5">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-xs px-2 py-1 rounded-full bg-primary/10 text-primary">
                        {story.genre}
                      </span>
                      {story.averageRating != null && (
                        <div className="flex items-center gap-1 text-xs text-muted-foreground">
                          <Star className="w-3 h-3 fill-primary text-primary" />
                          {story.averageRating.toFixed(1)}
                        </div>
                      )}
                    </div>
                    <h3 className="font-serif text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
                      {story.title}
                    </h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      by {story.author.name}
                    </p>
                    <p className="text-sm text-muted-foreground/80 mt-3 line-clamp-2">
                      {story.description}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </section>

          {/* CTA Section */}
          <section className="max-w-3xl mx-auto mt-24 text-center">
            <div className="p-8 md:p-12 rounded-3xl bg-linear-to-br from-card to-secondary/30 border border-border/50">
              <h2 className="text-2xl md:text-3xl font-serif font-bold text-foreground mb-4">
                Ready to Begin Your Journey?
              </h2>
              <p className="text-muted-foreground mb-8 max-w-lg mx-auto">
                Join thousands of readers who have discovered their favorite
                interactive fiction through ifReads.
              </p>
              <Button
                size="lg"
                className="bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg shadow-primary/20"
                onClick={() => setAuthModal('signin')}
              >
                Create Free Account
              </Button>
            </div>
          </section>
        </main>
      </div>

      {/* Auth Modal */}
      <AuthModal
        isOpen={authModal !== null}
        mode={authModal || 'login'}
        onClose={() => setAuthModal(null)}
        onSwitchMode={(mode) => setAuthModal(mode)}
      />
    </div>
  );
}

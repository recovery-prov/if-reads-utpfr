'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  BookOpen,
  Heart,
  Star,
  Settings,
  MessageSquare,
  Edit3,
  ChevronRight,
  Plus,
  BookMarked,
  ExternalLink,
  MoreVertical,
  Trash2,
  Users,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { StoryCard } from '@/components/story-card';
import { ProfileSettings } from '@/components/profile-settings';
import {
  usersApi,
  type User,
  type FavoriteEntry,
  type ReviewWithFiction,
} from '@/app/api/middleware/users';
import { CreateStoryModal } from '../../components/create-story-model';
import { useRouter } from 'next/navigation';
import { EditStoryModal } from '../../components/edit-story-modal';
import { type Fiction, fictionsApi } from '@/app/api/fictions';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from '@radix-ui/react-dropdown-menu';

export default function ProfilePage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('favorites');
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [favorites, setFavorites] = useState<FavoriteEntry[]>([]);
  const [reviews, setReviews] = useState<ReviewWithFiction[]>([]);
  const [loading, setLoading] = useState(true);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingStory, setEditingStory] = useState<Fiction | null>(null);
  const [myStories, setMyStories] = useState<Fiction[]>([]);

  const handleEditStory = (story: Fiction) => {
    setEditingStory(story);
    setIsEditModalOpen(true);
  };

  const handleSaveStory = (updatedStory: Fiction) => {
    setMyStories((prev) =>
      prev.map((s) => (s.id === updatedStory.id ? updatedStory : s)),
    );
  };

  const handleDeleteStory = (storyId: number) => {
    setMyStories((prev) => prev.filter((s) => s.id !== storyId));
  };

  useEffect(() => {
    void (async () => {
      try {
        const [me, favs, revs, stories] = await Promise.all([
          usersApi.getMe(),
          usersApi.getFavorites(),
          usersApi.getMyReviews(),
          fictionsApi.findMine(),
        ]);
        setUser(me);
        setFavorites(favs);
        setReviews(revs);
        setMyStories(stories);
      } catch {
        router.replace('/');
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-muted-foreground">Loading...</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-muted-foreground">
          You need to be logged in to edit your profile.
        </p>
      </div>
    );
  }

  const initials = user.name
    .split(' ')
    .map((n) => n[0])
    .join('');

  const joinedDate = new Date(user.createdAt).toLocaleDateString('pt-BR', {
    month: 'long',
    year: 'numeric',
  });

  return (
    <>
      <CreateStoryModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
      />
      <EditStoryModal
        isOpen={isEditModalOpen}
        onClose={() => {
          setIsEditModalOpen(false);
          setEditingStory(null);
        }}
        fiction={editingStory}
        onSaved={handleSaveStory}
        onDeleted={handleDeleteStory}
      />
      <div className="min-h-screen bg-background">
        <main className="container mx-auto px-4 py-8">
          {/* Profile Header */}
          <div className="flex flex-col md:flex-row gap-6 mb-8">
            <div className="shrink-0">
              <Avatar className="h-24 w-24 md:h-32 md:w-32 border-2 border-primary/30">
                <AvatarFallback className="bg-primary/20 text-primary text-2xl md:text-3xl font-serif">
                  {initials}
                </AvatarFallback>
              </Avatar>
            </div>
            <div className="flex-1">
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                <div>
                  <h1 className="text-2xl md:text-3xl font-serif font-bold text-foreground">
                    {user.name}
                  </h1>
                  <p className="text-muted-foreground">{user.email}</p>
                  <p className="text-sm text-muted-foreground mt-1">
                    Member since {joinedDate}
                  </p>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  className="w-fit"
                  onClick={() => setActiveTab('settings')}
                >
                  <Edit3 className="h-4 w-4 mr-2" />
                  Edit Profile
                </Button>
              </div>
              {/* Stats */}
              <div className="flex flex-wrap gap-6 mt-6">
                <div className="text-center">
                  <p className="text-2xl font-bold text-primary">
                    {reviews.length}
                  </p>
                  <p className="text-sm text-muted-foreground">Reviews</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-primary">
                    {favorites.length}
                  </p>
                  <p className="text-sm text-muted-foreground">Favorites</p>
                </div>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <Tabs
            value={activeTab}
            onValueChange={setActiveTab}
            className="space-y-6"
          >
            <TabsList className="bg-card border border-border w-full justify-start overflow-x-auto">
              <TabsTrigger
                value="mystories"
                className="flex items-center gap-2"
              >
                <BookMarked className="h-4 w-4" />
                My Stories
              </TabsTrigger>
              <TabsTrigger
                value="favorites"
                className="flex items-center gap-2"
              >
                <Heart className="h-4 w-4" />
                Favorites
              </TabsTrigger>
              <TabsTrigger value="reviews" className="flex items-center gap-2">
                <MessageSquare className="h-4 w-4" />
                My Reviews
              </TabsTrigger>
              <TabsTrigger value="settings" className="flex items-center gap-2">
                <Settings className="h-4 w-4" />
                Settings
              </TabsTrigger>
            </TabsList>

            {/* My Stories Tab */}
            <TabsContent value="mystories" className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-serif font-semibold">
                  Stories You Own
                </h2>
                <div className="flex items-center gap-3">
                  <p className="text-sm text-muted-foreground">
                    {myStories.length} stories
                  </p>
                  <Button
                    onClick={() => setIsCreateModalOpen(true)}
                    size="sm"
                    className="gap-2 bg-primary hover:bg-primary/90"
                  >
                    <Plus className="w-4 h-4" />
                    New Story
                  </Button>
                </div>
              </div>
              {myStories.length > 0 ? (
                <div className="space-y-4">
                  {myStories.map((story) => (
                    <Card
                      key={story.id}
                      className="bg-card/50 border-border hover:border-primary/30 transition-colors"
                    >
                      <CardContent className="p-5">
                        <div className="flex gap-4">
                          {/* Cover */}
                          <div className="w-20 h-28 bg-linear-to-br from-primary/30 to-accent/30 rounded-lg flex items-center justify-center shrink-0">
                            <BookOpen className="h-8 w-8 text-primary/70" />
                          </div>

                          {/* Info */}
                          <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between gap-3">
                              <div>
                                <Link
                                  href={`/story/${story.id}`}
                                  className="hover:text-primary transition-colors"
                                >
                                  <h3 className="font-serif font-semibold text-lg text-foreground">
                                    {story.title}
                                  </h3>
                                </Link>
                                <div className="flex items-center gap-2 mt-1">
                                  {(
                                    story.genre
                                      ?.split(',')
                                      .map((g) => g.trim())
                                      .filter(Boolean) ?? []
                                  ).map((genre) => (
                                    <Badge
                                      key={genre}
                                      variant="secondary"
                                      className="text-xs"
                                    >
                                      {genre}
                                    </Badge>
                                  ))}
                                </div>
                              </div>

                              {/* Actions Dropdown */}
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    className="h-8 w-8"
                                  >
                                    <MoreVertical className="h-4 w-4" />
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent
                                  align="end"
                                  className="bg-card border-border"
                                >
                                  <DropdownMenuItem
                                    onClick={() => handleEditStory(story)}
                                    className="cursor-pointer"
                                  >
                                    <Edit3 className="h-4 w-4 mr-2" />
                                    Edit Story
                                  </DropdownMenuItem>
                                  {story.link && (
                                    <DropdownMenuItem asChild>
                                      <Link
                                        href={story.link}
                                        target="_blank"
                                        className="cursor-pointer"
                                      >
                                        <ExternalLink className="h-4 w-4 mr-2" />
                                        View Live
                                      </Link>
                                    </DropdownMenuItem>
                                  )}
                                  <DropdownMenuItem
                                    onClick={() => handleEditStory(story)}
                                    className="cursor-pointer text-destructive focus:text-destructive"
                                  >
                                    <Trash2 className="h-4 w-4 mr-2" />
                                    Delete
                                  </DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </div>

                            <p className="text-sm text-muted-foreground mt-2 line-clamp-2">
                              {story.description}
                            </p>

                            {/* Authors */}
                            {(story.authors?.length ?? 0) > 1 && (
                              <div className="flex items-center gap-2 mt-3">
                                <Users className="h-4 w-4 text-muted-foreground" />
                                <span className="text-xs text-muted-foreground">
                                  {story.authors?.length} contributors:{' '}
                                  {(story.authors ?? [])
                                    .map((a) => a.name)
                                    .join(', ')}
                                </span>
                              </div>
                            )}

                            {/* Last Updated */}
                            <p className="text-xs text-muted-foreground mt-2">
                              Last updated:{' '}
                              {new Date(story.updatedAt).toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <Card className="bg-card/50 border-border">
                  <CardContent className="flex flex-col items-center justify-center py-12">
                    <BookMarked className="h-12 w-12 text-muted-foreground/50 mb-4" />
                    <h3 className="text-lg font-medium text-foreground mb-2">
                      No stories yet
                    </h3>
                    <p className="text-muted-foreground text-center max-w-md mb-4">
                      Share your interactive fiction with the world. Create your
                      first story and let others experience your narrative.
                    </p>
                    <Button
                      onClick={() => setIsCreateModalOpen(true)}
                      className="gap-2"
                    >
                      <Plus className="w-4 h-4" />
                      Create Your First Story
                    </Button>
                  </CardContent>
                </Card>
              )}
            </TabsContent>

            {/* Favorites Tab */}
            <TabsContent value="favorites" className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-serif font-semibold">
                  Your Favorite Stories
                </h2>
                <p className="text-sm text-muted-foreground">
                  {favorites.length} stories
                </p>
              </div>
              {favorites.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {favorites.map(({ fiction, fictionId }) => (
                    <StoryCard
                      key={fictionId}
                      story={{
                        id: fiction.id.toString(),
                        title: fiction.title,
                        author: {
                          id: fiction.author.id.toString(),
                          name: fiction.author.name,
                        },
                        genre: fiction.genre ?? 'Unknown',
                        description: fiction.description ?? '',
                      }}
                      initialFavorited={true}
                      onToggleFavorite={(id, nowFav) => {
                        if (!nowFav)
                          setFavorites((prev) =>
                            prev.filter((f) => f.fictionId !== id),
                          );
                      }}
                    />
                  ))}
                </div>
              ) : (
                <Card className="bg-card/50 border-border">
                  <CardContent className="flex flex-col items-center justify-center py-12">
                    <Heart className="h-12 w-12 text-muted-foreground/50 mb-4" />
                    <h3 className="text-lg font-medium text-foreground mb-2">
                      No favorites yet
                    </h3>
                    <p className="text-muted-foreground text-center max-w-md mb-4">
                      Start exploring interactive fiction and save your favorite
                      stories here.
                    </p>
                    <Link href="/browse">
                      <Button>Browse Stories</Button>
                    </Link>
                  </CardContent>
                </Card>
              )}
            </TabsContent>

            {/* My Reviews Tab */}
            <TabsContent value="reviews" className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-serif font-semibold">
                  Your Reviews
                </h2>
                <p className="text-sm text-muted-foreground">
                  {reviews.length} reviews
                </p>
              </div>
              {reviews.length > 0 ? (
                <div className="space-y-4">
                  {reviews.map((review) => (
                    <Card key={review.id} className="bg-card/50 border-border">
                      <CardContent className="p-6">
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex-1">
                            <Link
                              href={`/story/${review.fiction.id}`}
                              className="hover:text-primary transition-colors"
                            >
                              <h3 className="font-medium text-foreground">
                                {review.fiction.title}
                              </h3>
                            </Link>
                            <div className="flex items-center gap-2 mt-1">
                              <div className="flex items-center">
                                {[...Array(5)].map((_, i) => (
                                  <Star
                                    key={i}
                                    className={`h-4 w-4 ${
                                      i < review.rating
                                        ? 'text-yellow-500 fill-yellow-500'
                                        : 'text-muted-foreground/30'
                                    }`}
                                  />
                                ))}
                              </div>
                              <span className="text-sm text-muted-foreground">
                                {new Date(review.createdAt).toLocaleDateString(
                                  'pt-BR',
                                )}
                              </span>
                            </div>
                            {review.comment && (
                              <p className="mt-3 text-foreground/80">
                                {review.comment}
                              </p>
                            )}
                            <div className="flex gap-4 mt-2 text-xs text-muted-foreground">
                              <span>Narrative: {review.narrative}/5</span>
                              <span>
                                Interactivity: {review.interactivity}/5
                              </span>
                              <span>Originality: {review.originality}/5</span>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Link href={`/story/${review.fiction.id}`}>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8"
                              >
                                <ChevronRight className="h-4 w-4" />
                              </Button>
                            </Link>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <Card className="bg-card/50 border-border">
                  <CardContent className="flex flex-col items-center justify-center py-12">
                    <MessageSquare className="h-12 w-12 text-muted-foreground/50 mb-4" />
                    <h3 className="text-lg font-medium text-foreground mb-2">
                      No review yet
                    </h3>
                    <p className="text-muted-foreground text-center max-w-md mb-4">
                      Read and review interactive fictions to see your reviews
                      here.
                    </p>
                    <Link href="/browse">
                      <Button>Browse Stories</Button>
                    </Link>
                  </CardContent>
                </Card>
              )}
            </TabsContent>

            {/* Settings Tab */}
            <TabsContent value="settings">
              <ProfileSettings
                user={{
                  name: user.name,
                  username: user.name,
                  email: user.email,
                }}
              />
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </>
  );
}

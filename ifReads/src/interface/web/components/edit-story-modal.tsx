'use client';

import { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  BookOpen,
  Link as LinkIcon,
  Users,
  UserPlus,
  Trash2,
  Save,
  Tag,
  ImageIcon,
} from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { type Fiction, fictionsApi } from '@/app/api/fictions';
import { authorsApi } from '@/app/api/authors';

interface LocalAuthor {
  localId: string;
  apiId?: number;
  name: string;
  role: string;
}

interface EditStoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  fiction: Fiction | null;
  onSaved: (updated: Fiction) => void;
  onDeleted: (fictionId: number) => void;
}

const GENRES = [
  'Fantasy',
  'Sci-Fi',
  'Mystery',
  'Romance',
  'Horror',
  'Adventure',
  'Historical',
  'Comedy',
  'Drama',
  'Thriller',
];

const AUTHOR_ROLES = [
  { value: 'main_author', label: 'Main Author' },
  { value: 'coauthor', label: 'Co-Author' },
  { value: 'collaborator', label: 'Collaborator' },
];

function mapRole(role: string): 'main_author' | 'coauthor' | 'collaborator' {
  if (role === 'main_author') return 'main_author';
  if (role === 'coauthor' || role === 'co_author') return 'coauthor';
  return 'collaborator';
}

export function EditStoryModal({
  isOpen,
  onClose,
  fiction,
  onSaved,
  onDeleted,
}: EditStoryModalProps) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [storyUrl, setStoryUrl] = useState('');
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
  const [authors, setAuthors] = useState<LocalAuthor[]>([]);
  const [removedApiIds, setRemovedApiIds] = useState<number[]>([]);
  const [newAuthorName, setNewAuthorName] = useState('');
  const [newAuthorRole, setNewAuthorRole] = useState('coauthor');
  const [activeTab, setActiveTab] = useState('basic');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (fiction && isOpen) {
      setTitle(fiction.title);
      setDescription(fiction.description ?? '');
      setStoryUrl(fiction.link ?? '');
      setSelectedGenres(
        fiction.genre
          ? fiction.genre
              .split(',')
              .map((g) => g.trim())
              .filter(Boolean)
          : [],
      );
      setAuthors(
        (fiction.authors ?? []).map((a) => ({
          localId: String(a.id),
          apiId: a.id,
          name: a.name,
          role: a.role,
        })),
      );
      setRemovedApiIds([]);
      setNewAuthorName('');
      setNewAuthorRole('coauthor');
      setActiveTab('basic');
      setError(null);
    }
  }, [fiction, isOpen]);

  const toggleGenre = (genre: string) => {
    setSelectedGenres((prev) =>
      prev.includes(genre)
        ? prev.filter((g) => g !== genre)
        : prev.length < 3
          ? [...prev, genre]
          : prev,
    );
  };

  const addAuthor = () => {
    if (!newAuthorName.trim()) return;
    setAuthors((prev) => [
      ...prev,
      {
        localId: Date.now().toString(),
        name: newAuthorName.trim(),
        role: newAuthorRole,
      },
    ]);
    setNewAuthorName('');
    setNewAuthorRole('coauthor');
  };

  const removeAuthor = (localId: string) => {
    const target = authors.find((a) => a.localId === localId);
    if (!target) return;
    const firstMain = authors.find((a) => a.role === 'main_author');
    if (firstMain?.localId === localId) return;
    if (target.apiId !== undefined) {
      setRemovedApiIds((prev) => [...prev, target.apiId!]);
    }
    setAuthors((prev) => prev.filter((a) => a.localId !== localId));
  };

  const updateAuthorRole = (localId: string, role: string) => {
    setAuthors((prev) =>
      prev.map((a) => (a.localId === localId ? { ...a, role } : a)),
    );
  };

  const handleSave = async () => {
    if (!fiction) return;
    setError(null);
    setLoading(true);
    try {
      const updated = await fictionsApi.update(fiction.id, {
        title: title.trim(),
        description: description.trim() || undefined,
        genre:
          selectedGenres.length > 0 ? selectedGenres.join(', ') : undefined,
        link: storyUrl.trim() || undefined,
      });
      for (const a of authors.filter((a) => a.apiId === undefined)) {
        await authorsApi.create(fiction.id, {
          name: a.name,
          role: mapRole(a.role),
        });
      }
      for (const id of removedApiIds) {
        await authorsApi.remove(fiction.id, id);
      }
      onSaved(updated);
      onClose();
    } catch (err: any) {
      const msg = err?.response?.data?.message;
      setError(
        Array.isArray(msg)
          ? msg.join(', ')
          : (msg ?? 'Erro ao salvar. Tente novamente.'),
      );
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!fiction) return;
    setLoading(true);
    try {
      await fictionsApi.remove(fiction.id);
      onDeleted(fiction.id);
      onClose();
    } catch (err: any) {
      const msg = err?.response?.data?.message;
      setError(
        Array.isArray(msg) ? msg.join(', ') : (msg ?? 'Erro ao excluir.'),
      );
    } finally {
      setLoading(false);
    }
  };

  if (!fiction) return null;

  const isOwnerAuthor = (a: LocalAuthor) =>
    a.role === 'main_author' && authors.indexOf(a) === 0;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-card border-border max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3 font-serif text-2xl">
            <div className="p-2 rounded-lg bg-primary/20">
              <BookOpen className="w-6 h-6 text-primary" />
            </div>
            Edit Story
          </DialogTitle>
        </DialogHeader>

        {error && (
          <p className="text-sm text-destructive bg-destructive/10 px-3 py-2 rounded-md">
            {error}
          </p>
        )}

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="bg-muted border border-border w-full justify-start">
            <TabsTrigger value="basic">Basic Info</TabsTrigger>
            <TabsTrigger value="authors">Authors</TabsTrigger>
          </TabsList>

          <TabsContent value="basic" className="space-y-5 mt-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">
                Story Title <span className="text-destructive">*</span>
              </label>
              <Input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter your story's title"
                className="bg-input border-border focus:border-primary focus:ring-primary"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">
                Description
              </label>
              <Textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Write a compelling description..."
                className="bg-input border-border focus:border-primary focus:ring-primary min-h-30 resize-none"
              />
            </div>

            <div className="space-y-3">
              <label className="text-sm font-medium text-foreground">
                Genres
                <span className="text-muted-foreground font-normal ml-2">
                  (Select up to 3)
                </span>
              </label>
              <div className="flex flex-wrap gap-2">
                {GENRES.map((genre) => (
                  <button
                    key={genre}
                    type="button"
                    onClick={() => toggleGenre(genre)}
                    className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all ${
                      selectedGenres.includes(genre)
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-muted text-muted-foreground hover:bg-muted/80 hover:text-foreground'
                    }`}
                  >
                    {genre}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground flex items-center gap-2">
                <LinkIcon className="w-4 h-4 text-primary" />
                Story URL
              </label>
              <Input
                value={storyUrl}
                onChange={(e) => setStoryUrl(e.target.value)}
                placeholder="https://example.com/your-story"
                className="bg-input border-border focus:border-primary focus:ring-primary"
              />
            </div>
          </TabsContent>

          <TabsContent value="authors" className="space-y-5 mt-4">
            <div className="space-y-3">
              <label className="text-sm font-medium text-foreground flex items-center gap-2">
                <Users className="w-4 h-4 text-primary" />
                Authors & Contributors
              </label>
              <p className="text-xs text-muted-foreground">
                The owner (main author) cannot be removed.
              </p>
            </div>

            <div className="space-y-2">
              {authors.map((author) => {
                const owner = isOwnerAuthor(author);
                return (
                  <div
                    key={author.localId}
                    className={`flex items-center gap-3 p-3 rounded-lg border ${
                      owner
                        ? 'bg-primary/10 border-primary/30'
                        : 'bg-muted/50 border-border'
                    }`}
                  >
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        owner ? 'bg-primary/30' : 'bg-primary/20'
                      }`}
                    >
                      <span className="text-sm font-medium text-primary">
                        {author.name.charAt(0).toUpperCase()}
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-foreground truncate">
                        {author.name}
                        {owner && (
                          <span className="text-xs text-primary ml-2 font-normal">
                            (Owner)
                          </span>
                        )}
                      </p>
                    </div>
                    <Select
                      value={author.role}
                      onValueChange={(value) =>
                        updateAuthorRole(author.localId, value)
                      }
                      disabled={owner}
                    >
                      <SelectTrigger
                        className={`w-36 border-border ${owner ? 'bg-primary/10' : 'bg-input'}`}
                      >
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-card border-border">
                        {AUTHOR_ROLES.map((role) => (
                          <SelectItem key={role.value} value={role.value}>
                            {role.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {!owner && (
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={() => removeAuthor(author.localId)}
                        className="h-8 w-8 text-muted-foreground hover:text-destructive hover:bg-destructive/10"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    )}
                  </div>
                );
              })}
            </div>

            <div className="p-4 bg-secondary/30 rounded-lg border border-dashed border-border">
              <p className="text-sm font-medium text-foreground mb-3 flex items-center gap-2">
                <UserPlus className="w-4 h-4 text-primary" />
                Add Another Author
              </p>
              <div className="flex gap-2">
                <Input
                  value={newAuthorName}
                  onChange={(e) => setNewAuthorName(e.target.value)}
                  placeholder="Author name..."
                  className="flex-1 bg-input border-border focus:border-primary focus:ring-primary"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      addAuthor();
                    }
                  }}
                />
                <Select value={newAuthorRole} onValueChange={setNewAuthorRole}>
                  <SelectTrigger className="w-36 bg-input border-border">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-card border-border">
                    {AUTHOR_ROLES.filter((r) => r.value !== 'main_author').map(
                      (role) => (
                        <SelectItem key={role.value} value={role.value}>
                          {role.label}
                        </SelectItem>
                      ),
                    )}
                  </SelectContent>
                </Select>
                <Button
                  type="button"
                  onClick={addAuthor}
                  disabled={!newAuthorName.trim()}
                  className="bg-primary hover:bg-primary/90 text-primary-foreground"
                >
                  <UserPlus className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </TabsContent>
        </Tabs>

        <div className="flex items-center justify-between pt-4 border-t border-border mt-4">
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button
                variant="destructive"
                className="gap-2"
                disabled={loading}
              >
                <Trash2 className="w-4 h-4" />
                Delete Story
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent className="bg-card border-border">
              <AlertDialogHeader>
                <AlertDialogTitle className="font-serif">
                  Delete this story?
                </AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete
                  &quot;{fiction.title}&quot; and remove all associated reviews
                  and ratings.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel className="bg-muted border-border hover:bg-muted/80">
                  Cancel
                </AlertDialogCancel>
                <AlertDialogAction
                  onClick={handleDelete}
                  className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                >
                  Delete
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>

          <div className="flex gap-3">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              disabled={loading}
              className="border-border hover:bg-muted"
            >
              Cancel
            </Button>
            <Button
              type="button"
              onClick={handleSave}
              disabled={loading || !title.trim()}
              className="bg-primary hover:bg-primary/90 text-primary-foreground gap-2"
            >
              <Save className="w-4 h-4" />
              {loading ? 'Saving...' : 'Save Changes'}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

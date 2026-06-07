'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { BookOpen, Sparkles, User, LogOut, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { AuthModal } from '@/components/auth-modal';
import { authApi } from '@/app/api/middleware/auth';
import { CreateStoryModal } from '@/components/create-story-model';

export function AppNavbar() {
  const router = useRouter();
  const pathname = usePathname();
  const [authModal, setAuthModal] = useState<'signin' | 'login' | null>(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [authedUser, setAuthedUser] = useState<{
    id: number;
    email: string;
  } | null>(null);

  const navLinks = [
    { href: '/browse', label: 'Browse' },
    { href: '/top-rated', label: 'Top Rated' },
    { href: '/new-releases', label: 'New Releases' },
  ];

  const checkAuth = () => {
    authApi
      .checkAuth()
      .then(({ isValid, user }) => {
        setAuthedUser(isValid && user ? user : null);
      })
      .catch(() => setAuthedUser(null));
  };

  useEffect(() => {
    checkAuth();
  }, []);

  const handleLogout = async () => {
    await authApi.logout().catch(() => {});
    setAuthedUser(null);
    router.refresh();
  };

  return (
    <>
      <CreateStoryModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onSuccess={() => router.refresh()}
      />
      <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border/50">
        <div className="flex items-center justify-between px-6 py-4 md:px-12 lg:px-20">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="relative">
              <BookOpen className="w-7 h-7 text-primary transition-transform group-hover:scale-110" />
              <Sparkles className="w-2.5 h-2.5 text-teal-glow absolute -top-0.5 -right-0.5" />
            </div>
            <span className="text-xl font-serif font-semibold text-foreground">
              ifReads
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-6">
            {navLinks.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className={`text-sm transition-colors ${
                  pathname === href
                    ? 'text-primary font-medium'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                {label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            {authedUser ? (
              <>
                <Button
                  onClick={() => setIsCreateModalOpen(true)}
                  className="bg-primary/90 text-primary-foreground hover:bg-primary gap-2"
                >
                  <Plus className="w-4 h-4" />
                  Add Story
                </Button>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="rounded-full border border-primary/30 hover:border-primary/60"
                    >
                      <Avatar className="h-8 w-8">
                        <AvatarFallback className="bg-primary/20 text-primary text-xs">
                          {authedUser.email[0].toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-44">
                    <DropdownMenuItem asChild>
                      <Link
                        href="/profile"
                        className="flex items-center gap-2 cursor-pointer"
                      >
                        <User className="w-4 h-4" />
                        My Profile
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      onSelect={() => void handleLogout()}
                      className="flex items-center gap-2 text-destructive focus:text-destructive cursor-pointer"
                    >
                      <LogOut className="w-4 h-4" />
                      Logout
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            ) : (
              <>
                <Button
                  variant="ghost"
                  className="text-foreground hover:text-primary hover:bg-primary/10"
                  onClick={() => setAuthModal('login')}
                >
                  Login
                </Button>
                <Button
                  className="bg-primary/90 text-primary-foreground hover:bg-primary"
                  onClick={() => setAuthModal('signin')}
                >
                  Sign Up
                </Button>
              </>
            )}
          </div>
        </div>
      </header>

      <AuthModal
        isOpen={authModal !== null}
        mode={authModal ?? 'login'}
        onClose={() => {
          setAuthModal(null);
          checkAuth();
        }}
        onSwitchMode={(mode) => setAuthModal(mode)}
      />
    </>
  );
}

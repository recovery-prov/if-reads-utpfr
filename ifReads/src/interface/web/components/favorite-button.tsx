'use client';

import { useState, useEffect } from 'react';
import { Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { usersApi } from '@/app/api/middleware/users';

interface FavoriteButtonProps {
  fictionId: number;
}

export function FavoriteButton({ fictionId }: FavoriteButtonProps) {
  const [isFav, setIsFav] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    usersApi
      .getFavorites()
      .then((favs) => {
        setIsFav(favs.some((f) => f.fictionId === fictionId));
      })
      .catch(() => {});
  }, [fictionId]);

  const handleToggle = async () => {
    if (loading) return;
    setLoading(true);
    try {
      if (isFav) {
        await usersApi.removeFavorite(fictionId);
        setIsFav(false);
      } else {
        await usersApi.addFavorite(fictionId);
        setIsFav(true);
      }
    } catch {
      // 401 = não autenticado, ignorar
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button
      variant="outline"
      className={`flex-1 border-border/50 hover:bg-secondary/50 transition-colors ${
        isFav
          ? 'bg-primary/10 text-primary border-primary/40 hover:bg-primary/20'
          : 'bg-secondary/30 text-foreground'
      }`}
      onClick={() => void handleToggle()}
      disabled={loading}
    >
      <Heart
        className={`w-4 h-4 mr-2 transition-colors ${isFav ? 'fill-primary text-primary' : ''}`}
      />
      {isFav ? 'Favorited' : 'Favorite'}
    </Button>
  );
}

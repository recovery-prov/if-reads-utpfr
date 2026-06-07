'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  User,
  Mail,
  Bell,
  Shield,
  LogOut,
  Eye,
  EyeOff,
  Save,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Switch } from '@/components/ui/switch';
import { usersApi } from '@/app/api/middleware/users';
import { authApi } from '@/app/api/middleware/auth';

interface UserProps {
  name: string;
  username: string;
  email: string;
}

interface ProfileSettingsProps {
  user: UserProps;
}

export function ProfileSettings({ user }: ProfileSettingsProps) {
  const router = useRouter();

  // Profile form
  const [formData, setFormData] = useState({
    name: user.name,
    email: user.email,
  });
  const [profileLoading, setProfileLoading] = useState(false);
  const [profileError, setProfileError] = useState<string | null>(null);
  const [profileSuccess, setProfileSuccess] = useState(false);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [passwordLoading, setPasswordLoading] = useState(false);
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [passwordSuccess, setPasswordSuccess] = useState(false);

  const [notifications, setNotifications] = useState({
    newReviews: true,
    newFollowers: true,
    storyUpdates: false,
    newsletter: true,
  });

  const handleSaveProfile = async () => {
    setProfileError(null);
    setProfileSuccess(false);
    setProfileLoading(true);
    try {
      await usersApi.updateMe({
        name: formData.name.trim() || undefined,
        email: formData.email.trim() || undefined,
      });
      setProfileSuccess(true);
    } catch (err: any) {
      const msg = err?.response?.data?.message;
      setProfileError(
        Array.isArray(msg) ? msg.join(', ') : (msg ?? 'Erro ao salvar.'),
      );
    } finally {
      setProfileLoading(false);
    }
  };

  const handleChangePassword = async () => {
    setPasswordError(null);
    setPasswordSuccess(false);
    if (newPassword !== confirmPassword) {
      setPasswordError('As senhas não coincidem.');
      return;
    }
    if (newPassword.length < 6) {
      setPasswordError('A nova senha precisa ter pelo menos 6 caracteres.');
      return;
    }
    setPasswordLoading(true);
    try {
      await usersApi.changePassword({ currentPassword, newPassword });
      setPasswordSuccess(true);
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
    } catch (err: any) {
      const msg = err?.response?.data?.message;
      setPasswordError(
        Array.isArray(msg)
          ? msg.join(', ')
          : (msg ?? 'Erro ao atualizar senha.'),
      );
    } finally {
      setPasswordLoading(false);
    }
  };

  const handleLogout = async () => {
    await authApi.logout().catch(() => {});
    router.replace('/');
  };

  return (
    <div className="space-y-6 max-w-2xl">
      {/* Profile Information */}
      <Card className="bg-card/50 border-border">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 font-serif">
            <User className="h-5 w-5 text-primary" />
            Profile Information
          </CardTitle>
          <CardDescription>
            Update your personal information and public profile.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Display Name</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) =>
                  setFormData((p) => ({ ...p, name: e.target.value }))
                }
                className="bg-input border-border"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">
                <Mail className="inline h-3.5 w-3.5 mr-1" />
                Email
              </Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) =>
                  setFormData((p) => ({ ...p, email: e.target.value }))
                }
                className="bg-input border-border"
              />
            </div>
          </div>
          {profileError && (
            <p className="text-sm text-destructive">{profileError}</p>
          )}
          {profileSuccess && (
            <p className="text-sm text-green-500">Perfil atualizado!</p>
          )}
          <Button
            onClick={() => void handleSaveProfile()}
            disabled={profileLoading}
            className="bg-primary text-primary-foreground hover:bg-primary/90"
          >
            <Save className="h-4 w-4 mr-2" />
            {profileLoading ? 'Salvando...' : 'Save Changes'}
          </Button>
        </CardContent>
      </Card>

      {/* Password & Security */}
      <Card className="bg-card/50 border-border">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 font-serif">
            <Shield className="h-5 w-5 text-primary" />
            Password &amp; Security
          </CardTitle>
          <CardDescription>
            Manage your password and security settings.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="current-password">Current Password</Label>
            <div className="relative">
              <Input
                id="current-password"
                type={showPassword ? 'text' : 'password'}
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                className="bg-input border-border pr-10"
                placeholder="Enter current password"
              />
              <button
                type="button"
                onClick={() => setShowPassword((v) => !v)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
                {showPassword ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </button>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="new-password">New Password</Label>
              <Input
                id="new-password"
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="bg-input border-border"
                placeholder="Enter new password"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirm-password">Confirm Password</Label>
              <Input
                id="confirm-password"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="bg-input border-border"
                placeholder="Confirm new password"
              />
            </div>
          </div>
          {passwordError && (
            <p className="text-sm text-destructive">{passwordError}</p>
          )}
          {passwordSuccess && (
            <p className="text-sm text-green-500">Senha atualizada!</p>
          )}
          <Button
            variant="outline"
            onClick={() => void handleChangePassword()}
            disabled={
              passwordLoading ||
              !currentPassword ||
              !newPassword ||
              !confirmPassword
            }
          >
            {passwordLoading ? 'Atualizando...' : 'Update Password'}
          </Button>
        </CardContent>
      </Card>

      {/* Notifications */}
      <Card className="bg-card/50 border-border">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 font-serif">
            <Bell className="h-5 w-5 text-primary" />
            Notification Preferences
          </CardTitle>
          <CardDescription>
            Choose what notifications you want to receive.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {(
            [
              [
                'newReviews',
                'New Reviews',
                'Get notified when someone reviews a story you follow.',
              ],
              [
                'newFollowers',
                'New Followers',
                'Get notified when someone follows your profile.',
              ],
              [
                'storyUpdates',
                'Story Updates',
                'Get notified when authors you follow publish new content.',
              ],
              [
                'newsletter',
                'Newsletter',
                'Receive our weekly digest of top interactive fiction.',
              ],
            ] as const
          ).map(([key, label, desc]) => (
            <div key={key}>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>{label}</Label>
                  <p className="text-sm text-muted-foreground">{desc}</p>
                </div>
                <Switch
                  checked={notifications[key]}
                  onCheckedChange={(checked) =>
                    setNotifications((prev) => ({ ...prev, [key]: checked }))
                  }
                />
              </div>
              <Separator className="bg-border mt-4" />
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Account */}
      <Card className="bg-card/50 border-border">
        <CardHeader>
          <CardTitle className="font-serif">Account</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <p className="font-medium text-foreground">Log Out</p>
              <p className="text-sm text-muted-foreground">
                Sign out of your ifReads account.
              </p>
            </div>
            <Button variant="outline" onClick={() => void handleLogout()}>
              <LogOut className="h-4 w-4 mr-2" />
              Log Out
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

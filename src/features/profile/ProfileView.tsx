'use client';

import * as React from 'react';
import { Tabs } from '@/components/ui/tabs';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Avatar } from '@/components/ui/avatar';
import { FileUpload } from '@/components/ui/file-upload';
import { Checkbox } from '@/components/ui/checkbox';
import { useUserStore } from '@/store/use-user-store';
import { toast } from 'sonner';
import { User, Shield, Palette, Settings } from 'lucide-react';

export function ProfileView() {
  const { user, setUser } = useUserStore();
  const [activeTab, setActiveTab] = React.useState('general');
  const [name, setName] = React.useState(user?.name || 'Zaid');
  const [email, setEmail] = React.useState(user?.email || 'zaid@fitsync.ai');
  const [twoFactor, setTwoFactor] = React.useState(user?.twoFactorEnabled || false);
  const [isLoading, setIsLoading] = React.useState(false);

  const tabs = [
    { id: 'general', label: 'General', icon: <User className="h-4 w-4" /> },
    { id: 'security', label: 'Security', icon: <Shield className="h-4 w-4" /> },
    { id: 'appearance', label: 'Appearance', icon: <Palette className="h-4 w-4" /> },
    { id: 'account', label: 'Account', icon: <Settings className="h-4 w-4" /> },
  ];

  const handleSaveGeneral = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    await new Promise((res) => setTimeout(res, 600));
    if (user) {
      setUser({ ...user, name, email });
    }
    toast.success('Profile updated successfully!');
    setIsLoading(false);
  };

  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h2 className="text-xl font-bold text-white">Account & Settings</h2>
        <p className="text-xs text-slate-400">Manage your profile, security preferences, and account configuration</p>
      </div>

      <Tabs tabs={tabs} activeTab={activeTab} onChange={setActiveTab} />

      {activeTab === 'general' && (
        <Card className="p-6 bg-[#0E1422] border-slate-800 space-y-6">
          <CardHeader className="p-0">
            <CardTitle className="text-base text-white">Profile Details</CardTitle>
            <CardDescription className="text-slate-400">Update your avatar and personal details</CardDescription>
          </CardHeader>

          <div className="flex items-center space-x-6 border-b border-slate-800 pb-6">
            <Avatar src={user?.avatarUrl} fallback={name} size="xl" />
            <div className="flex-1 max-w-md">
              <label className="block text-xs font-semibold text-slate-300 mb-2">Avatar Image</label>
              <FileUpload accept="image/*" />
            </div>
          </div>

          <form onSubmit={handleSaveGeneral} className="space-y-4 max-w-md">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">Full Name</label>
              <Input value={name} onChange={(e) => setName(e.target.value)} />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">Email Address</label>
              <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>

            <Button type="submit" isLoading={isLoading}>
              Save Changes
            </Button>
          </form>
        </Card>
      )}

      {activeTab === 'security' && (
        <Card className="p-6 bg-[#0E1422] border-slate-800 space-y-6">
          <CardHeader className="p-0">
            <CardTitle className="text-base text-white">Security Preferences</CardTitle>
            <CardDescription className="text-slate-400">Configure 2FA and password settings</CardDescription>
          </CardHeader>

          <div className="space-y-4 max-w-md">
            <div className="flex items-center justify-between p-4 rounded-xl border border-slate-800 bg-[#0A0E1A]">
              <div>
                <p className="text-sm font-semibold text-white">Two-Factor Authentication (2FA)</p>
                <p className="text-xs text-slate-400">Receive 6-digit Email OTP codes when logging in</p>
              </div>
              <Checkbox
                checked={twoFactor}
                onChange={(e) => {
                  setTwoFactor(e.target.checked);
                  toast.success(`2FA has been ${e.target.checked ? 'enabled' : 'disabled'}`);
                }}
              />
            </div>

            <div className="pt-4 space-y-3">
              <h4 className="text-xs font-semibold text-slate-300">Change Password</h4>
              <Input type="password" placeholder="Current Password" />
              <Input type="password" placeholder="New Password" />
              <Button variant="secondary" size="sm">Update Password</Button>
            </div>
          </div>
        </Card>
      )}

      {activeTab === 'appearance' && (
        <Card className="p-6 bg-[#0E1422] border-slate-800 space-y-4">
          <CardHeader className="p-0">
            <CardTitle className="text-base text-white">Theme & Display</CardTitle>
            <CardDescription className="text-slate-400">Manage dark mode and interface aesthetics</CardDescription>
          </CardHeader>
          <p className="text-xs text-slate-300">Default SaaS dark theme active (High Contrast Indigo/Emerald Accent).</p>
        </Card>
      )}

      {activeTab === 'account' && (
        <Card className="p-6 bg-[#0E1422] border-slate-800 space-y-6">
          <CardHeader className="p-0">
            <CardTitle className="text-base text-white">Data & Export</CardTitle>
            <CardDescription className="text-slate-400">Manage your data ownership</CardDescription>
          </CardHeader>
          <div className="flex space-x-3">
            <Button variant="outline" size="sm" onClick={() => toast.success('Exporting dataset JSON...')}>
              Export All Data
            </Button>
            <Button variant="danger" size="sm" onClick={() => toast.error('Account deletion requested.')}>
              Delete Account
            </Button>
          </div>
        </Card>
      )}
    </div>
  );
}

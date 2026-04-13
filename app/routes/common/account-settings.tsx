import React from 'react';
import { Badge } from '~/components/ui/badge';
import { Tabs, TabsList, TabsTrigger } from '~/components/ui/tabs';
import { useAuthStore } from '~/hooks/use-auth-store';
import LoadingScreen from '~/components/account-settings/loading-screen';
import ProfileTab from '~/components/account-settings/profile-tab';
import SecurityTab from '~/components/account-settings/security-tab';
import AccountDetailsTab from '~/components/account-settings/account-details-tab';
import getRoleBadgeColor from '~/lib/get-role-badge-color';
import AccountCard from '~/components/account-settings/account-card';
import NotFound from './not-found-error-page';
import { useTranslation } from 'react-i18next';

export type SettingsTabProps = {
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function AccountSettings() {
  const { user, authStatus } = useAuthStore();
  const { t } = useTranslation("settings");

  if (!user) {
    if (authStatus === 'unknown')
      return <LoadingScreen />

    return <NotFound />
  }

  return (
    <div className="h-full overflow-y-auto bg-background/80 backdrop-blur-md rounded-2xl p-4 md:p-8">
      <div className="max-w-5xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">{t('settings:accountSettings')}</h1>
            <p className="mt-1">{t('settings:accountSettingsDescription')}</p>
          </div>
          <Badge className={getRoleBadgeColor(user.role)}>
            {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
          </Badge>
        </div>

        <AccountCard />

        <Tabs defaultValue="profile" className="space-y-4">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="profile">{t('settings:profile')}</TabsTrigger>
            <TabsTrigger value="security">{t('settings:security')}</TabsTrigger>
            <TabsTrigger value="account">{t('settings:accountInfo')}</TabsTrigger>
          </TabsList>

          <ProfileTab />
          <SecurityTab />
          <AccountDetailsTab />
        </Tabs>
      </div>
    </div>
  );
}
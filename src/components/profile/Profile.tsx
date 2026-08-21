import { useState } from 'react';
import Header from '../general/header';
import { useCheckLoginStatus } from '@/api/generated/auth/auth';
import { CustomSpinner } from '@/components/general/CustomSpinner';
import EmptyContent from '@/components/general/EmptyContent';
import { Breadcrumbs } from '@/components/ui/breadcrumbs';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Pencil, Trash2, Mail, Shield, Calendar } from 'lucide-react';
import InitialsAvatar from '@/components/general/InitialsAvatar';
import EditProfileDialog from './EditProfileDialog';
import DeleteAccountDialog from './DeleteAccountDialog';

const Profile = () => {
  const { data: user, isLoading, isError } = useCheckLoginStatus();
  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);

  if (isLoading) {
    return (
      <div className="profile-container">
        <Breadcrumbs items={[{ label: 'Profile' }]} />
        <Header title="Profile" description="" />
        <CustomSpinner />
      </div>
    );
  }

  if (isError || !user) {
    return (
      <div className="profile-container">
        <Breadcrumbs items={[{ label: 'Profile' }]} />
        <Header title="Profile" description="" />
        <EmptyContent
          title="Something went wrong"
          description="Failed to load profile. Please try again later."
        />
      </div>
    );
  }

  return (
    <div className="profile-container">
      <Breadcrumbs items={[{ label: 'Profile' }]} />
      <Header title="Profile" description="Manage your account settings." />
      <div className="px-3 mt-6">
        <Card className="max-w-2xl">
          <CardContent className="pt-6">
            <div className="flex items-start gap-6">
              <InitialsAvatar
                name={user.name}
                index={user.id}
                className="size-16"
                textSize="text-2xl"
                hideTooltip
              />
              <div className="flex-1">
                <h2 className="text-2xl font-bold">{user.name}</h2>
                <div className="mt-3 space-y-2 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <Mail className="size-4" />
                    <span>{user.email}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Shield className="size-4" />
                    <span className="capitalize">{user.role}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="size-4" />
                    <span>Member since {new Date(user.createdAt).toLocaleDateString()}</span>
                  </div>
                </div>
                <div className="mt-4 flex gap-2">
                  <Button variant="outline" size="sm" onClick={() => setEditOpen(true)}>
                    <Pencil className="size-4" /> Edit Profile
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => setDeleteOpen(true)}>
                    <Trash2 className="size-4" /> Delete Account
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      <EditProfileDialog open={editOpen} onOpenChange={setEditOpen} user={user} />
      <DeleteAccountDialog open={deleteOpen} onOpenChange={setDeleteOpen} />
    </div>
  );
};

export default Profile;

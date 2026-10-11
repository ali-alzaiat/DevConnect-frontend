import { useParams } from 'react-router';
import Header from '@/components/general/header';
import { Breadcrumbs } from '@/components/ui/breadcrumbs';
import { Card, CardContent } from '@/components/ui/card';
import { CustomSpinner } from '@/components/general/CustomSpinner';
import EmptyContent from '@/components/general/EmptyContent';
import InitialsAvatar from '@/components/general/InitialsAvatar';
import { useFindUserByID } from '@/api/generated/users/users';
import { Mail, Shield, Calendar } from 'lucide-react';

const UserDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { data: user, isLoading, isError } = useFindUserByID(Number(id));

  if (isLoading) {
    return (
      <div className="user-details">
        <Breadcrumbs items={[{ label: 'Users', href: '/explore' }, { label: 'User' }]} />
        <Header title="User Details" description="" />
        <CustomSpinner />
      </div>
    );
  }

  if (isError || !user) {
    return (
      <div className="user-details">
        <Breadcrumbs items={[{ label: 'Users', href: '/explore' }, { label: 'User' }]} />
        <Header title="User Details" description="" />
        <EmptyContent
          title={isError ? 'Something went wrong' : 'User not found'}
          description={
            isError ? 'Failed to load user. Please try again later.' : 'This user does not exist.'
          }
        />
      </div>
    );
  }

  const name = user.name || 'Unknown';
  const email = user.email;
  const role = user.role ?? 'USER';
  const createdAt = user.createdAt;

  return (
    <div className="user-details">
      <Breadcrumbs items={[{ label: 'Explore', href: '/explore' }, { label: name }]} />
      <Header
        title={name}
        description={`Member since ${createdAt ? new Date(createdAt).toLocaleDateString() : 'unknown'}`}
      />
      <div className="px-3 mt-6">
        <Card className="max-w-2xl">
          <CardContent className="pt-6">
            <div className="flex items-start gap-6">
              <InitialsAvatar
                name={name}
                index={Number(id)}
                className="size-16"
                textSize="text-2xl"
                hideTooltip
              />
              <div className="flex-1 space-y-2 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Mail className="size-4" />
                  <span>{email}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Shield className="size-4" />
                  <span className="capitalize">{role.toLowerCase()}</span>
                </div>
                {createdAt && (
                  <div className="flex items-center gap-2">
                    <Calendar className="size-4" />
                    <span>Joined {new Date(createdAt).toLocaleDateString()}</span>
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default UserDetail;

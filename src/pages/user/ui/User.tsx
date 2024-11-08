import { useProfile } from '@/features/profile/model/useProfile';
import { UserOrder, UserOrderList, UserProfile } from '@/features/user/ui';

export const User = () => {
  const { profileData, isLoading } = useProfile();

  return (
    <div className="flex flex-col">
      <UserProfile nickname={profileData?.nickname} bio={profileData?.bio} profileImageUrl={profileData?.profileImageUrl} providerType={profileData?.providerType} isLoading={isLoading} />
      <UserOrder participantCount={profileData?.participantCount} preRegisterCount={profileData?.preRegisterCount} registeredAuctionCount={profileData?.registeredAuctionCount} />
      <UserOrderList />
    </div>
  );
};

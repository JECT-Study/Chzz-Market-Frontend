export interface IUser {
  nickname: string;
  bio?: string | null;
}

export interface IUserProfile {
  nickname: string;
  bio: string;
}

export interface IProfileProps {
  nickname?: string;
  bio?: string;
  profileImageUrl?: string;
  providerType?: string;
  isLoading?: boolean;
}

export interface IParticipantCountItems {
  failedAuctionCount?: number;
  ongoingAuctionCount?: number;
  successfulAuctionCount?: number;
}

export interface IProfileData {
  nickname: string;
  bio: string;
  participantCount?: IParticipantCountItems;
  preRegisterCount?: number;
  registeredAuctionCount?: number;
  profileImageUrl: string;
  providerType: string;
}

export interface GetAuctionProps {
  pageNumber: number;
  pageSize: number;
  sortType?: string;
}

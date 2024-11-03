export interface IRealTimeNotification {
  notificationId: number;
  message: string;
  type: string;
  auctionId?: number;
}

export interface INotification extends IRealTimeNotification {
  imageUrl: string;
  isRead: boolean;
  createdAt: string;
}

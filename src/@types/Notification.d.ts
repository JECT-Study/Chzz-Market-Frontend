declare module 'Notification' {
  export interface IRealTimeNotification {
    notificationId: number;
    message: string;
    type: string;
    auctionId?: number;
  }

  export interface INotification extends IRealTimeNotification {
    imgUrl: string;
    isRead: boolean;
    createdAt: string;
  }
}

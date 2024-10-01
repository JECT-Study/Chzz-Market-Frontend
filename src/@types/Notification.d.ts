declare module 'Notification' {
  export interface IRealTimeNotification {
    notificationId: number;
    message: string;
    type: string;
    auctionId?: number;
  }

  export interface INotification {
    id: number;
    type: string;
    message: string;
    cdnPath: string;
    isRead: boolean;
    auctionId?: number;
    createdAt: string;
  }
}

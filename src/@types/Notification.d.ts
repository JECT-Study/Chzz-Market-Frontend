declare module 'Notification' {
  export interface RealTimeNotificationType {
    notificationId: number;
    message: string;
    type: string;
    auctionId?: number;
  }

  export interface NotificationType {
    id: number;
    type: string;
    message: string;
    cdnPath: string;
    isRead: boolean;
    auctionId?: number;
    createdAt: string;
  }
}

declare module 'Notification' {
  export interface RealTimeNotificationType {
    id: number;
    title: string;
    message: string;
    buttonName: string;
  }

  export interface NotificationType {
    id: number;
    type: string;
    message: string;
    cdnPath: string;
    isRead: boolean;
    createdAt: string;
  }
}

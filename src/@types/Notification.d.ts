declare module 'Notification' {
  export interface RealTimeNotificationType {
    title: string;
    message: string;
    buttonName: string;
    id: number;
  }

  export interface NotificationType {
    id: number;
    type: string;
    message: string;
    time: string;
    img: string;
    check: boolean;
    link: string;
  }
}

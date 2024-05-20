import { axiosInstance } from '../api';

interface GroupProjectNotification {
  notificationID: number;
  message: string;
  dateTime: Date;
  isActive: boolean;
  isRead: boolean;
  groupProjectID: number;
}

interface ProjectNotification {
  notificationID: number;
  message: string;
  dateTime: Date;
  isActive: boolean;
  isRead: boolean;
  projectID: number;
}

interface CalendarEventNotification {
  notificationID: number;
  message: string;
  dateTime: Date;
  isActive: boolean;
  isRead: boolean;
  calendarEventID: number;
}

export type NotificationRow = {
  notificationID: number;
  message: string;
  dateTime: Date;
  isActive: boolean;
  isRead: boolean;
}

interface Notifications {
  groupProjectNotifications: GroupProjectNotification[];
  projectNotifications: ProjectNotification[];
  calendarEventNotifications: CalendarEventNotification[];
}


export const queryAllNotifications = async () => {
  const response = await axiosInstance.get('/api/notifications/get');
  return response.data as Notifications;
};


export const patchMarkAsRead = async (id: number) => {
  return await axiosInstance.patch(`/api/notifications/markAsRead/${id}`);
};

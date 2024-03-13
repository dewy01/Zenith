import axios from 'axios';
import { BASE_URL } from '~/config/constants';

export interface mutateEvent {
  title: string;
  description: string;
  dateTime: string;
  eventColor: string;
}

export interface EditEvent {
  eventId: number;
  event: mutateEvent;
}

export interface CalendarEvent {
  eventID: number;
  title: string;
  description: string;
  dateTime: string;
  eventColor: string;
}

export interface EventPagination {
  from: string;
  to: string;
}

const axiosInstance = axios.create({ baseURL: BASE_URL });

axiosInstance.interceptors.request.use((config) => {
  const authToken = localStorage.getItem('Auth-token');
  if (authToken) {
    config.headers.Authorization = authToken;
  }
  return config;
});

export const queryEventBetween = async (pagination: EventPagination) => {
  const response = await axiosInstance.get(
    `/api/calendar/getEventBetween/${pagination.from}/${pagination.to}`,
  );
  return response.data as CalendarEvent[];
};

export const postAddEvent = async (event: mutateEvent) => {
  return await axiosInstance.post('/api/calendar/addEvent', event);
};

export const patchEditEvent = async (event: EditEvent) => {
  return await axiosInstance.patch(
    `/api/calendar/updateEvent/${event.eventId}`,
    event.event,
  );
};

export const deleteEvent = async (eventId: number) => {
  return await axiosInstance.delete(`/api/calendar/deleteEvent/${eventId}`);
};

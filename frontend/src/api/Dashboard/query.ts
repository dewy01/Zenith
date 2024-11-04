import { useQuery } from '@tanstack/react-query';
import {
  queryEventsDashboard,
  queryGroupProjectsDashboard,
  queryNotesDashboard,
  queryProjectsDashboard,
  queryTodoDashboard,
} from './api';

export const getTodoDashboard = () => {
  return useQuery({
    queryKey: ['todoDashboard'],
    queryFn: queryTodoDashboard,
  });
};

export const getEventsDashboard = (maxEvents: number = 5) => {
  return useQuery({
    queryKey: ['eventsDashboard', maxEvents],
    queryFn: () => queryEventsDashboard(maxEvents),
  });
};

export const getNotesDashboard = (maxNotes: number = 5) => {
  return useQuery({
    queryKey: ['notesDashboard', maxNotes],
    queryFn: () => queryNotesDashboard(maxNotes),
  });
};

export const getProjectsDashboard = (daysThreshold: number = 7) => {
  return useQuery({
    queryKey: ['projectsDashboard', daysThreshold],
    queryFn: () => queryProjectsDashboard(daysThreshold),
  });
};

export const getGroupProjectsDashboard = (daysThreshold: number = 7) => {
  return useQuery({
    queryKey: ['GroupProjectsDashboard', daysThreshold],
    queryFn: () => queryGroupProjectsDashboard(daysThreshold),
  });
};

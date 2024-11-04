import { axiosInstance } from '../api';
import { ProjectStatus } from '../Projects/api';

export interface TodoCompletion {
    completionPercentage: number;
    totalTodos: number;
    completedTodos: number;
}
  
export interface CalendarEventDashboard {
    eventID: number;
    title: string;
    description: string;
    dateTime: string;
    eventColor: string;
}
  
export interface NoteDashboard {
    noteID: number;
    title: string;
    shortDescription: string;
}

export interface ProjectDashboard {
    projectID: number;
    title: string;
    deadline: string; 
    description: string;
    status: ProjectStatus; 
    completionPercentage: number;
}

export interface GroupProjectsDashboard {
    groupProjectID: number;
    title: string;
    deadline: string;
    description: string;
    status: ProjectStatus; 
    completionPercentage: number;
}

export interface DashboardProjectSummary {
    projects: ProjectDashboard[];
    projectsCountByStatus: Record<'OnHold' | 'InProgress' | 'Done', number>;
}

export interface DashboardGroupProjectSummary {
    projects: GroupProjectsDashboard[];
    projectsCountByStatus: Record<'OnHold' | 'InProgress' | 'Done', number>;
}

// API Queries
export const queryTodoDashboard = async (): Promise<TodoCompletion> => {
    const response = await axiosInstance.get('/api/dashboard/getTodoDashboard');
    return response.data as TodoCompletion;
};

export const queryEventsDashboard = async (maxEvents: number = 5): Promise<CalendarEventDashboard[]> => {
    const response = await axiosInstance.get('/api/dashboard/getEventsDashboard', {
        params: { maxEvents },
    });
    return response.data as CalendarEventDashboard[];
};

export const queryNotesDashboard = async (maxNotes: number = 5): Promise<NoteDashboard[]> => {
    const response = await axiosInstance.get('/api/dashboard/getNotesDashboard', {
        params: { maxNotes },
    });
    return response.data as NoteDashboard[];
};

export const queryProjectsDashboard = async (daysThreshold: number = 7): Promise<DashboardProjectSummary> => {
    const response = await axiosInstance.get('/api/dashboard/getProjectsDashboard', {
        params: { daysThreshold },
    });
    return response.data as DashboardProjectSummary;
};

export const queryGroupProjectsDashboard = async (daysThreshold: number = 7): Promise<DashboardGroupProjectSummary> => {
    const response = await axiosInstance.get('/api/dashboard/getGroupProjectsDashboard', {
        params: { daysThreshold },
    });
    return response.data as DashboardGroupProjectSummary;
};

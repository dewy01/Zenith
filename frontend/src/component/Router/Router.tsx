import { Box } from '@mui/material';
import { lazy, ReactNode, Suspense } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { useAuth } from '~/context/AuthContext';
import { CalendarProvider } from '~/context/CalendarContext';
import { LoadingView } from '~/View/LoadingView/LoadingView';

const Layout = lazy(() =>
  import('~/component/Layout/Layout').then((module) => ({
    default: module.Layout,
  })),
);
const ErrorView = lazy(() =>
  import('~/View/Errors').then((module) => ({ default: module.ErrorView })),
);
const NotFoundView = lazy(() =>
  import('~/View/Errors').then((module) => ({ default: module.NotFoundView })),
);
const NotesView = lazy(() =>
  import('~/View/NotesView').then((module) => ({ default: module.NotesView })),
);
const RegisterView = lazy(() =>
  import('~/View/RegisterView').then((module) => ({
    default: module.RegisterView,
  })),
);
const LoginView = lazy(() =>
  import('~/View/LoginView').then((module) => ({ default: module.LoginView })),
);
const ProjectView = lazy(() =>
  import('~/View/ProjectView/ProjectView').then((module) => ({
    default: module.ProjectView,
  })),
);
const ProjectTaskView = lazy(() =>
  import('~/View/ProjectTask').then((module) => ({
    default: module.ProjectTaskView,
  })),
);
const TodoView = lazy(() =>
  import('~/View/TodoView/TodoView').then((module) => ({
    default: module.TodoView,
  })),
);
const SettingsView = lazy(() =>
  import('~/View/SettingsView').then((module) => ({
    default: module.SettingsView,
  })),
);
const CalendarView = lazy(() =>
  import('~/View/CalendarView').then((module) => ({
    default: module.CalendarView,
  })),
);
const GroupView = lazy(() =>
  import('~/View/GroupView').then((module) => ({ default: module.GroupView })),
);
const LogoutView = lazy(() =>
  import('~/View/LogoutView').then((module) => ({
    default: module.LogoutView,
  })),
);
const GroupProjectTaskView = lazy(() =>
  import('~/View/GroupView/GroupProjectTaskView').then((module) => ({
    default: module.GroupProjectTaskView,
  })),
);
const HomeView = lazy(() =>
  import('~/View/HomeView').then((module) => ({ default: module.HomeView })),
);
const DashboardView = lazy(() =>
  import('~/View/DashboardView').then((module) => ({
    default: module.DashboardView,
  })),
);
const NoConnectionView = lazy(() =>
  import('~/View/NoConnectionView').then((module) => ({
    default: module.NoConnectionView,
  })),
);
const PdfPreview = lazy(() =>
  import('~/View/NotesView/PdfPreview').then((module) => ({
    default: module.PdfPreview,
  })),
);

type Props = { children: ReactNode };

const PrivateRoute = ({ children }: Props) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? (
    <Box>{children}</Box>
  ) : (
    <Navigate to="/login" replace />
  );
};

const AuthPrevent = ({ children }: Props) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? (
    <Navigate to="/home" replace />
  ) : (
    <Box>{children}</Box>
  );
};

type RouterProps = {
  routes: { [routeName: string]: boolean };
};

export const Router = ({ routes }: RouterProps) => {
  return (
    <Suspense fallback={<LoadingView />}>
      <Routes>
        <Route
          path="/"
          element={<Layout routes={routes} />}
          errorElement={<ErrorView />}
        >
          <Route index element={<Navigate to="/home" />} />
          <Route
            path="/home"
            element={
              <PrivateRoute>
                <HomeView />
              </PrivateRoute>
            }
          />
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <DashboardView />
              </PrivateRoute>
            }
          />
          <Route
            path="/projects"
            element={
              <PrivateRoute>
                <ProjectView />
              </PrivateRoute>
            }
          />
          <Route
            path="/projects/:id"
            element={
              <PrivateRoute>
                <ProjectTaskView />
              </PrivateRoute>
            }
          />
          <Route
            path="/calendar"
            element={
              <PrivateRoute>
                <CalendarProvider>
                  <CalendarView />
                </CalendarProvider>
              </PrivateRoute>
            }
          />
          <Route
            path="/notes"
            element={
              <PrivateRoute>
                <NotesView />
              </PrivateRoute>
            }
          />
          <Route
            path="/notes/preview"
            element={
              <PrivateRoute>
                <PdfPreview />
              </PrivateRoute>
            }
          />
          <Route
            path="/todo"
            element={
              <PrivateRoute>
                <TodoView />
              </PrivateRoute>
            }
          />
          <Route
            path="/group"
            element={
              <PrivateRoute>
                <GroupView />
              </PrivateRoute>
            }
          />
          <Route
            path="/group/project/:id"
            element={
              <PrivateRoute>
                <GroupProjectTaskView />
              </PrivateRoute>
            }
          />
          <Route
            path="/settings"
            element={
              <PrivateRoute>
                <SettingsView />
              </PrivateRoute>
            }
          />
          <Route
            path="/logout"
            element={
              <PrivateRoute>
                <LogoutView />
              </PrivateRoute>
            }
          />
        </Route>

        <Route
          path="/register"
          element={
            <AuthPrevent>
              <RegisterView />
            </AuthPrevent>
          }
        />
        <Route
          path="/login"
          element={
            <AuthPrevent>
              <LoginView />
            </AuthPrevent>
          }
        />
        <Route path="/connection" element={<NoConnectionView />} />

        <Route
          path="*"
          element={<NotFoundView />}
          errorElement={<ErrorView />}
        />
      </Routes>
    </Suspense>
  );
};

import { Navigate, Route, Routes } from 'react-router-dom';
import { Layout } from '~/component/Layout/Layout';
import { ErrorView, NotFoundView } from '~/View/Errors';
import { NotesView } from '~/View/NotesView';
import { RegisterView } from '~/View/RegisterView';
import { LoginView } from '~/View/LoginView';
import { ReactNode } from 'react';
import { useAuth } from '~/context/AuthContext';
import { Box } from '@mui/material';
import { ProjectView } from '~/View/ProjectView/ProjectView';
import { ProjectTaskView } from '~/View/ProjectTask';
import { TodoView } from '~/View/TodoView/TodoView';
import { SettingsView } from '~/View/SettingsView';
import { CalendarView } from '~/View/CalendarView';
import { CalendarProvider } from '~/context/CalendarContext';

type Props = { children: ReactNode };

const PrivateRoute = ({ children }: Props) => {
  const { isAuthenticated } = useAuth();

  return isAuthenticated ? (
    <Box>{children}</Box>
  ) : (
    <Navigate to={'/register'} replace={true} />
  );
};

const AuthPrevent = ({ children }: Props) => {
  const { isAuthenticated } = useAuth();

  return isAuthenticated ? (
    <Navigate to={'/home'} replace={true} />
  ) : (
    <Box>{children}</Box>
  );
};

type RouterProps = {
  routes: { [routeName: string]: boolean };
};

export const Router = ({ routes }: RouterProps) => {
  return (
    <>
      <Routes>
        <Route
          path="/"
          element={<Layout routes={routes} />}
          errorElement={<ErrorView />}
        >
          <Route
            index={true}
            element={<Navigate to="/home" />}
            errorElement={<ErrorView />}
          />
          <Route
            path="/home"
            element={
              <PrivateRoute>
                <></>
              </PrivateRoute>
            }
            errorElement={<ErrorView />}
          />
          <Route
            path="/projects"
            element={
              <PrivateRoute>
                <ProjectView />
              </PrivateRoute>
            }
            errorElement={<ErrorView />}
          />
          <Route
            path="/projects/:id"
            element={
              <PrivateRoute>
                <ProjectTaskView />
              </PrivateRoute>
            }
            errorElement={<ErrorView />}
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
            errorElement={<ErrorView />}
          />
          <Route
            path="/notes"
            element={
              <PrivateRoute>
                <NotesView />
              </PrivateRoute>
            }
            errorElement={<ErrorView />}
          />
          <Route
            path="/todo"
            element={
              <PrivateRoute>
                <TodoView />
              </PrivateRoute>
            }
            errorElement={<ErrorView />}
          />
          <Route
            path="/groups"
            element={
              <PrivateRoute>
                <></>
              </PrivateRoute>
            }
            errorElement={<ErrorView />}
          />
          <Route
            path="/settings"
            element={
              <PrivateRoute>
                <SettingsView />
              </PrivateRoute>
            }
          />
        </Route>
        <Route
          path="*"
          element={<NotFoundView />}
          errorElement={<ErrorView />}
        />
        <Route
          path="/register"
          element={
            <AuthPrevent>
              <RegisterView />
            </AuthPrevent>
          }
          errorElement={<ErrorView />}
        />
        <Route
          path="/login"
          element={
            <AuthPrevent>
              <LoginView />
            </AuthPrevent>
          }
          errorElement={<ErrorView />}
        />
      </Routes>
    </>
  );
};

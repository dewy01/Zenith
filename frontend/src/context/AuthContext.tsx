import { ReactNode, createContext, useContext, useState } from 'react';
import { queryClient } from '~/api/api';
import { AUTH_TOKEN, REFRESH_TOKEN } from '~/config/constants';

interface AuthContextProps {
  isAuthenticated: boolean;
  login: (accessToken: string, refreshToken: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

type Props = { children: ReactNode };

export const AuthProvider = ({ children }: Props) => {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return (
      localStorage.getItem(AUTH_TOKEN) !== null &&
      localStorage.getItem(REFRESH_TOKEN) !== null
    );
  });

  const login = (accessToken: string, refreshToken: string) => {
    localStorage.setItem(AUTH_TOKEN, accessToken);
    localStorage.setItem(REFRESH_TOKEN, refreshToken);
    setIsAuthenticated(true);
  };

  const logout = () => {
    localStorage.removeItem(AUTH_TOKEN);
    localStorage.removeItem(REFRESH_TOKEN);
    setIsAuthenticated(false);
    queryClient.removeQueries();
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within its Provider');
  }
  return context;
};

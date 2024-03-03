import { ReactNode, createContext, useContext, useState } from "react";

interface AuthContextProps {
  isAuthenticated: boolean;
  login: (token: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

type Props = { children: ReactNode };

export const AuthProvider = ({ children }: Props) => {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return localStorage.getItem("Auth-token") !== null;
  });

  const login = (token: string) => {
    localStorage.setItem("Auth-token", token);
    setIsAuthenticated(true);
  };

  const logout = () => {
    localStorage.removeItem("Auth-token");
    setIsAuthenticated(false);
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
    throw new Error("useAuth must be used within its Provider");
  }
  return context;
};

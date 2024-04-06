import { useAuth } from '~/context/AuthContext';

export const LogoutView = () => {
  const { logout } = useAuth();
  logout();

  return null;
};

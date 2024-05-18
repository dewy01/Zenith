import { useAuth } from '~/context/AuthContext';
import { useGroupContext } from '~/context/GroupRole';

export const LogoutView = () => {
  const { logout } = useAuth();
  const { setUserRole } = useGroupContext();
  setUserRole(0);
  logout();

  return null;
};

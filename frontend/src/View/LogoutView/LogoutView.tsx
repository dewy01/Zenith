import { useEffect } from 'react';
import { useAuth } from '~/context/AuthContext';
import { useGroupContext } from '~/context/GroupRole';

export const LogoutView = () => {
  const { logout } = useAuth();
  const { setUserRole } = useGroupContext();

  useEffect(() => {
    setUserRole(0);
    logout();
  }, [logout, setUserRole]);

  return null;
};

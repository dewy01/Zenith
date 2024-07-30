import { useEffect } from 'react';
import { mutateUserLogout } from '~/api/User/query';
import { useAuth } from '~/context/AuthContext';
import { useGroupContext } from '~/context/GroupRole';

export const LogoutView = () => {
  const { mutateAsync } = mutateUserLogout();

  useEffect(() => {
    mutateAsync();
  }, []);

  return null;
};

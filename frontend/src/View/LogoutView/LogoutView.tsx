import { useEffect } from 'react';
import { mutateUserLogout } from '~/api/User/query';
import { LoadingView } from '../LoadingView/LoadingView';

export const LogoutView = () => {
  const { mutateAsync } = mutateUserLogout();

  useEffect(() => {
    mutateAsync();
  }, []);

  return <LoadingView />;
};

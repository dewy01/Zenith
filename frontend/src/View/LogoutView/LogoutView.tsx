export const LogoutView = () => {
  localStorage.removeItem('Auth-token');
  location.pathname = '/login';

  return <></>;
};

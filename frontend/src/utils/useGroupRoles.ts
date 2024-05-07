import { GroupRole } from '~/api/Group/api';

export const getGroupRole = (roleId: number) => {
  switch (roleId) {
    case 1:
      return 'Moderator';
    case 2:
      return 'Admin';
    default:
      return 'User';
  }
};

export const isAdmin = (roleId: GroupRole) => {
  switch (roleId) {
    case 2:
      return true;
    default:
      return false;
  }
};

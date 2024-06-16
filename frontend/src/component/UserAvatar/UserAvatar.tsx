import { Avatar } from '@mui/material';
import { BASE_URL } from '~/config/constants';
import { stringAvatar } from '~/utils/userAvatar';

type Props = {
  image: string | null;
  username: string;
};

export const UserAvatar = ({ username, image }: Props) => {
  return (
    <Avatar
      src={image !== null ? `${BASE_URL}/api/images/${image}` : undefined}
      {...stringAvatar(username)}
    />
  );
};

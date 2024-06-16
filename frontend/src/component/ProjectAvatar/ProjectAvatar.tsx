import { Avatar } from '@mui/material';
import { stringAvatar } from '~/utils/userAvatar';

type Props = {
  name: string;
};

export const ProjectAvatar = ({ name }: Props) => {
  return (
    <Avatar
      style={{ borderRadius: 5 }}
      variant="square"
      {...stringAvatar(name)}
    />
  );
};

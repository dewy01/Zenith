import React, { useEffect, useState } from 'react';
import { Avatar, Tooltip } from '@mui/material';
import { BASE_URL } from '~/config/constants';
import { stringToColor } from '~/utils/userAvatar';
import { t } from '@lingui/macro';
import { Control, useWatch } from 'react-hook-form';
import { avatarModel } from '../UserBox/schema';

type Props = {
  initialImage: string | null;
  username: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  control: Control<avatarModel>;
};

const deriveImage = (inital: string | null, preview: string | undefined) => {
  if (inital === null && preview === undefined) return '';
  if (inital !== null && preview === undefined)
    return `${BASE_URL}/api/images/${inital}`;
  if (inital !== null && preview !== undefined) return preview;
  if (inital === null && preview !== undefined) return preview;
  return '';
};

export const UserAvatarInput = ({
  username,
  initialImage,
  onChange,
  control,
}: Props) => {
  const [previewImage, setPreviewImage] = useState<string | undefined>(
    undefined,
  );

  const image = useWatch({
    control: control,
  });

  useEffect(() => {
    if (image.image?.name === null || image.image?.name === undefined)
      setPreviewImage(undefined);
  }, [image]);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result as string);
      };
      reader.readAsDataURL(file);
      onChange(event);
    }
  };

  return (
    <Tooltip title={t({ message: 'Change avatar' })}>
      <label htmlFor="avatar-input" style={{ cursor: 'pointer' }}>
        <Avatar
          src={deriveImage(initialImage, previewImage)}
          sx={{
            '&:hover': {
              transition: '0.2s ease',
              filter: 'blur(2px)',
            },
            transition: '0.15s ease',
            filter: 'blur(0px)',
            bgcolor: stringToColor(username),
          }}
        >
          {!previewImage && username.split(' ')[0][0]}
        </Avatar>
        <input
          id="avatar-input"
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          style={{ display: 'none' }}
        />
      </label>
    </Tooltip>
  );
};

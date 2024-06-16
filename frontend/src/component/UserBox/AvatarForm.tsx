import { useController, useForm } from 'react-hook-form';
import { UserAvatarInput } from '../UserAvatar/UserAvatarInput';
import { avatarModel, avatarSchema } from './schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { IconButton, Tooltip } from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import RefreshIcon from '@mui/icons-material/Refresh';
import { mutatePostImage } from '~/api/Image/query';
import { ClassAttributes, ButtonHTMLAttributes } from 'react';
import { JSX } from 'react/jsx-runtime';
import { t } from '@lingui/macro';

type Props = {
  username: string;
  initialImage: string | null;
};

const SubmitButton = (
  props: JSX.IntrinsicAttributes &
    ClassAttributes<HTMLButtonElement> &
    ButtonHTMLAttributes<HTMLButtonElement>,
) => (
  <Tooltip title={t({ message: 'Update avatar' })}>
    <button {...props} form="avatarForm" type="submit" />
  </Tooltip>
);

export const AvatarForm = ({ username, initialImage }: Props) => {
  const { mutateAsync } = mutatePostImage();
  const { control, handleSubmit, reset } = useForm<avatarModel>({
    mode: 'onChange',
    resolver: zodResolver(avatarSchema),
  });

  const onSubmit = (data: avatarModel) => {
    const formData = new FormData();
    formData.append('image', data.image!);
    mutateAsync(formData);
    reset();
  };

  const image = useController({
    control: control,
    name: 'image',
  });

  return (
    <>
      <form
        encType="multipart/form-data"
        id="avatarForm"
        style={{ display: 'flex', flexDirection: 'column', gap: '25px' }}
        onSubmit={handleSubmit(onSubmit)}
      >
        <UserAvatarInput
          username={username}
          initialImage={initialImage}
          control={control}
          onChange={(e) => {
            if (e.target.files && e.target.files[0]) {
              const file = e.target.files[0];
              image.field.onChange(file);
            }
          }}
        />
      </form>
      {image.field.value !== undefined ? (
        <>
          <IconButton component={SubmitButton}>
            <SaveIcon />
          </IconButton>
          <Tooltip title={t({ message: 'Restore avatar' })}>
            <IconButton
              onClick={() => {
                reset();
              }}
            >
              <RefreshIcon />
            </IconButton>
          </Tooltip>
        </>
      ) : (
        <></>
      )}
    </>
  );
};

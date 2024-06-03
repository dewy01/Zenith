import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from '@mui/material';
import { useState } from 'react';
import { groupModel, groupSchema } from './schema';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Trans } from '@lingui/macro';
import { CreateForm } from './CreateForm';
import { mutateUpdateGroup } from '~/api/Group/query';

type Props = {
  title: string;
  groupId: number;
};

export const DialogUpdate = ({ title, groupId }: Props) => {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    form.reset();
    setOpen(false);
  };

  const form = useForm<groupModel>({
    defaultValues: {
      groupName: title,
    },
    resolver: zodResolver(groupSchema),
  });

  const { mutateAsync } = mutateUpdateGroup();
  const handleSubmit = (data: groupModel) => {
    mutateAsync({
      groupID: groupId,
      data: {
        groupName: data.groupName,
      },
    });
    form.reset();
    handleClose();
  };

  return (
    <>
      <Typography
        onClick={handleClickOpen}
        variant="h6"
        component="div"
        sx={{
          flexGrow: 1,
          '&:hover': {
            textDecoration: 'underline',
            cursor: 'pointer',
          },
        }}
      >
        {title}
      </Typography>
      <Dialog
        open={open}
        onClose={handleClose}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <DialogTitle>
          <Trans>Edit Group</Trans>
        </DialogTitle>
        <DialogContent>
          <CreateForm formContext={form} onSubmit={handleSubmit} />
        </DialogContent>
        <DialogActions>
          <Button color="inherit" onClick={handleClose}>
            <Trans>Cancel</Trans>
          </Button>
          <Button type="submit" form="groupForm" color="info" autoFocus>
            <Trans>Edit</Trans>
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

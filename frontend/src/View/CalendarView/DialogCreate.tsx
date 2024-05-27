import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  useTheme,
} from '@mui/material';
import { Dispatch } from 'react';
import { CreateForm } from './CreateForm';
import dayjs from 'dayjs';
import { zodResolver } from '@hookform/resolvers/zod';
import { eventModel, eventSchema } from './schema';
import { useForm } from 'react-hook-form';
import { mutateAddEvent } from '~/api/Calendar/query';
import { Trans } from '@lingui/react';

type Props = {
  open: boolean;
  setOpen: Dispatch<boolean>;
  day: dayjs.Dayjs;
};

export const DialogCreate = ({ open, setOpen, day }: Props) => {
  const { mutateAsync } = mutateAddEvent();

  const eventForm = useForm<eventModel>({
    defaultValues: {
      title: '',
      description: '',
      dateTime: day.format('DD.MM.YYYY'),
      eventColor: useTheme().palette.secondary.dark,
    },
    resolver: zodResolver(eventSchema),
  });

  const handleClose = () => {
    eventForm.reset();
    setOpen(false);
  };

  const handleSubmit = (data: eventModel) => {
    mutateAsync(data);
    handleClose();
  };

  return (
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
        <Trans id="New Event">New Event</Trans>
      </DialogTitle>
      <DialogContent>
        <CreateForm formContext={eventForm} onSubmit={handleSubmit} />
      </DialogContent>
      <DialogActions>
        <Button color="inherit" onClick={handleClose}>
          <Trans id="Cancel">Cancel</Trans>
        </Button>
        <Button type="submit" form="createEventForm" color="success" autoFocus>
          <Trans id="Create">Create</Trans>
        </Button>
      </DialogActions>
    </Dialog>
  );
};

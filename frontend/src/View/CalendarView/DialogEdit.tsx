import { zodResolver } from '@hookform/resolvers/zod';
import { Trans } from '@lingui/macro';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
} from '@mui/material';
import dayjs from 'dayjs';
import { Dispatch } from 'react';
import { useForm } from 'react-hook-form';
import { CalendarEvent } from '~/api/Calendar/api';
import { mutateDeleteEvent, mutateEditEvent } from '~/api/Calendar/query';
import { CreateForm } from './CreateForm';
import { eventModel, eventSchema } from './schema';

type Props = {
  open: boolean;
  setOpen: Dispatch<boolean>;
  event: CalendarEvent;
};

export const DialogEdit = ({ open, setOpen, event }: Props) => {
  const { mutateAsync: editEvent } = mutateEditEvent();
  const { mutateAsync: deleteEvent } = mutateDeleteEvent();

  const eventForm = useForm<eventModel>({
    defaultValues: {
      title: event.title,
      description: event.description,
      dateTime: dayjs(event.dateTime).format('DD.MM.YYYY'),
      eventColor: event.eventColor,
    },
    resolver: zodResolver(eventSchema),
  });

  const handleClose = () => {
    eventForm.reset();
    setOpen(false);
  };

  const handleSubmit = (data: eventModel) => {
    editEvent({
      eventId: event.eventID,
      event: data,
    });
    handleClose();
  };

  const handleDelete = () => {
    deleteEvent(event.eventID);
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
      <DialogTitle
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Trans>Edit Event</Trans>
        <IconButton onClick={handleDelete}>
          <DeleteOutlineIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <CreateForm formContext={eventForm} onSubmit={handleSubmit} />
      </DialogContent>
      <DialogActions>
        <Button color="inherit" onClick={handleClose}>
          <Trans>Cancel</Trans>
        </Button>
        <Button type="submit" form="createEventForm" color="info" autoFocus>
          <Trans>Edit</Trans>
        </Button>
      </DialogActions>
    </Dialog>
  );
};

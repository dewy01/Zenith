import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from '@mui/material';
import { Dispatch } from 'react';
import { CreateForm } from './CreateForm';
import dayjs from 'dayjs';
import { zodResolver } from '@hookform/resolvers/zod';
import { eventModel, eventSchema } from './schema';
import { useForm } from 'react-hook-form';

type Props = {
  open: boolean;
  setOpen: Dispatch<boolean>;
  day: dayjs.Dayjs;
};

export const DialogCreate = ({ open, setOpen, day }: Props) => {
  const eventForm = useForm<eventModel>({
    defaultValues: {
      title: '',
      description: '',
      dateTime: day.format('DD.MM.YYYY'),
      eventColor: '#B57EDC',
    },
    resolver: zodResolver(eventSchema),
  });

  const handleClose = () => {
    eventForm.reset();
    setOpen(false);
  };

  const handleSubmit = (data: eventModel) => {
    console.log(data);
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
      <DialogTitle>New Event</DialogTitle>
      <DialogContent>
        <CreateForm formContext={eventForm} onSubmit={handleSubmit} />
      </DialogContent>
      <DialogActions>
        <Button color="inherit" onClick={handleClose}>
          Cancel
        </Button>
        <Button type="submit" form="createEventForm" color="success">
          Create
        </Button>
      </DialogActions>
    </Dialog>
  );
};

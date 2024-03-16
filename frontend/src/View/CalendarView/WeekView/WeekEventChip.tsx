import { Paper, Typography, alpha } from '@mui/material';
import { DialogEdit } from '../DialogEdit';
import { useState } from 'react';
import { CalendarEvent } from '~/api/Calendar/api';

type Props = {
  event: CalendarEvent;
};

export const WeekEventChip = ({ event }: Props) => {
  const [openEdit, setOpenEdit] = useState(false);

  const handleClickOpenEdit = () => {
    setOpenEdit(true);
  };

  return (
    <>
      <Paper
        sx={(theme) => ({
          backgroundColor: alpha(
            event.eventColor,
            theme.palette.action.disabledOpacity,
          ),
          borderLeft: '5px solid',
          borderColor: event.eventColor,
          padding: 0.5,
          cursor: 'pointer',
        })}
        onClick={handleClickOpenEdit}
      >
        <Typography
          variant="h6"
          sx={{
            paddingLeft: 0.5,
            wordBreak: 'break-word',
          }}
        >
          {event.title}
        </Typography>
        <Typography
          variant="body2"
          sx={{
            paddingLeft: 0.5,
            wordBreak: 'break-word',
          }}
        >
          {event.description}
        </Typography>
      </Paper>
      <DialogEdit
        open={openEdit}
        setOpen={setOpenEdit}
        event={event}
        key={JSON.stringify(event)}
      />
    </>
  );
};

import {
  Box,
  Paper,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
  useTheme,
} from '@mui/material';
import { eventModel } from './schema';
import { UseFormReturn, useController } from 'react-hook-form';
import TitleIcon from '@mui/icons-material/Title';
import TocIcon from '@mui/icons-material/Toc';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import { Trans } from '@lingui/macro';

type toggleProps = {
  value: string;
};

const ColorToggle = ({ value }: toggleProps) => {
  return (
    <ToggleButton sx={{ width: '50px', height: '50px' }} value={value}>
      <Paper sx={{ width: '20px', height: '20px', backgroundColor: value }} />
    </ToggleButton>
  );
};

type Props = {
  onSubmit: (value: eventModel) => void;
  formContext: UseFormReturn<eventModel>;
};

export const CreateForm = ({ onSubmit, formContext }: Props) => {
  const theme = useTheme();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = formContext;

  const title = useController({
    control: control,
    name: 'title',
  });

  const desc = useController({
    control: control,
    name: 'description',
  });

  const dateTime = useController({
    control: control,
    name: 'dateTime',
  });

  const eventColor = useController({
    control: control,
    name: 'eventColor',
  });

  return (
    <Box
      component="form"
      id="createEventForm"
      onSubmit={handleSubmit((data) => onSubmit(data))}
    >
      <Box
        display={'flex'}
        flexDirection={'column'}
        gap={2}
        sx={{ paddingTop: 1 }}
        width={'400px'}
      >
        <Box display="flex" justifyContent="start" alignItems="center" gap={2}>
          <TitleIcon />
          <TextField
            sx={{ flex: 1 }}
            label={<Trans>Title</Trans>}
            ref={title.field.ref}
            value={title.field.value}
            onChange={title.field.onChange}
            onBlur={title.field.onBlur}
            name={title.field.name}
            error={errors.title !== undefined}
            helperText={errors.title?.message}
          />
        </Box>

        <Box display="flex" justifyContent="start" alignItems="center" gap={2}>
          <TocIcon />
          <TextField
            sx={{ flex: 1 }}
            label={<Trans>Description</Trans>}
            ref={desc.field.ref}
            value={desc.field.value}
            onChange={desc.field.onChange}
            onBlur={desc.field.onBlur}
            name={desc.field.name}
            error={errors.description !== undefined}
            helperText={'Only in Week view'}
          />
        </Box>

        <Box display="flex" justifyContent="start" alignItems="center" gap={2}>
          <CalendarTodayIcon />
          <TextField
            sx={{ flex: 1 }}
            disabled
            ref={dateTime.field.ref}
            value={dateTime.field.value}
            onChange={dateTime.field.onChange}
            onBlur={dateTime.field.onBlur}
            name={dateTime.field.name}
            error={errors.dateTime !== undefined}
            helperText={errors.dateTime?.message}
          />
        </Box>

        <Box display="flex" justifyContent="start" alignItems="center" gap={2}>
          <BookmarkBorderIcon />
          <ToggleButtonGroup
            value={eventColor.field.value}
            exclusive
            ref={eventColor.field.ref}
            onChange={eventColor.field.onChange}
            onBlur={eventColor.field.onBlur}
          >
            <ColorToggle value={theme.palette.secondary.dark} />
            <ColorToggle value={theme.palette.error.dark} />
            <ColorToggle value={theme.palette.success.dark} />
            <ColorToggle value={theme.palette.warning.dark} />
            <ColorToggle value={theme.palette.info.dark} />
          </ToggleButtonGroup>
        </Box>
      </Box>
    </Box>
  );
};

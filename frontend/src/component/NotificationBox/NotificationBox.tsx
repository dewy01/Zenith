import {
  Accordion,
  AccordionSummary,
  Box,
  Typography,
  AccordionDetails,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import NotificationsIcon from '@mui/icons-material/Notifications';

export const NotificationBox = () => {
  return (
    <>
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-start',
              gap: 2,
            }}
          >
            <NotificationsIcon />
            <Typography
              fontWeight={500}
              fontSize={20}
              sx={{ width: '33%', flexShrink: 0 }}
            >
              Notifications
            </Typography>
          </Box>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Nulla facilisi. Phasellus sollicitudin nulla et quam mattis feugiat.
            Aliquam eget maximus est, id dignissim quam.
          </Typography>
        </AccordionDetails>
      </Accordion>
    </>
  );
};

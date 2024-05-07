import { Box, Typography } from '@mui/material';
import { useState } from 'react';

export const Clock = () => {
  let time = new Date().toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
  });

  const [ctime, setTime] = useState(time);
  const UpdateTime = () => {
    time = new Date().toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
    });
    setTime(time);
  };
  setInterval(UpdateTime);

  return (
    <Box>
      <Typography fontWeight={600} fontSize={84} variant="h2">
        {ctime}
      </Typography>
    </Box>
  );
};

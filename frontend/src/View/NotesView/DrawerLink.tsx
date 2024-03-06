import { ListItem, ListItemButton, ListItemText } from '@mui/material';

type DrawerProps = {
  isActive: boolean;
  children: React.ReactNode;
};

export const DrawerLink = ({ isActive, children }: DrawerProps) => {
  return (
    <ListItem disablePadding>
      <ListItemButton
        sx={(theme) => ({
          backgroundColor: isActive ? theme.palette.action.focus : '',
          display: 'flex',
          borderRadius: '10px',
        })}
      >
        <ListItemText>{children}</ListItemText>
      </ListItemButton>
    </ListItem>
  );
};

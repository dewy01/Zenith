import { ListItem, ListItemButton, ListItemText, alpha } from '@mui/material';

type DrawerProps = {
  isActive: boolean;
  children: React.ReactNode;
  color?: string;
};

export const DrawerLink = ({ isActive, children, color }: DrawerProps) => {
  return (
    <ListItem disablePadding>
      <ListItemButton
        sx={(theme) => ({
          backgroundColor: isActive
            ? color
              ? alpha(color, theme.palette.action.activatedOpacity)
              : theme.palette.action.focus
            : '',
          display: 'flex',
          borderRadius: '10px',
          minHeight: '54px',
        })}
      >
        <ListItemText>{children}</ListItemText>
      </ListItemButton>
    </ListItem>
  );
};

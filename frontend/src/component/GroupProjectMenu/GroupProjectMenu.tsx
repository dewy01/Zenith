import * as React from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { IconButton } from '@mui/material';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import CloseIcon from '@mui/icons-material/Close';
import { ProjectDelete } from '~/component/ProjectDeleteDialog';
import { GroupProject } from '~/api/Group/api';
import { deleteGroupProject } from '~/api/GroupProjects/query';
import { DialogEdit } from '~/View/GroupView/GroupProjectView/DialogEdit';

type Props = {
  project: GroupProject;
};

export const GroupProjectMenu = ({ project }: Props) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const { mutateAsync } = deleteGroupProject();
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <IconButton
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        <MoreHorizIcon />
      </IconButton>
      <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
        <DialogEdit project={project} onSubmit={handleClose} />

        <ProjectDelete
          projectId={project.groupProjectID}
          onSubmit={handleClose}
          mutateDelete={mutateAsync}
        />

        <MenuItem onClick={handleClose}>
          <CloseIcon />
        </MenuItem>
      </Menu>
    </div>
  );
};

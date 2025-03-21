import * as React from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { IconButton } from '@mui/material';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import CloseIcon from '@mui/icons-material/Close';
import { ProjectDelete } from '~/component/ProjectDeleteDialog';
import { DialogEdit } from '~/View/ProjectView/DialogEdit';
import { Project } from '~/api/Projects/api';
import { deleteProject } from '~/api/Projects/query';

type Props = {
  project: Project;
};

export const ProjectMenu = ({ project }: Props) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const { mutateAsync } = deleteProject();
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
          projectId={project.projectID}
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

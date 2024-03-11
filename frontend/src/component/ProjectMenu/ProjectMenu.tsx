import * as React from "react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { IconButton } from "@mui/material";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import CloseIcon from "@mui/icons-material/Close";
import { ProjectDelete } from "./ProjectDelete";
import { DialogEdit } from "~/View/ProjectView/DialogEdit";
import { Project } from "~/api/Projects/api";

type Props = {
  project: Project;
};

export const ProjectMenu = ({ project }: Props) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
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
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
      >
        <MoreHorizIcon />
      </IconButton>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <DialogEdit project={project} onSubmit={handleClose} />

        <ProjectDelete projectId={project.projectID} onSubmit={handleClose} />

        <MenuItem onClick={handleClose}>
          <CloseIcon />
        </MenuItem>
      </Menu>
    </div>
  );
};

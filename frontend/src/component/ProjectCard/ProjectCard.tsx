import {
  IconButton,
  ListItem,
  ListItemText,
  ListSubheader,
  Stack,
  Typography,
} from "@mui/material";
import { Project } from "~/api/Projects/api";
import { formatDate } from "~/utils/dateTime";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";

type Props = {
  project: Project;
};

export const ProjectCard = ({ project }: Props) => {
  return (
    <>
      <ListItem sx={{ width: "80vw" }}>
        <ListItemText
          primary={project.title}
          secondary={
            <Typography variant="caption" color="text.primary">
              {project.description}
            </Typography>
          }
        />
        <ListSubheader>
          <Stack alignItems={"end"}>
            <Typography>{project.status}</Typography>
            <Typography variant="caption">
              {formatDate(project.deadline)}
            </Typography>
          </Stack>
        </ListSubheader>
        <IconButton>
          <MoreHorizIcon />
        </IconButton>
      </ListItem>
    </>
  );
};

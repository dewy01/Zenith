import {
  AppBar,
  Box,
  Divider,
  FormControl,
  InputLabel,
  List,
  MenuItem,
  Select,
  Toolbar,
  Typography,
} from "@mui/material";
import { getAllProjects } from "~/api/Projects/query";
import { LoadingView } from "../LoadingView/LoadingView";
import { DialogCreate } from "./DialogCreate";
import { ProjectCard } from "~/component/ProjectCard";
import { SearchField } from "~/component/SearchField";

export const ProjectView = () => {
  const { data: projects, isLoading } = getAllProjects();

  if (isLoading || projects === undefined) {
    return <LoadingView />;
  }

  return (
    <Box>
      <Box>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Projects
            </Typography>
            <DialogCreate />
          </Toolbar>
        </AppBar>
      </Box>
      <Box
        display={"flex"}
        justifyContent={"space-evenly"}
        alignItems={"center"}
        gap={2}
        sx={{ padding: 4 }}
      >
        <Typography variant="h5">Explore projects</Typography>
        <Box display={"flex"} gap={2}>
          <SearchField />
          <FormControl sx={{ width: "150px" }}>
            <InputLabel>Sort</InputLabel>
            <Select label="Sort">
              <MenuItem value="on Hold">Status</MenuItem>
              <MenuItem value="in Progress">Deadline</MenuItem>
              <MenuItem value="Done">Name</MenuItem>
            </Select>
          </FormControl>
        </Box>
      </Box>
      <List
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {projects.map((item) => (
          <div key={item.projectID}>
            <ProjectCard project={item} />
            <Divider variant="middle" />
          </div>
        ))}
      </List>
    </Box>
  );
};

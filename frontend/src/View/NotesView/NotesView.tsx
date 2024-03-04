import { Box, IconButton, Typography } from "@mui/material";
import { Main } from "../../component/Main";
import { SubDrawer } from "../../component/SubDrawer";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import { SearchField } from "../../component/SearchField";
import { DrawerLink } from "./DrawerLink";
import { useQuery } from "@tanstack/react-query";
import { getAllNotes, mutateAddNote } from "../../api/Notes/query";
import { Outlet, useLocation } from "react-router-dom";

export const NotesView = () => {
  const { data: notes } = getAllNotes();
  const { mutateAsync } = mutateAddNote();

  return (
    <Main>
      <SubDrawer>
        <Box display={"flex"} flexDirection={"column"} gap={2}>
          <Box
            display={"flex"}
            justifyContent={"space-between"}
            alignItems={"center"}
          >
            <IconButton onClick={() => mutateAsync()}>
              <AddIcon />
            </IconButton>
            <Typography fontSize={24}>Notes</Typography>
            <IconButton>
              <DeleteIcon />
            </IconButton>
          </Box>
          <SearchField />

          {notes &&
            notes.map((note) => (
              <DrawerLink key={note.noteID} link={`${note.noteID}`}>
                <Box
                  display={"flex"}
                  flexDirection={"column"}
                  gap={1}
                  padding={1}
                >
                  <Typography>{note.title}</Typography>
                  <Typography variant="caption">{note.createdAt}</Typography>
                </Box>
              </DrawerLink>
            ))}
        </Box>
      </SubDrawer>
      <Box>
        <Outlet />
      </Box>
    </Main>
  );
};

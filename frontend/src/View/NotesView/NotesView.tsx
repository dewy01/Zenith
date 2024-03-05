import { Box, IconButton, Typography } from "@mui/material";
import { Main } from "../../component/Main";
import { SubDrawer } from "../../component/SubDrawer";
import AddIcon from "@mui/icons-material/Add";
import { SearchField } from "../../component/SearchField";
import { DrawerLink } from "./DrawerLink";
import { getAllNotes, mutateAddNote } from "../../api/Notes/query";
import { NotePreview } from "./NotePreview";
import { useEffect, useState } from "react";
import { formatDate } from "../../utils/dateTime";
import { DialogDelete } from "./DialogDelete";

export const NotesView = () => {
  const [selectedNote, setSelectedNote] = useState<number | null>(null);
  const { data: notes } = getAllNotes();
  const { mutateAsync } = mutateAddNote();

  useEffect(() => {
    if (selectedNote && notes) {
      const isNoteStillPresent = notes.some(
        (note) => note.noteID === selectedNote,
      );
      if (!isNoteStillPresent) {
        setSelectedNote(null);
      }
    }
  }, [selectedNote, notes]);

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
            <DialogDelete noteId={selectedNote} />
          </Box>
          <SearchField />

          {notes &&
            notes.map((note) => (
              <DrawerLink
                key={note.noteID}
                isActive={note.noteID === selectedNote}
              >
                <Box
                  onClick={() => setSelectedNote(note.noteID)}
                  display={"flex"}
                  flexDirection={"column"}
                  gap={1}
                  padding={1}
                  sx={{ cursor: "pointer" }}
                >
                  <Typography>{note.title}</Typography>
                  <Typography variant="caption">
                    {formatDate(note.createdAt)}
                  </Typography>
                </Box>
              </DrawerLink>
            ))}
        </Box>
      </SubDrawer>
      <Box>
        {selectedNote ? (
          <NotePreview noteId={selectedNote} />
        ) : (
          <>No Note available</>
        )}
      </Box>
    </Main>
  );
};

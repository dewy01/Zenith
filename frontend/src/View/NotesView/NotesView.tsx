import { Box, IconButton, List, Typography } from '@mui/material';
import { Main } from '~/component/Main';
import { SubDrawer } from '~/component/SubDrawer';
import AddIcon from '@mui/icons-material/Add';
import { SearchField } from '~/component/SearchField';
import { DrawerLink } from './DrawerLink';
import { getAllNotes, mutateAddNote } from '~/api/Notes/query';
import { NotePreview } from './NotePreview';
import { useEffect, useRef, useState } from 'react';
import { formatDate } from '~/utils/dateTime';
import { DialogDelete } from './DialogDelete';
import { debounce } from 'lodash';
import { Trans } from '@lingui/react';

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
        setSelectedNote(notes[0] ? notes[0].noteID : null);
      }
    }
    if (!selectedNote && notes) {
      setSelectedNote(notes[0] ? notes[0].noteID : null);
    }
  }, [selectedNote, notes]);

  const [filter, setFilter] = useState<string>('');

  const handleFilter = useRef(
    debounce(
      (event: React.ChangeEvent<HTMLInputElement>) =>
        setFilter(event.target.value),
      500,
    ),
  ).current;

  return (
    <Main>
      <SubDrawer>
        <Box
          display={'flex'}
          flexDirection={'column'}
          gap={2}
          sx={{ overflow: 'hidden' }}
        >
          <Box
            display={'flex'}
            justifyContent={'space-between'}
            alignItems={'center'}
            sx={{ maxHeight: '10vh' }}
          >
            <IconButton onClick={() => mutateAsync()}>
              <AddIcon />
            </IconButton>
            <Typography fontSize={24}>
              <Trans id="Notes">Notes</Trans>
            </Typography>
            <DialogDelete noteId={selectedNote} />
          </Box>
          <SearchField onChange={handleFilter} placeholder="Search notes" />
          <List
            sx={{
              maxHeight: '90vh',
              overflowY: 'auto',
              display: 'flex',
              flexDirection: 'column',
              gap: 1,
            }}
          >
            {notes ? (
              notes
                .filter((a) =>
                  a.title
                    .toLocaleLowerCase()
                    .includes(filter.toLocaleLowerCase()),
                )
                .map((note) => (
                  <Box
                    key={note.createdAt}
                    onClick={() => setSelectedNote(note.noteID)}
                    display={'flex'}
                    flexDirection={'column'}
                    sx={{ cursor: 'pointer' }}
                  >
                    <DrawerLink isActive={note.noteID === selectedNote}>
                      <Typography
                        sx={{
                          textWrap: 'wrap',
                          wordBreak: 'break-word',
                        }}
                      >
                        {note.title}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {formatDate(note.createdAt)}
                      </Typography>
                    </DrawerLink>
                  </Box>
                ))
            ) : (
              <></>
            )}
          </List>
        </Box>
      </SubDrawer>
      <Box>
        {selectedNote ? (
          <NotePreview key={selectedNote} noteId={selectedNote} />
        ) : (
          <></>
        )}
      </Box>
    </Main>
  );
};

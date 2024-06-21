import { Box } from '@mui/material';
import { Main } from '~/component/Main';
import { useContext, useRef, useState } from 'react';
import { debounce } from 'lodash';
import { NotePreview } from './NotePreview';
import { NoNoteView } from './NoNoteView';
import { NotesDrawer } from './NotesDrawer';
import { PdfContext } from '~/context/PdfContext';

export const NotesView = () => {
  const { selectedNote, setSelectedNote } = useContext(PdfContext);
  const pageNumber = 1;
  const [filter, setFilter] = useState<string>('');
  const pageSize = 5;

  const handleFilter = useRef(
    debounce(
      (event: React.ChangeEvent<HTMLInputElement>) =>
        setFilter(event.target.value),
      500,
    ),
  ).current;

  return (
    <Main>
      <NotesDrawer
        handleFilter={handleFilter}
        selectedNote={selectedNote}
        setSelectedNote={setSelectedNote}
        query={{ pageNumber: pageNumber, pageSize: pageSize, filter: filter }}
        pageNumber={pageNumber}
      />
      <Box>
        {selectedNote ? (
          <NotePreview key={selectedNote} noteId={selectedNote} />
        ) : (
          <NoNoteView />
        )}
      </Box>
    </Main>
  );
};

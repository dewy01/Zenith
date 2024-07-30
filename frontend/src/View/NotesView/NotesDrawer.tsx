import { Box, Button, IconButton, List, Typography } from '@mui/material';
import { SubDrawer } from '~/component/SubDrawer';
import AddIcon from '@mui/icons-material/Add';
import { SearchField } from '~/component/SearchField';
import { DrawerLink } from './DrawerLink';
import { getAllNotes, mutateAddNote } from '~/api/Notes/query';
import { useContext, useEffect, useMemo } from 'react';
import { formatDate } from '~/utils/dateTime';
import { DialogDelete } from './DialogDelete';
import { Trans, t } from '@lingui/macro';
import { DebouncedFunc } from 'lodash';
import { PaginationRequest } from '~/api/pagination';
import { InfiniteScroll } from '~/component/InfiniteScroll/InfiniteScroll';
import { Note } from '~/api/Notes/api';
import { PdfContext } from '~/context/PdfContext';

type Props = {
  handleFilter: DebouncedFunc<
    (event: React.ChangeEvent<HTMLInputElement>) => void
  >;
  selectedNote: number | null;
  setSelectedNote: React.Dispatch<React.SetStateAction<number | null>>;
  query: PaginationRequest;
  pageNumber: number;
};

export const NotesDrawer = ({
  handleFilter,
  selectedNote,
  setSelectedNote,
  query,
}: Props) => {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } = getAllNotes({
    pageNumber: query.pageNumber,
    pageSize: query.pageSize,
    filter: query.filter,
  });
  const { mutateAsync } = mutateAddNote();

  const notes = useMemo(
    () => (data ? data?.pages.flatMap((item) => item.items) : []),
    [data],
  );

  useEffect(() => {
    if (notes && notes.length > 0) {
      setSelectedNote(notes[0]?.noteID ?? null);
    }
  }, []);

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

  const loadNextPage = () => {
    if (!isFetchingNextPage && hasNextPage) {
      fetchNextPage();
    }
  };

  return (
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
            <Trans>Notes</Trans>
          </Typography>
          <DialogDelete noteId={selectedNote} />
        </Box>
        <SearchField
          onChange={handleFilter}
          placeholder={t({ message: 'Search note' })}
        />
        <List
          sx={{
            maxHeight: '90vh',
            overflowY: 'auto',
            display: 'flex',
            flexDirection: 'column',
            gap: 1,
          }}
        >
          <InfiniteScroll
            loadMore={loadNextPage}
            hasMore={hasNextPage}
            isLoading={isFetchingNextPage}
          >
            {notes && notes.length > 0 ? (
              notes
                .filter((note) => note)
                .map((note) => <DrawerCard key={note.noteID} {...note} />)
            ) : (
              <></>
            )}
          </InfiniteScroll>
          <Button variant="text" disabled={!hasNextPage} onClick={loadNextPage}>
            {hasNextPage ? 'Load more' : 'All notes loaded'}
          </Button>
        </List>
      </Box>
    </SubDrawer>
  );
};

const DrawerCard = (note: Note) => {
  const { selectedNote, setSelectedNote } = useContext(PdfContext);
  return (
    <Box
      key={note.noteID}
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
  );
};

import {
  MDXEditor,
  headingsPlugin,
  listsPlugin,
  markdownShortcutPlugin,
  quotePlugin,
  thematicBreakPlugin,
} from '@mdxeditor/editor';
import { Box, IconButton, TextField, Tooltip, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { getNoteById, getShareToken, mutateEditNote } from '~/api/Notes/query';
import { useEffect, useState } from 'react';
import { noteModel, noteSchema } from './schema';
import { useController, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { debounce } from 'lodash';
import { LoadingView } from '../LoadingView/LoadingView';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import AutorenewIcon from '@mui/icons-material/Autorenew';
import IosShareIcon from '@mui/icons-material/IosShare';
import { enqueueSnackbar } from 'notistack';
import { DialogCopy } from './DialogCopy';

const useStyles = makeStyles({
  root: {
    outline: 'none',
    minHeight: '35vh',
    width: '100%',
    fontFamily: 'inherit',
    fontSize: '16px',
    whiteSpace: 'pre-line',
  },
});

type Props = {
  noteId: number;
};

export const NotePreview = ({ noteId }: Props) => {
  const { data: note, isLoading } = getNoteById(noteId);
  const { data: token, refetch: getNewToken } = getShareToken(noteId);
  const [shareButtonClicked, setShareButtonClicked] = useState(false);
  const [unsavedChanges, setUnsavedChanges] = useState(false);
  const [toggle, setToggle] = useState(true);
  const handleToggle = () => setToggle(!toggle);
  const { mutateAsync, isPending } = mutateEditNote();

  const form = useForm<noteModel>({
    resolver: zodResolver(noteSchema),
    mode: 'onChange',
  });

  const title = useController({
    control: form.control,
    name: 'title',
  });
  const content = useController({
    control: form.control,
    name: 'content',
  });

  useEffect(() => {
    if (note) {
      form.reset({
        title: note.title || '',
        content: note.content || '',
      });
    }
  }, [note]);

  useEffect(() => {
    if (
      note &&
      (title.field.value !== note.title || content.field.value !== note.content)
    ) {
      setUnsavedChanges(true);
    } else {
      setUnsavedChanges(false);
    }
  }, [note, title.field.value, content.field.value]);

  useEffect(() => {
    handleSave();
  }, [unsavedChanges]);

  const handleSave = () => {
    if (unsavedChanges) {
      mutateAsync({
        noteId: noteId,
        note: {
          title: title.field.value,
          content: content.field.value,
        },
      });
      setUnsavedChanges(false);
    }
  };

  useEffect(() => {
    if (token && shareButtonClicked) {
      navigator.clipboard.writeText(token);
      enqueueSnackbar(`Copied '${token}' to clipboard`);
      setShareButtonClicked(false);
    }
  }, [token, shareButtonClicked]);

  const classes = useStyles();

  if (isLoading || note === undefined) {
    return <LoadingView />;
  }

  return (
    <Box component="form">
      {toggle && note?.title ? (
        <Typography
          color="darkgrey"
          textAlign={'center'}
          onDoubleClick={handleToggle}
        >
          {note?.title}
        </Typography>
      ) : (
        <TextField
          placeholder="Note title"
          sx={{
            display: 'flex',
            alignItems: 'center',
            marginTop: -0.5,
          }}
          inputProps={{ style: { textAlign: 'center' } }}
          variant="standard"
          onBlur={() => {
            if (form.formState.errors.title === undefined) handleToggle();
          }}
          value={title.field.value}
          onChange={title.field.onChange}
          name={title.field.name}
          error={form.formState.errors.title !== undefined}
          helperText={title.fieldState.error?.message}
        />
      )}
      <Box
        sx={{
          maxHeight: '85vh',
        }}
      >
        <MDXEditor
          markdown={note.content}
          ref={content.field.ref}
          onChange={debounce(content.field.onChange, 500)}
          onBlur={content.field.onBlur}
          contentEditableClassName={classes.root}
          plugins={[
            headingsPlugin(),
            listsPlugin(),
            quotePlugin(),
            markdownShortcutPlugin(),
            thematicBreakPlugin(),
          ]}
        />
      </Box>
      <Box
        sx={(theme) => ({
          backgroundColor: theme.palette.background.default,
          boxSizing: 'border-box',
          marginLeft: -2.7,
          // borderTop: '1px solid',
          // borderColor: theme.palette.action.focus,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-end',
          paddingX: 2,
          paddingY: 0.5,
          //width: 'calc(100% - 310px);',
          position: 'fixed',
          bottom: 0,
          right: 0,
          gap: 2,
        })}
      >
        <Tooltip title="Share note">
          <IconButton
            onClick={() => {
              getNewToken();
              setShareButtonClicked(true);
            }}
          >
            <IosShareIcon sx={{ height: 15, width: 15, color: 'darkgrey' }} />
          </IconButton>
        </Tooltip>
        <DialogCopy noteId={noteId} />
        {isPending ? (
          <Box display="flex" alignItems="center" gap={0.5}>
            <Typography
              variant="caption"
              color="darkgrey"
              sx={{ userSelect: 'none' }}
            >
              Saving
            </Typography>
            <AutorenewIcon sx={{ height: 15, width: 15, color: 'darkgrey' }} />
          </Box>
        ) : (
          <Box display="flex" alignItems="center" gap={0.5}>
            <Typography
              variant="caption"
              color="darkgrey"
              sx={{ userSelect: 'none' }}
            >
              Saved
            </Typography>
            <DoneAllIcon sx={{ height: 15, width: 15, color: 'darkgrey' }} />
          </Box>
        )}
      </Box>
    </Box>
  );
};

import {
  MDXEditor,
  headingsPlugin,
  listsPlugin,
  markdownShortcutPlugin,
  quotePlugin,
  thematicBreakPlugin,
} from '@mdxeditor/editor';
import { Box, TextField, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { getNoteById, mutateEditNote } from '~/api/Notes/query';
import { useEffect, useState } from 'react';
import { noteModel, noteSchema } from './schema';
import { useController, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { debounce } from 'lodash';
import { LoadingView } from '../LoadingView/LoadingView';

const useStyles = makeStyles({
  root: {
    outline: 'none',
    height: '35vh',
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
  const [unsavedChanges, setUnsavedChanges] = useState(false); // Track changes
  const [toggle, setToggle] = useState(true);
  const handleToggle = () => setToggle(!toggle);
  const { mutateAsync } = mutateEditNote();

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
      <MDXEditor
        markdown={note.content}
        ref={content.field.ref}
        onChange={debounce(content.field.onChange, 1000)}
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
  );
};

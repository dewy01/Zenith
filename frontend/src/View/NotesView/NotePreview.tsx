import {
  MDXEditor,
  headingsPlugin,
  listsPlugin,
  markdownShortcutPlugin,
  quotePlugin,
  thematicBreakPlugin,
} from '@mdxeditor/editor';
import { Box, CircularProgress, TextField, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { getNoteById, mutateEditNote } from '~/api/Notes/query';
import { useEffect, useState } from 'react';
import { noteModel, noteSchema } from './schema';
import { useController, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { debounce } from 'lodash';

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

  const [toggle, setToggle] = useState(true);
  const handleToggle = () => setToggle(!toggle);

  const form = useForm<noteModel>({
    defaultValues: { title: note?.title, content: note?.content },
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

  const { mutateAsync } = mutateEditNote(
    { title: title.field.value, content: content.field.value },
    noteId,
  );

  useEffect(() => {
    mutateAsync();
  }, [title.field.value, content.field.value]);

  const classes = useStyles();

  if (isLoading || note === undefined) {
    return (
      <Box
        sx={{ height: '90vh' }}
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        <CircularProgress color="inherit" />
      </Box>
    );
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
          ref={title.field.ref}
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

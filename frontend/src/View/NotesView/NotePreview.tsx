import {
  MDXEditor,
  headingsPlugin,
  listsPlugin,
  markdownShortcutPlugin,
  quotePlugin,
  thematicBreakPlugin,
} from "@mdxeditor/editor";
import { Box, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { getNoteById } from "../../api/Notes/query";

const useStyles = makeStyles({
  root: {
    outline: "none",
    height: "35vh",
    width: "100%",
    fontFamily: "inherit",
    fontSize: "16px",
  },
});

type Props = {
  noteId: number;
};

export const NotePreview = ({ noteId }: Props) => {
  const { data: note } = getNoteById(noteId);

  const classes = useStyles();
  return (
    <Box key={noteId}>
      <Typography textAlign={"center"}>{note?.title}</Typography>
      <MDXEditor
        markdown={note?.content ? note.content : ""}
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

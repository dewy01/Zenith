import { Box, IconButton, Typography } from "@mui/material";
import { Main } from "../../component/Main";
import { SubDrawer } from "../../component/SubDrawer";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import { SearchField } from "../../component/SearchField";
import { DrawerLink } from "./DrawerLink";

export const NotesView = () => {
  return (
    <Main>
      <SubDrawer>
        <Box display={"flex"} flexDirection={"column"} gap={2}>
          <Box
            display={"flex"}
            justifyContent={"space-between"}
            alignItems={"center"}
          >
            <IconButton>
              <AddIcon />
            </IconButton>
            <Typography fontSize={24}>Notes</Typography>
            <IconButton>
              <DeleteIcon />
            </IconButton>
          </Box>
          <SearchField />
          <DrawerLink link={"/notes"}>
            <Box display={"flex"} flexDirection={"column"} gap={1} padding={2}>
              <Typography>Title</Typography>
              <Typography variant="caption">31/12/2024, 21:51</Typography>
            </Box>
          </DrawerLink>
        </Box>
      </SubDrawer>
    </Main>
  );
};

import { BrowserRouter } from "react-router-dom";
import { Router } from "./component/Router";
import { CssBaseline, GlobalStyles, ThemeProvider } from "@mui/material";
import { dark, light } from "./component/Theme";
import darkScrollbar from "@mui/material/darkScrollbar";

document.addEventListener(
  "auxclick",
  (e: Event) => {
    e.preventDefault();
  },
  true,
);

const App = () => {
  return (
    <ThemeProvider theme={dark}>
      <BrowserRouter>
        <Router />
        <CssBaseline />
        <GlobalStyles styles={{ ...darkScrollbar() }} />
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default App;

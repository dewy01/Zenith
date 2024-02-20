import { BrowserRouter } from "react-router-dom";
import { Router } from "./component/Router";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { dark, light } from "./component/Theme";

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
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default App;

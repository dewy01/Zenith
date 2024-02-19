import { BrowserRouter } from "react-router-dom";
import { Router } from "./component/Router";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { darkTheme } from "./component/Theme";

const App = () => {
  return (
    <ThemeProvider theme={darkTheme}>
      <BrowserRouter>
        <Router />
        <CssBaseline />
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default App;

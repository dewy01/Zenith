import { BrowserRouter } from "react-router-dom";
import { Router } from "./component/Router";
import { CssBaseline, GlobalStyles, ThemeProvider } from "@mui/material";

import darkScrollbar from "@mui/material/darkScrollbar";
import { AuthProvider } from "./context/AuthContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SnackbarProvider } from "notistack";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFnsV3";
import { enGB } from "date-fns/locale";
import { dark } from "./Theme";

const queryClient = new QueryClient();

document.addEventListener(
  "auxclick",
  (e: Event) => {
    e.preventDefault();
  },
  true,
);

const App = () => {
  return (
    <SnackbarProvider
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "right",
      }}
    >
      <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={enGB}>
        <QueryClientProvider client={queryClient}>
          <AuthProvider>
            <ThemeProvider theme={dark}>
              <BrowserRouter>
                <Router />
                <CssBaseline />
                <GlobalStyles styles={{ ...darkScrollbar() }} />
              </BrowserRouter>
            </ThemeProvider>
          </AuthProvider>
        </QueryClientProvider>
      </LocalizationProvider>
    </SnackbarProvider>
  );
};

export default App;

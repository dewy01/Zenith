import { BrowserRouter } from "react-router-dom";
import { Router } from "./component/Router";
import { CssBaseline, GlobalStyles, ThemeProvider } from "@mui/material";
import { dark, light } from "./component/Theme";
import darkScrollbar from "@mui/material/darkScrollbar";
import { AuthProvider } from "./context/AuthContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

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
  );
};

export default App;

import { Navigate, Route, Routes } from "react-router-dom";
import { Layout } from "../Layout";
import { ErrorView, NotFoundView } from "../../View/Errors";
import { NotesView } from "../../View/NotesView";
import { RegisterView } from "../../View/RegisterView";
import { LoginView } from "../../View/LoginView";

export const Router = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />} errorElement={<ErrorView />}>
          <Route
            index={true}
            element={<Navigate to="/home" />}
            errorElement={<ErrorView />}
          />
          <Route path="/home" element={<></>} errorElement={<ErrorView />} />
          <Route
            path="/projects"
            element={<></>}
            errorElement={<ErrorView />}
          />
          <Route
            path="/calendar"
            element={<></>}
            errorElement={<ErrorView />}
          />
          <Route
            path="/notes"
            element={<NotesView />}
            errorElement={<ErrorView />}
          />
          <Route path="/kanban" element={<></>} errorElement={<ErrorView />} />
          <Route path="/groups" element={<></>} errorElement={<ErrorView />} />
          {/* <Route path="/settings" element={<></>} /> */}
        </Route>
        <Route
          path="*"
          element={<NotFoundView />}
          errorElement={<ErrorView />}
        />
        <Route
          path="/register"
          element={<RegisterView />}
          errorElement={<ErrorView />}
        />
        <Route
          path="/login"
          element={<LoginView />}
          errorElement={<ErrorView />}
        />
      </Routes>
    </>
  );
};

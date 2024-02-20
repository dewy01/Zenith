import { Route, Routes } from "react-router-dom";
import { Layout } from "../Layout";
import { ErrorView, NotFoundView } from "../../View/Errors";

export const Router = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />} errorElement={<ErrorView />}>
          <Route
            index={true}
            path="/home"
            element={<></>}
            errorElement={<ErrorView />}
          />
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
          <Route path="/notes" element={<></>} errorElement={<ErrorView />} />
          <Route path="/kanban" element={<></>} errorElement={<ErrorView />} />
          <Route path="/groups" element={<></>} errorElement={<ErrorView />} />
          {/* <Route path="/settings" element={<></>} /> */}
          <Route
            path="*"
            element={<NotFoundView />}
            errorElement={<ErrorView />}
          />
        </Route>
      </Routes>
    </>
  );
};

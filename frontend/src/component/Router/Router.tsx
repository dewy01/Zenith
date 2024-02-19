import { Route, Routes } from "react-router-dom";
import { Layout } from "../Layout";

export const Router = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/home" element={<></>} />
          <Route path="/projects" element={<></>} />
          <Route path="/calendar" element={<></>} />
          <Route path="/notes" element={<></>} />
          <Route path="/kanban" element={<></>} />
          <Route path="/groups" element={<></>} />
          <Route path="/settings" element={<></>} />
        </Route>
        <Route path="*" element={<></>} />
      </Routes>
    </>
  );
};

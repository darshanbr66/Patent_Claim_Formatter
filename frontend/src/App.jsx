import { BrowserRouter, Routes, Route } from "react-router-dom";

import AppLayout from "./layouts/AppLayout";

import HomePage from "./pages/HomePage";
import ProcessingPage from "./pages/ProcessingPage";
import ViewerPage from "./pages/ViewerPage";

export default function App() {
  return (
    <BrowserRouter>
      <AppLayout>
        <Routes>
          <Route
            path="/"
            element={<HomePage />}
          />

          <Route
            path="/processing"
            element={<ProcessingPage />}
          />

          <Route
            path="/viewer"
            element={<ViewerPage />}
          />
        </Routes>
      </AppLayout>
    </BrowserRouter>
  );
}
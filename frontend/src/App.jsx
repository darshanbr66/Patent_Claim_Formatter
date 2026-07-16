import { BrowserRouter, Routes, Route } from "react-router-dom";

import AppLayout from "./layouts/AppLayout";

import HomePage from "./pages/HomePage";
import ProcessingPage from "./pages/ProcessingPage";
import ViewerPage from "./pages/ViewerPage";
import ParserTestPage from "./pages/ParserTestPage";

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

          {/* Temporary debugging route */}
          <Route
            path="/parser-test"
            element={<ParserTestPage />}
          />
        </Routes>
      </AppLayout>
    </BrowserRouter>
  );
}
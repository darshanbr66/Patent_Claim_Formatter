import React from "react";
import ReactDOM from "react-dom/client";

import "./index.css";

import App from "./App";

import { DocumentProvider } from "./context/DocumentContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <DocumentProvider>
      <App />
    </DocumentProvider>
  </React.StrictMode>
);
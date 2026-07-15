import { createContext, useContext, useMemo, useState } from "react";

const DocumentContext = createContext(null);

const initialDocumentState = {
  file: null,
  processingStatus: "idle", // idle | processing | completed | failed
  progress: 0,
  result: null,
};

export function DocumentProvider({ children }) {
  const [documentState, setDocumentState] = useState(initialDocumentState);

  const resetDocument = () => {
    setDocumentState(initialDocumentState);
  };

  const value = useMemo(
    () => ({
      documentState,
      setDocumentState,
      resetDocument,
    }),
    [documentState]
  );

  return (
    <DocumentContext.Provider value={value}>
      {children}
    </DocumentContext.Provider>
  );
}

export function useDocument() {
  const context = useContext(DocumentContext);

  if (!context) {
    throw new Error(
      "useDocument must be used within a DocumentProvider."
    );
  }

  return context;
}
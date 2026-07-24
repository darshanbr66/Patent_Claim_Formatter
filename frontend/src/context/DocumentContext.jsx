import {
  createContext,
  useContext,
  useMemo,
  useState,
} from "react";

import buildSearchIndex from "../services/search/buildSearchIndex";
import searchClaims from "../services/search/searchClaims";

const DocumentContext = createContext(null);

const initialDocumentState = {
  file: null,
  processingStatus: "idle",
  progress: 0,
  result: null,
};

export function DocumentProvider({ children }) {
  const [documentState, setDocumentState] =
    useState(initialDocumentState);

  const [searchTerm, setSearchTerm] = useState("");

  const resetDocument = () => {
    setDocumentState(initialDocumentState);
    setSearchTerm("");
  };

  const searchIndex = useMemo(() => {
    return buildSearchIndex(documentState.result);
  }, [documentState.result]);

  const searchResults = useMemo(() => {
    return searchClaims(searchIndex, searchTerm);
  }, [searchIndex, searchTerm]);

  const value = useMemo(
    () => ({
      documentState,
      setDocumentState,
      resetDocument,

      searchTerm,
      setSearchTerm,

      searchIndex,
      searchResults,
    }),
    [
      documentState,
      searchTerm,
      searchIndex,
      searchResults,
    ]
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
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import DropZone from "./DropZone";
import FilePreview from "./FilePreview";
import ValidationMessage from "./ValidationMessage";

import { validatePatentFile } from "../../utils/fileValidation";
import { useDocument } from "../../context/DocumentContext";

export default function UploadCard() {
  const navigate = useNavigate();

  const { setDocumentState } = useDocument();

  const [selectedFile, setSelectedFile] = useState(null);
  const [validationMessage, setValidationMessage] = useState("");
  const [isDragging, setIsDragging] = useState(false);

  const handleFileSelection = (files) => {
    const result = validatePatentFile(files);

    if (!result.isValid) {
      setSelectedFile(null);
      setValidationMessage(result.message);
      return;
    }

    setValidationMessage("");
    setSelectedFile(result.file);
  };

  const handleRemove = () => {
    setSelectedFile(null);
    setValidationMessage("");

    setDocumentState((prev) => ({
      ...prev,
      file: null,
      processingStatus: "idle",
      progress: 0,
      result: null,
    }));
  };

  const handleProcessDocument = () => {
    if (!selectedFile) return;

    setDocumentState((prev) => ({
      ...prev,
      file: selectedFile,
      processingStatus: "processing",
      progress: 0,
      result: null,
    }));

    navigate("/processing");
  };

  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
      <DropZone
        onFileSelect={handleFileSelection}
        isDragging={isDragging}
        setIsDragging={setIsDragging}
      />

      <ValidationMessage message={validationMessage} />

      <FilePreview
        file={selectedFile}
        onRemove={handleRemove}
      />

      <div className="mt-8 flex justify-end">
        <button
          type="button"
          onClick={handleProcessDocument}
          disabled={!selectedFile}
          className={`rounded-xl px-8 py-3 text-sm font-semibold text-white transition-all duration-200 ${
            selectedFile
              ? "bg-blue-600 shadow hover:bg-blue-700"
              : "cursor-not-allowed bg-slate-300"
          }`}
        >
          Process Document
        </button>
      </div>
    </div>
  );
}
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { RotateCcw } from "lucide-react";

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

  const handleReplaceFile = () => {
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
      {!selectedFile ? (
        <>
          <DropZone
            onFileSelect={handleFileSelection}
            isDragging={isDragging}
            setIsDragging={setIsDragging}
          />

          <ValidationMessage message={validationMessage} />
        </>
      ) : (
        <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-6">
          <FilePreview
            file={selectedFile}
            onRemove={handleReplaceFile}
          />

          <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
            <button
              type="button"
              onClick={handleReplaceFile}
              className="
                inline-flex
                items-center
                justify-center
                gap-2
                rounded-xl
                border
                border-slate-300
                bg-white
                px-5
                py-3
                text-sm
                font-semibold
                text-slate-700
                transition
                hover:bg-slate-100
              "
            >
              <RotateCcw className="h-4 w-4" />
              Replace File
            </button>

            <button
              type="button"
              onClick={handleProcessDocument}
              className="
                rounded-xl
                bg-blue-600
                px-6
                py-3
                text-sm
                font-semibold
                text-white
                shadow
                transition
                hover:bg-blue-700
                hover:shadow-lg
              "
            >
              Process Document
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
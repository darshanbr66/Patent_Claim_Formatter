import { useRef } from "react";
import { ACCEPT_ATTRIBUTE } from "../../constants/fileConfig";

export default function DropZone({
  onFileSelect,
  isDragging,
  setIsDragging,
}) {
  const inputRef = useRef(null);

  const preventDefaults = (event) => {
    event.preventDefault();
    event.stopPropagation();
  };

  const handleDragEnter = (event) => {
    preventDefaults(event);
    setIsDragging(true);
  };

  const handleDragLeave = (event) => {
    preventDefaults(event);
    setIsDragging(false);
  };

  const handleDrop = (event) => {
    preventDefaults(event);

    setIsDragging(false);

    const files = event.dataTransfer.files;

    if (files.length > 0) {
      onFileSelect(files);
    }
  };

  const handleBrowse = () => {
    inputRef.current?.click();
  };

  const handleInputChange = (event) => {
    const files = event.target.files;

    if (files.length > 0) {
      onFileSelect(files);
    }

    event.target.value = "";
  };

  return (
    <>
      <input
        ref={inputRef}
        type="file"
        accept={ACCEPT_ATTRIBUTE}
        className="hidden"
        onChange={handleInputChange}
      />

      <div
        onClick={handleBrowse}
        onDragEnter={handleDragEnter}
        onDragOver={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`cursor-pointer rounded-3xl border-2 border-dashed p-12 text-center transition-all duration-200

        ${
          isDragging
            ? "border-blue-500 bg-blue-50"
            : "border-slate-300 bg-slate-50 hover:border-blue-400 hover:bg-blue-50"
        }`}
      >
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-white shadow-sm">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-10 w-10 text-blue-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.8}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 16V4m0 0-4 4m4-4 4 4M4 16v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2"
            />
          </svg>
        </div>

        <h3 className="mt-6 text-xl font-semibold text-slate-900">
          Drag & Drop Patent Document
        </h3>

        <p className="mt-3 text-slate-500">
          or click anywhere in this area to browse your computer.
        </p>

        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            handleBrowse();
          }}
          className="mt-8 rounded-xl bg-blue-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
        >
          Browse Files
        </button>

        <div className="mt-8 flex flex-wrap justify-center gap-2">
          {["XML", "PDF", "TXT", "DOCX"].map((item) => (
            <span
              key={item}
              className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs font-medium text-slate-600"
            >
              {item}
            </span>
          ))}
        </div>
      </div>
    </>
  );
}
import { useRef } from "react";
import { UploadCloud } from "lucide-react";
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
        className={`
          cursor-pointer
          rounded-3xl
          border-2
          border-dashed
          px-10
          py-12
          text-center
          transition-all
          duration-200

          ${
            isDragging
              ? "border-blue-500 bg-blue-50"
              : "border-slate-300 bg-slate-50 hover:border-blue-400 hover:bg-blue-50"
          }
        `}
      >
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-white shadow-sm">
          <UploadCloud className="h-8 w-8 text-blue-600" />
        </div>

        <h3 className="mt-5 text-2xl font-semibold text-slate-900">
          Upload Patent Document
        </h3>

        <p className="mt-2 text-sm text-slate-500">
          Drag & drop your XML file here or browse your computer.
        </p>

        <button
          type="button"
          onClick={(event) => {
            event.stopPropagation();
            handleBrowse();
          }}
          className="
            mt-6
            rounded-xl
            bg-blue-600
            px-6
            py-3
            text-sm
            font-semibold
            text-white
            transition
            hover:bg-blue-700
          "
        >
          Browse Files
        </button>

        {/* <div className="mt-6 flex flex-wrap justify-center gap-2">
          {["XML", "PDF", "TXT", "DOCX"].map((type) => (
            <span
              key={type}
              className="
                rounded-lg
                border
                border-slate-200
                bg-white
                px-3
                py-1.5
                text-xs
                font-medium
                text-slate-600
              "
            >
              {type}
            </span>
          ))}
        </div> */}
      </div>
    </>
  );
}
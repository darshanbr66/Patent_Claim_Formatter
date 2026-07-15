import { useNavigate } from "react-router-dom";
import { useDocument } from "../context/DocumentContext";

const mockClaims = [
  "1. A computer-implemented method comprising: receiving a patent document; identifying one or more claims; and generating formatted claim output for presentation.",
  "2. The method of claim 1, wherein the patent document is an XML document conforming to the USPTO patent grant format.",
  "3. The method of claim 1, wherein the formatted output preserves the original claim hierarchy and indentation.",
  "4. The method of claim 1, wherein the formatted output is downloadable as a PDF document.",
];

export default function ViewerPage() {
  const navigate = useNavigate();

  const {
    documentState,
    resetDocument,
  } = useDocument();

  const handleUploadAnother = () => {
    resetDocument();
    navigate("/");
  };

  return (
    <section className="mx-auto flex w-full max-w-7xl flex-col gap-8">
      {/* Toolbar */}

      <div className="flex flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">
            Formatted Patent Document
          </h1>

          <p className="mt-1 text-sm text-slate-500">
            Review the formatted output before downloading.
          </p>
        </div>

        <div className="flex gap-3">
          <button
            disabled
            className="cursor-not-allowed rounded-xl bg-slate-300 px-6 py-3 text-sm font-semibold text-white"
          >
            Download PDF
          </button>

          <button
            onClick={handleUploadAnother}
            className="rounded-xl border border-slate-300 px-6 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
          >
            Upload Another
          </button>
        </div>
      </div>

      {/* Document Summary */}

      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-slate-900">
          Document Information
        </h2>

        <div className="mt-6 grid gap-4 md:grid-cols-2">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
              File Name
            </p>

            <p className="mt-1 text-sm text-slate-900">
              {documentState.file?.name || "Unknown"}
            </p>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
              Status
            </p>

            <p className="mt-1 font-medium text-emerald-600">
              Processing Complete
            </p>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
              File Type
            </p>

            <p className="mt-1 text-sm text-slate-900">
              {documentState.file?.type || "Unknown"}
            </p>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
              Progress
            </p>

            <p className="mt-1 text-sm text-slate-900">
              {documentState.progress}%
            </p>
          </div>
        </div>
      </div>

      {/* Claims */}

      <div className="rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="border-b border-slate-200 px-8 py-6">
          <h2 className="text-xl font-semibold text-slate-900">
            Formatted Claims
          </h2>

          <p className="mt-2 text-sm text-slate-500">
            Mock formatted output. This section will render the backend response
            once the API integration is available.
          </p>
        </div>

        <div className="space-y-8 p-8">
          {mockClaims.map((claim) => (
            <div
              key={claim}
              className="rounded-xl border border-slate-100 bg-slate-50 p-5"
            >
              <p className="whitespace-pre-wrap text-[15px] leading-8 text-slate-800">
                {claim}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
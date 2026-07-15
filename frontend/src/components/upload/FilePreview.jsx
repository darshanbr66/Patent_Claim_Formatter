import { formatFileSize } from "../../utils/fileValidation";

export default function FilePreview({
  file,
  onRemove,
}) {
  if (!file) {
    return null;
  }

  return (
    <div className="mt-6 rounded-2xl border border-emerald-200 bg-emerald-50 p-5">
      <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
        <div>
          <h4 className="font-semibold text-slate-900">
            {file.name}
          </h4>

          <p className="mt-1 text-sm text-slate-600">
            {file.type || "Unknown Type"} • {formatFileSize(file.size)}
          </p>

          <span className="mt-2 inline-flex rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700">
            Ready to Upload
          </span>
        </div>

        <button
          type="button"
          onClick={onRemove}
          className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-100"
        >
          Remove
        </button>
      </div>
    </div>
  );
}
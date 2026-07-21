import { formatFileSize } from "../../utils/fileValidation";
import { CheckCircle2, FileText, Trash2 } from "lucide-react";

export default function FilePreview({
  file,
  onRemove,
  children,
}) {
  if (!file) {
    return null;
  }

  return (
    <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-5">
      <div className="flex items-center gap-4">
        {/* File Icon */}
        <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-white shadow-sm">
          <FileText className="h-7 w-7 text-blue-600" />
        </div>

        {/* File Details */}
        <div className="min-w-0 flex-1">
          <h4 className="truncate text-base font-semibold text-slate-900">
            {file.name}
          </h4>

          <p className="mt-1 text-sm text-slate-500">
            {file.type || "Unknown Type"} • {formatFileSize(file.size)}
          </p>

          <div className="mt-2 flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4 text-emerald-600" />

            <span className="text-sm font-medium text-emerald-700">
              Ready to Upload
            </span>
          </div>
        </div>

        {/* Actions */}
        <div className="flex shrink-0 items-center gap-3">
          {children}

          <button
            type="button"
            onClick={onRemove}
            className="
              inline-flex
              items-center
              gap-2
              rounded-xl
              border
              border-slate-300
              bg-white
              px-4
              py-2.5
              text-sm
              font-medium
              text-slate-700
              transition
              hover:bg-slate-100
            "
          >
            <Trash2 className="h-4 w-4" />
            Remove
          </button>
        </div>
      </div>
    </div>
  );
}
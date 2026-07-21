function getStatusStyles(status) {
  switch (status?.toLowerCase()) {
    case "completed":
      return {
        badge:
          "bg-emerald-100 text-emerald-700 border border-emerald-200",
        label: "Completed",
      };

    case "processing":
      return {
        badge:
          "bg-blue-100 text-blue-700 border border-blue-200",
        label: "Processing",
      };

    case "failed":
      return {
        badge:
          "bg-red-100 text-red-700 border border-red-200",
        label: "Failed",
      };

    default:
      return {
        badge:
          "bg-slate-100 text-slate-700 border border-slate-200",
        label: status || "Unknown",
      };
  }
}

export default function DocumentTitle({
  document,
  metadata,
}) {
  const status = getStatusStyles(metadata?.status);

  return (
    <div className="min-w-0">
      <div className="flex flex-wrap items-center gap-2">
        <h1 className="truncate text-2xl font-semibold leading-none tracking-tight text-slate-900">
          {document?.name || "Untitled Document"}
        </h1>

        <span
          className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-[11px] font-semibold ${status.badge}`}
        >
          {status.label}
        </span>
      </div>

      <div className="mt-1 flex flex-wrap items-center gap-1.5 text-xs text-slate-500">
        <span>
          {metadata?.totalClaims ?? 0} Claims
        </span>

        <span>•</span>

        <span>
          Formatter v{metadata?.formatterVersion ?? "1.0.0"}
        </span>

        <span>•</span>

        <span>
          {document?.processedAt
            ? new Date(document.processedAt).toLocaleString()
            : "Not processed"}
        </span>
      </div>
    </div>
  );
}
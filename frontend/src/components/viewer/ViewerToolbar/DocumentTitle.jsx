function getStatusStyles(status) {
  switch ((status || "").toLowerCase()) {
    case "success":
    case "completed":
      return {
        badge:
          "bg-emerald-100 text-emerald-700 border border-emerald-200",
        label: "Success",
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
        label: "Unknown",
      };
  }
}

export default function DocumentTitle({
  document,
  metadata,
  statistics,
  claims,
}) {
  const backendStatus =
    document?.status ??
    metadata?.status ??
    "";

  const status = getStatusStyles(backendStatus);

  const title =
    metadata?.title ||
    document?.title ||
    document?.type ||
    "Untitled Document";

  const claimCount =
    claims?.length ||
    statistics?.claimCount ||
    0;

  const documentType =
    document?.type ||
    "Patent Document";

  const processingText =
    backendStatus.toLowerCase() === "success"
      ? "Processed"
      : backendStatus.toLowerCase() === "processing"
      ? "Processing"
      : backendStatus.toLowerCase() === "failed"
      ? "Failed"
      : "Not processed";

  return (
    <div className="min-w-0">
      <div className="flex flex-wrap items-center gap-2">
        <h1 className="truncate text-2xl font-semibold leading-none tracking-tight text-slate-900">
          {title}
        </h1>

        <span
          className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-[11px] font-semibold ${status.badge}`}
        >
          {status.label}
        </span>
      </div>

      <div className="mt-1 flex flex-wrap items-center gap-1.5 text-xs text-slate-500">
        <span>{claimCount} Claims</span>

        <span>•</span>

        <span>{documentType}</span>

        <span>•</span>

        <span>{processingText}</span>
      </div>
    </div>
  );
}
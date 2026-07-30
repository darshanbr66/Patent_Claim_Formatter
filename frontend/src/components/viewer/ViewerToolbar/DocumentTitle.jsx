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

  const documentType = (() => {
    const type = document?.type;

    if (!type) {
      return "Patent Document";
    }

    const displayMap = {
      USPTO_XML: "USPTO XML",
      USPTO_PDF: "USPTO PDF",
      EPO_XML: "EPO XML",
      WIPO_XML: "WIPO XML",
    };

    return displayMap[type] ?? type.replace(/_/g, " ");
  })();

  const formatDate = (value) => {
      if (!value) {
        return null;
      }

      const date = new Date(value);

      if (Number.isNaN(date.getTime())) {
        return value;
      }

      return new Intl.DateTimeFormat("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      }).format(date);
    };

    const publicationText = (() => {
      const date = formatDate(document?.publicationDate);

      if (!date) {
        return null;
      }

      return document?.patentNumber
        ? `Granted ${date}`
        : `Published ${date}`;
    })();

  return (
    <div className="min-w-0 flex-1">
      <div className="flex flex-wrap items-start gap-2">
        <h1
          className="
            text-2xl
            font-semibold
            leading-tight
            tracking-tight
            text-slate-900
            break-words
            whitespace-normal
          "
        >
          {title}
        </h1>

        <span
          className={`inline-flex shrink-0 items-center rounded-full px-2.5 py-0.5 text-[11px] font-semibold ${status.badge}`}
        >
          {status.label}
        </span>
      </div>

      <div
        className="
          mt-2
          flex
          flex-wrap
          items-center
          gap-1.5
          text-xs
          text-slate-500
        "
      >
        <span>{claimCount} Claims</span>

        <span>•</span>

        <span>{documentType}</span>

        <span>•</span>

        <span>{publicationText ?? "Publication Date —"}</span>
      </div>
    </div>
  );
}
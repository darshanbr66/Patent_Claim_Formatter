import {
  FileCode2,
  Hash,
  CalendarDays,
  BadgeCheck,
  Info,
} from "lucide-react";

export default function ProcessingSummary({
  document,
}) {

  const metadataItems = [
    {
      id: "patent",
      title: "Patent Number",
      value: (() => {
        if (!document?.patentNumber) {
          return null;
        }

        return [
          document.country,
          document.patentNumber,
          document.kind,
        ]
          .filter(Boolean)
          .join(" ");
      })(),

      icon: BadgeCheck,
      iconClass: "text-violet-600",
      bgClass: "bg-violet-50",
    },

    {
      id: "publication",
      title: "Granted Date",
      value: document?.publicationDate ?? null,

      icon: CalendarDays,
      iconClass: "text-amber-600",
      bgClass: "bg-amber-50",
    },

    {
      id: "application",
      title: "Application No.",
      value: document?.applicationNumber ?? null,

      icon: Hash,
      iconClass: "text-emerald-600",
      bgClass: "bg-emerald-50",
    },
  ];

  const availableMetadata = metadataItems.filter(
    (item) => item.value
  );

  const missingMetadata = metadataItems.filter(
    (item) => !item.value
  );

const summaryItems = [
  {
    id: "type",
    title: "Document Type",
    value:
      document?.type === "USPTO_XML"
        ? "USPTO XML"
        : document?.type ?? "—",

    icon: FileCode2,
    iconClass: "text-sky-600",
    bgClass: "bg-sky-50",
  },

  ...availableMetadata,
];

const gridClass =
  summaryItems.length === 1
    ? "md:grid-cols-1"
    : summaryItems.length === 2
    ? "md:grid-cols-2"
    : summaryItems.length === 3
    ? "md:grid-cols-3"
    : "md:grid-cols-2 xl:grid-cols-4";

  return (
  <section className="space-y-3">
    <div
      className={`grid gap-3 ${gridClass}`}
    >
      {summaryItems.map((item) => {
        const Icon = item.icon;

        return (
          <div
            key={item.id}
            className="
              rounded-xl
              border
              border-slate-200
              bg-white
              px-5
              py-4
              shadow-sm
              transition-shadow
              duration-200
              hover:shadow-md
            "
          >
            <div className="flex items-center justify-between">
              <div className="min-w-0">
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                  {item.title}
                </p>

                <p
                  className="
                    mt-1
                    truncate
                    text-xl
                    font-semibold
                    text-slate-900
                  "
                  title={item.value}
                >
                  {item.value}
                </p>
              </div>

              <div
                className={`flex h-10 w-10 items-center justify-center rounded-lg ${item.bgClass}`}
              >
                <Icon
                  size={18}
                  className={item.iconClass}
                />
              </div>
            </div>
          </div>
        );
      })}
    </div>

    {missingMetadata.length > 0 && (
      <div
        className="
          rounded-xl
          border
          border-blue-200
          bg-blue-50
          px-5
          py-4
        "
      >
        <div className="flex items-center gap-2">
          <Info size={18} className="text-blue-600" />

          <h3 className="text-sm font-semibold text-blue-900">
            Partial document metadata
          </h3>
        </div>

        <p className="mt-1 text-sm leading-6 text-blue-800">
          The uploaded document does not contain the following metadata:
          <span className="font-medium">
            {" "}
            {missingMetadata.map(item => item.title).join(", ")}
          </span>.
        </p>
      </div>
    )}
  </section>
);
}
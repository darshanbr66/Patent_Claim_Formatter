import {
  FileCode2,
  Hash,
  CalendarDays,
  BadgeCheck,
} from "lucide-react";

export default function ProcessingSummary({
  document,
}) {
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

    {
      id: "patent",

      title: "Patent Number",
      
      // Plane Number
      // value:
      //   document?.patentNumber ??
      //   "—",

      // Format Patent Number
      value: (() => {
        if (!document?.patentNumber) {
          return "—";
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

      value:
        document?.publicationDate ??
        "—",

      icon: CalendarDays,
      iconClass: "text-amber-600",
      bgClass: "bg-amber-50",
    },

    {
      id: "application",

      title: "Application No.",

      value:
        document?.applicationNumber ??
        "—",

      icon: Hash,
      iconClass: "text-emerald-600",
      bgClass: "bg-emerald-50",
    },
    
  ];

  return (
    <section className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
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
    </section>
  );
}
import {
  CheckCircle2,
  FileText,
  Timer,
  Cpu,
} from "lucide-react";

export default function ProcessingSummary({
  document,
  metadata,
}) {
  const summaryItems = [
    {
      id: "status",
      title: "Status",
      value: metadata?.status || "Unknown",
      icon: CheckCircle2,
      iconClass: "text-emerald-600",
      bgClass: "bg-emerald-50",
    },
    {
      id: "claims",
      title: "Total Claims",
      value: metadata?.totalClaims ?? 0,
      icon: FileText,
      iconClass: "text-blue-600",
      bgClass: "bg-blue-50",
    },
    {
      id: "time",
      title: "Processing Time",
      value: metadata?.processingTime || "--",
      icon: Timer,
      iconClass: "text-amber-600",
      bgClass: "bg-amber-50",
    },
    {
      id: "version",
      title: "Formatter",
      value: `v${metadata?.formatterVersion ?? "1.0.0"}`,
      icon: Cpu,
      iconClass: "text-violet-600",
      bgClass: "bg-violet-50",
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

                <p className="mt-1 text-2xl font-semibold leading-none text-slate-900">
                  {item.value}
                </p>
              </div>

              <div
                className={`flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg ${item.bgClass}`}
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
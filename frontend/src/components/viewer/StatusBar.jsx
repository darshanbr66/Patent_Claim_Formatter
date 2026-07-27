import {
  CalendarDays,
  CheckCircle2,
  FileBadge2,
} from "lucide-react";

export default function StatusBar({
  document,
  statistics,
  claims,
}) {
  const processedDate = document?.processedAt
    ? new Date(document.processedAt).toLocaleString()
    : "--";

  const status =
    document?.status || "Unknown";

  const totalClaims =
    claims?.length ||
    statistics?.claimCount ||
    0;

  return (
    <footer className="rounded-2xl border border-slate-200 bg-white px-6 py-4 shadow-sm">
      <div className="flex flex-col gap-4 text-sm text-slate-600 md:flex-row md:items-center md:justify-between">
        <div className="flex flex-wrap items-center gap-6">
          <div className="flex items-center gap-2">
            <CheckCircle2
              size={18}
              className="text-emerald-600"
            />

            <span>
              Status:&nbsp;
              <span className="font-medium capitalize text-slate-900">
                {status}
              </span>
            </span>
          </div>

          <div className="flex items-center gap-2">
            <FileBadge2
              size={18}
              className="text-blue-600"
            />

            <span>
              Claims:&nbsp;
              <span className="font-medium text-slate-900">
                {totalClaims}
              </span>
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <CalendarDays
            size={18}
            className="text-slate-500"
          />

          <span>
            Processed:&nbsp;
            <span className="font-medium text-slate-900">
              {processedDate}
            </span>
          </span>
        </div>
      </div>
    </footer>
  );
}
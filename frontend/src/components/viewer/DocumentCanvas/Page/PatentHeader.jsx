export default function PatentHeader({ document }) {
  if (!document) return null;

  const getValue = (value, fallback = "—") => {
    if (
      value === undefined ||
      value === null ||
      value === ""
    ) {
      return fallback;
    }

    return value;
  };

  const patentNumber = [
    document.country,
    document.publicationNumber,
    document.kind,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <header className="border-b border-slate-300 pb-6">
      <div className="flex items-start justify-between">
        <div>
          <div
            className="
              text-[28px]
              font-semibold
              tracking-tight
              text-slate-900
              leading-none
            "
          >
            {patentNumber || getValue(document.type)}
          </div>

          <div
            className="
              mt-1
              text-[11px]
              font-medium
              uppercase
              tracking-[0.22em]
              text-slate-500
            "
          >
            {document.country
              ? "United States Patent"
              : "Patent Document"}
          </div>
        </div>

        <div className="text-right">
          <div
            className="
              text-[11px]
              font-medium
              uppercase
              tracking-[0.15em]
              text-slate-500
            "
          >
            {getValue(document.status)}
          </div>
        </div>
      </div>

      <h1
        className="
          mt-6
          text-center
          font-serif
          text-[26px]
          font-semibold
          leading-[1.28]
          tracking-tight
          text-slate-900
        "
      >
        {getValue(
          document.title,
          "Patent Claims"
        )}
      </h1>
    </header>
  );
}
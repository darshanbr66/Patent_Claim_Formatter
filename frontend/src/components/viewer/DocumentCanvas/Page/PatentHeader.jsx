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
    <header className="border-b border-slate-300 pb-10">
      <div className="flex items-start justify-between">
        <div>
          <div
            className="
              text-[34px]
              font-bold
              tracking-tight
              text-slate-900
            "
          >
            {patentNumber || getValue(document.type)}
          </div>

          <div
            className="
              mt-2
              text-[13px]
              font-medium
              uppercase
              tracking-[0.28em]
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
              text-[13px]
              font-medium
              uppercase
              tracking-[0.18em]
              text-slate-500
            "
          >
            {getValue(document.status)}
          </div>
        </div>
      </div>

      <h1
        className="
          mt-12
          text-center
          font-serif
          text-[32px]
          font-bold
          leading-[1.3]
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
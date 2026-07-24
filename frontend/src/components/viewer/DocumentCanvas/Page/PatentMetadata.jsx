export default function PatentMetadata({ document }) {
  if (!document) return null;

  console.log("Patent Metadata:", document);

  const getValue = (value) => {
    if (
      value === undefined ||
      value === null ||
      value === ""
    ) {
      return "—";
    }

    return value;
  };

  const rows = [
    ["Document Type", document.type],
    ["Processing Status", document.status],

    ["Application No.", document.applicationNumber],
    ["Application Date", document.applicationDate],

    ["Publication No.", document.publicationNumber],
    ["Publication Date", document.publicationDate],

    ["Patent Number", document.patentNumber],

    ["Kind Code", document.kind],

    ["Language", document.language],
  ];

  return (
    <section className="mt-10 mb-14">
      <div
        className="
          grid
          grid-cols-[190px_1fr]
          gap-y-3
          text-[15px]
        "
      >
        {rows.map(([label, value]) => (
          <div
            key={label}
            className="contents"
          >
            <div
              className="
                font-semibold
                text-slate-600
              "
            >
              {label}
            </div>

            <div className="text-slate-900">
              {getValue(value)}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 border-b border-slate-300" />
    </section>
  );
}
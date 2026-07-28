export default function PatentMetadata({ document }) {
  if (!document) return null;

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

  const getDocumentType = (type) => {
    switch (type) {
      case "USPTO_XML":
        return "USPTO XML";
      case "USPTO_PDF":
        return "USPTO PDF";
      case "EPO_XML":
        return "EPO XML";
      case "WIPO_XML":
        return "WIPO XML";
      default:
        return type || "—";
    }
  };

  const rows = [
    ["Document Type", getDocumentType(document.type)],
    ["Application No.", document.applicationNumber],
    ["Application Date", document.applicationDate],
    ["Publication Date", document.publicationDate],
    ["Patent Number", document.patentNumber],
    ["Kind Code", document.kind],
    ["Language", document.language],
  ];

  return (
    <section className="mt-7 mb-6">
      <div
        className="
          grid
          grid-cols-[170px_1fr]
          gap-y-2
          text-[14px]
          leading-6
        "
      >
        {rows.map(([label, value]) => (
          <div key={label} className="contents">
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

      <div className="mt-5 border-b border-slate-300" />
    </section>
  );
}
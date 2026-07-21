export default function PatentMetadata({ document }) {
  if (!document) return null;

  const rows = [
    ["Application No.", document.applicationNumber],
    ["Application Date", document.applicationDate],
    ["Publication No.", document.publicationNumber],
    ["Publication Date", document.publicationDate],
    ["Kind Code", document.kind],
    ["Language", document.language ?? "—"],
  ];

  return (
    <section className="mt-10 mb-14">
      <div className="grid grid-cols-[180px_1fr] gap-y-3 text-[15px]">
        {rows.map(([label, value]) => (
          <div key={label} className="contents">
            <div className="font-semibold text-slate-600">
              {label}
            </div>

            <div className="text-slate-900">
              {value}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 border-b border-slate-300" />
    </section>
  );
}
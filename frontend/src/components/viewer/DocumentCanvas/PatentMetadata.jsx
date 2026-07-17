export default function PatentMetadata({ document }) {
  if (!document) return null;

  const rows = [
    ["Application No.", document.applicationNumber],
    ["Application Date", document.applicationDate],
    ["Publication No.", document.publicationNumber],
    ["Publication Date", document.publicationDate],
    ["Kind Code", document.kind],
    ["Language", document.language],
  ];

  return (
    <section className="my-10">
      <table className="w-full border-collapse text-sm">
        <tbody>
          {rows.map(([label, value]) => (
            <tr
              key={label}
              className="border-b border-slate-200"
            >
              <td className="w-52 py-3 font-semibold text-slate-700">
                {label}
              </td>

              <td className="py-3">
                {value ?? "—"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}
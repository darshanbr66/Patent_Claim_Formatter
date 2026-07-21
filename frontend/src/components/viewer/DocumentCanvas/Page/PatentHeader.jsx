export default function PatentHeader({ document }) {
  if (!document) return null;

  return (
    <header className="border-b border-slate-300 pb-10">
      <div className="flex items-start justify-between">
        <div>
          <div className="text-[34px] font-bold tracking-tight text-slate-900">
            {document.country} {document.publicationNumber} {document.kind}
          </div>

          <div className="mt-2 text-[13px] font-medium uppercase tracking-[0.28em] text-slate-500">
            United States Patent
          </div>
        </div>

        <div className="text-right">
          <div className="text-[13px] font-medium uppercase tracking-[0.18em] text-slate-500">
            Grant Patent
          </div>
        </div>
      </div>

      <h1 className="mt-12 text-center font-serif text-[32px] font-bold leading-[1.3] text-slate-900">
        {document.title}
      </h1>
    </header>
  );
}
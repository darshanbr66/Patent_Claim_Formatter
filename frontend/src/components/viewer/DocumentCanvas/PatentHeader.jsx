export default function PatentHeader({ document }) {
  if (!document) return null;

  return (
    <header className="border-b border-slate-300 pb-8">
      <div className="flex justify-between items-start">
        <div>
          <div className="text-3xl font-bold tracking-wide">
            {document.country} {document.publicationNumber} {document.kind}
          </div>

          <div className="mt-2 text-sm uppercase tracking-[0.3em] text-slate-500">
            United States Patent
          </div>
        </div>

        <div className="text-right text-sm text-slate-500">
          Grant Patent
        </div>
      </div>

      <h1 className="mt-10 text-center text-4xl font-bold leading-tight">
        {document.title}
      </h1>
    </header>
  );
}
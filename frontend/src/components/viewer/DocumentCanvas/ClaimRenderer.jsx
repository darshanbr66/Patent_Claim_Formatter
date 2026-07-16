export default function ClaimRenderer({ claims = [] }) {
  if (claims.length === 0) {
    return (
      <div className="rounded-xl border border-dashed border-slate-300 bg-slate-50 px-8 py-12 text-center">
        <h3 className="text-lg font-semibold text-slate-700">
          No Claims Available
        </h3>

        <p className="mt-2 text-sm text-slate-500">
          The processed document does not contain any claims to display.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {claims.map((claim) => (
        <article
          key={claim.id}
          className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm"
        >
          <header className="mb-4 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-600 text-sm font-bold text-white">
              {claim.number}
            </div>

            <div>
              <h3 className="text-lg font-semibold text-slate-900">
                Claim {claim.number}
              </h3>

              <p className="text-sm text-slate-500">
                Patent Claim
              </p>
            </div>
          </header>

          <div className="border-t border-slate-200 pt-4">
            <p className="whitespace-pre-wrap text-[15px] leading-8 text-slate-700">
              {claim.text}
            </p>
          </div>
        </article>
      ))}
    </div>
  );
}
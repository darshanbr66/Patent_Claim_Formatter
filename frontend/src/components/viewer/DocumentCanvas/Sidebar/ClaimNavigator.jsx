export default function ClaimNavigator({
  claims = [],
  selectedClaimId,
  onSelectClaim,
}) {
  if (claims.length === 0) {
    return (
      <div className="p-6 text-center text-sm text-slate-500">
        No claims found.
      </div>
    );
  }

  return (
    <nav className="space-y-1 p-3">
      {claims.map((claim) => {
        const active = claim.id === selectedClaimId;

        return (
          <button
            key={claim.id}
            type="button"
            onClick={() => onSelectClaim?.(claim)}
            className={`
              flex
              w-full
              items-center
              gap-3
              rounded-lg
              px-3
              py-2
              text-left
              transition-colors
              ${
                active
                  ? "bg-blue-50 text-blue-700"
                  : "hover:bg-slate-100"
              }
            `}
          >
            <div
              className={`
                h-2.5
                w-2.5
                rounded-full
                ${
                  claim.isIndependent
                    ? "bg-blue-600"
                    : "bg-slate-300"
                }
              `}
            />

            <span className="w-8 font-semibold tabular-nums">
              {claim.number}
            </span>

            <span className="truncate text-sm text-slate-700">
              {claim.isIndependent
                ? "Independent Claim"
                : `Depends on Claim ${claim.dependentOn ?? "?"}`}
            </span>
          </button>
        );
      })}
    </nav>
  );
}
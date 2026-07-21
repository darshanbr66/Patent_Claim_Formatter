export default function ClaimNavigator({
  claims = [],
  selectedClaimId,
  onSelectClaim,
}) {
  if (claims.length === 0) {
    return (
      <div className="p-6 text-center text-sm text-slate-500">
        No claims available.
      </div>
    );
  }

  return (
    <nav className="p-3">
      <h3 className="mb-3 px-2 text-xs font-bold uppercase tracking-[0.18em] text-slate-500">
        Claims
      </h3>

      <div className="space-y-1">
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
              {/* Indicator */}
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

              {/* Claim Number */}
              <div className="w-8 font-semibold tabular-nums">
                {claim.number}
              </div>

              {/* Description */}
              <div className="min-w-0 flex-1">
                <div className="truncate text-sm">
                  {claim.isIndependent
                    ? "Independent Claim"
                    : `Depends on Claim ${claim.dependentOn ?? "-"}`}
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
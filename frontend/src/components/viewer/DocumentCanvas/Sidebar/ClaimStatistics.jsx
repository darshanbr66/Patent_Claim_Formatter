export default function ClaimStatistics({
  claims = [],
}) {
  const total = claims.length;

  const independent = claims.filter(
    (claim) => claim.isIndependent
  ).length;

  const dependent = total - independent;

  const references = claims.reduce(
    (count, claim) =>
      count + (claim.references?.length ?? 0),
    0
  );

  const stats = [
    {
      label: "Total Claims",
      value: total,
    },
    {
      label: "Independent",
      value: independent,
    },
    {
      label: "Dependent",
      value: dependent,
    },
    {
      label: "References",
      value: references,
    },
  ];

  return (
    <div>
      <h3 className="mb-4 text-xs font-bold uppercase tracking-[0.18em] text-slate-500">
        Patent Statistics
      </h3>

      <div className="space-y-3">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="flex items-center justify-between"
          >
            <span className="text-sm text-slate-600">
              {stat.label}
            </span>

            <span
              className="
                rounded-md
                bg-slate-100
                px-2.5
                py-1
                text-sm
                font-semibold
                text-slate-900
              "
            >
              {stat.value}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
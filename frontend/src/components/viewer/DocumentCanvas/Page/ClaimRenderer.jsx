import ClaimBlock from "./ClaimBlock";

export default function ClaimRenderer({ claims }) {
  // console.log("ClaimElementRenderer is rendering");
  if (!Array.isArray(claims) || claims.length === 0) {
    return null;
  }

  return (
    <section className="mt-12">
      <h2 className="mb-8 border-b border-slate-300 pb-3 text-2xl font-bold">
        Claims
      </h2>

      {claims.map((claim) => (
        <ClaimBlock
          key={claim.id}
          claim={claim}
        />
      ))}
    </section>
  );
}
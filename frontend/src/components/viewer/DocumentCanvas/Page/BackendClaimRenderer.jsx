import ClaimElementRenderer from "./ClaimElementRenderer";
import renderInlineContent from "./renderInlineContent";

export default function BackendClaimRenderer({
  claim,
  viewerState,
}) {
  if (!claim) return null;

  const searchTerm = viewerState?.searchTerm ?? "";

  return (
    <div
      className="
        font-serif
        text-[13.5px]
        font-normal
        leading-[1.52]
        tracking-[0.005em]
        text-slate-900
      "
    >
      {claim.header && (
        <p
          className="
            mt-0
            mb-[1px]
            whitespace-normal
            break-words
            leading-[1.5]
            text-justify
          "
        >
          {renderInlineContent({
            text: claim.header,
            references: claim.references,
            searchTerm,
          })}
        </p>
      )}

      {claim.elements?.map((element) => (
        <ClaimElementRenderer
          key={element.id}
          element={element}
          viewerState={viewerState}
        />
      ))}
    </div>
  );
}
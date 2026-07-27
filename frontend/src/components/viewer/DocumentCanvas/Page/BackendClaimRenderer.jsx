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
        font-normal
        text-[15px]
        leading-[1.7]
        text-slate-900
      "
    >
      {claim.header && (
        <div
          className="
            whitespace-pre-wrap
            break-words
          "
        >
          {renderInlineContent({
            text: claim.header,
            references: claim.references,
            searchTerm,
          })}
        </div>
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
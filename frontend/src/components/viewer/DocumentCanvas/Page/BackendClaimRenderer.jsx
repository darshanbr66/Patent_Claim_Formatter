import ClaimElementRenderer from "./ClaimElementRenderer";
import highlightText from "../../../../services/search/highlightText";

export default function BackendClaimRenderer({
  claim,
  viewerState,
}) {
  if (!claim) return null;

  const searchTerm = viewerState?.searchTerm ?? "";

  const headerParts = highlightText(
    claim.header ?? "",
    searchTerm
  );

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
          {headerParts.map((part, index) =>
            part.highlighted ? (
              <mark
                key={index}
                className="
                  rounded
                  bg-yellow-200
                  px-[1px]
                "
              >
                {part.text}
              </mark>
            ) : (
              <span key={index}>{part.text}</span>
            )
          )}
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
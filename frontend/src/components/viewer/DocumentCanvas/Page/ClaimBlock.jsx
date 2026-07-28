import ClaimNumber from "./ClaimNumber";
import ParagraphRenderer from "./ParagraphRenderer";
import BackendClaimRenderer from "./BackendClaimRenderer";

export default function ClaimBlock({
  claim,
  selected = false,
  searchTerm,
  searchResults,
}) {
  if (!claim) {
    return null;
  }

  const isBackendClaim = Array.isArray(claim.elements);

  return (
    <section
      id={`claim-${claim.number}`}
      className={`
        scroll-mt-24
        transition-colors
        duration-200
        ${
          selected
            ? "bg-blue-50/60"
            : ""
        }
      `}
    >
      <div
        className="
          flex
          items-start
          gap-2
        "
      >
        {/* Claim Number */}
        <div
          className="
            w-8
            shrink-0
            pt-[1px]
            text-right
            select-none
          "
        >
          <ClaimNumber number={claim.number} />
        </div>

        {/* Claim Content */}
        <div
          className="
            min-w-0
            flex-1
          "
        >
          {isBackendClaim ? (
            <BackendClaimRenderer
              claim={claim}
              viewerState={{
                searchTerm,
                searchResults,
              }}
            />
          ) : (
            claim.paragraphs?.map((paragraph, index) => (
              <ParagraphRenderer
                key={`${claim.id}-${index}`}
                paragraph={paragraph}
                level={0}
              />
            ))
          )}
        </div>
      </div>
    </section>
  );
}
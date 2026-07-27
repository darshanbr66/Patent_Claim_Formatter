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
        py-5
        first:pt-0
        transition-all
        duration-300
        rounded-lg
        ${
          selected
            ? "bg-blue-50 border-l-4 border-blue-500 shadow-sm px-3"
            : "border-l-4 border-transparent px-3"
        }
      `}
    >
      <div className="flex items-start">
        {/* Claim Number */}
        <div
          className="
            w-7
            shrink-0
            pr-1
            pt-[2px]
            text-right
            select-none
          "
        >
          <ClaimNumber number={claim.number} />
        </div>

        {/* Claim Body */}
        <div className="min-w-0 flex-1">
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
import ClaimNumber from "./ClaimNumber";
import ParagraphRenderer from "./ParagraphRenderer";

export default function ClaimBlock({ claim }) {
  if (!claim) {
    return null;
  }

  return (
    <section
      id={`claim-${claim.id}`}
      className="
        scroll-mt-24
        py-5
        first:pt-0
      "
    >
      <div className="flex items-start">
        {/* Fixed Claim Number Column */}
        <div
          className="
            w-12
            shrink-0
            pr-3
            text-right
            select-none
          "
        >
          <ClaimNumber number={claim.number} />
        </div>

        {/* Claim Body */}
        <div className="min-w-0 flex-1">
          {claim.paragraphs?.map((paragraph, index) => (
            <ParagraphRenderer
              key={`${claim.id}-${index}`}
              paragraph={paragraph}
              level={0}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
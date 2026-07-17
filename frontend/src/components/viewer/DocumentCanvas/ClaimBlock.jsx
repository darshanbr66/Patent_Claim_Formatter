import ClaimNumber from "./ClaimNumber";
import ParagraphRenderer from "./ParagraphRenderer";

export default function ClaimBlock({
  claim,
}) {
  if (!claim) {
    return null;
  }

  return (
    <section
      id={`claim-${claim.id}`}
      className="group mb-8 scroll-mt-24 rounded px-2 py-1 transition-colors hover:bg-slate-50"
    >
      <div className="flex">
        <ClaimNumber
          number={claim.number}
        />

        <div className="flex-1">
          {claim.paragraphs?.map((paragraph, index) => (
            <ParagraphRenderer
              key={index}
              paragraph={paragraph}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
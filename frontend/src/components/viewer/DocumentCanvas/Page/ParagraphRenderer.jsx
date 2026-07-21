import ClaimLimitation from "./ClaimLimitation";
import RunRenderer from "./RunRenderer";

export default function ParagraphRenderer({
  paragraph,
  level = 0,
}) {
  if (!paragraph) return null;

  return (
    <ClaimLimitation level={level}>
      <div
        className="
          font-serif
          text-[16px]
          leading-[1.75]
          text-slate-900
          whitespace-pre-wrap
          break-words
          text-justify
        "
      >
        {paragraph.ast?.map((node, index) => (
          <RunRenderer
            key={index}
            run={node}
          />
        ))}
      </div>
    </ClaimLimitation>
  );
}
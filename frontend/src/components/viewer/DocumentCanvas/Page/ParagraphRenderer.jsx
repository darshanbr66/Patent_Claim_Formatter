import ClaimLimitation from "./ClaimLimitation";
import RunRenderer from "./RunRenderer";

export default function ParagraphRenderer({
  paragraph,
  level = 0,
}) {
  if (!paragraph) return null;

  const hasAst =
    Array.isArray(paragraph.ast) &&
    paragraph.ast.length > 0;

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
        {hasAst ? (
          paragraph.ast.map((node, index) => (
            <RunRenderer
              key={index}
              run={node}
            />
          ))
        ) : (
          paragraph.text
        )}
      </div>
    </ClaimLimitation>
  );
}
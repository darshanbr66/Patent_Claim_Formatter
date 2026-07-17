import ClaimLimitation from "./ClaimLimitation";
import RunRenderer from "./RunRenderer";

export default function ParagraphRenderer({
  paragraph,
  level = 0,
}) {
  if (!paragraph) return null;

  console.log("Paragraph AST:", paragraph.ast);

  return (
    <ClaimLimitation level={level}>
      <div className="leading-8 text-[15px] text-slate-900">

        {/* Temporary debug */}
        

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
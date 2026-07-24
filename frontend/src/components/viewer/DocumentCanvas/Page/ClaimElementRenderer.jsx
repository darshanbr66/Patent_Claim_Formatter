import ClaimLimitation from "./ClaimLimitation";
import highlightText from "../../../../services/search/highlightText";

export default function ClaimElementRenderer({
  element,
  viewerState,
}) {
  if (!element) return null;

  const hasChildren =
    Array.isArray(element.children) &&
    element.children.length > 0;

  const searchTerm = viewerState?.searchTerm ?? "";

  const parts = highlightText(
    element.text ?? "",
    searchTerm
  );

  return (
    <ClaimLimitation level={element.level ?? 0}>
      <div
        className="
          mt-1
          first:mt-0
          whitespace-pre-wrap
          break-words
        "
      >
        <div className="flex items-start">
          {element.marker && (
            <span
              className="
                mr-2
                min-w-[28px]
                shrink-0
                font-semibold
                text-slate-700
              "
            >
              {element.marker}
            </span>
          )}

          <span className="flex-1 font-normal">
            {parts.map((part, index) =>
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
                <span key={index}>
                  {part.text}
                </span>
              )
            )}
          </span>
        </div>

        {hasChildren && (
          <div className="mt-0.5">
            {element.children.map((child) => (
              <ClaimElementRenderer
                key={child.id}
                element={child}
                viewerState={viewerState}
              />
            ))}
          </div>
        )}
      </div>
    </ClaimLimitation>
  );
}
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
      <p
        className="
          mt-[2px]
          mb-[2px]
          whitespace-normal
          break-words
          text-justify
          font-serif
          text-[13.5px]
          font-normal
          leading-[1.5]

          pl-[18px]
          -indent-[10px]
        "
      >
        {element.marker && (
          <span className="font-medium text-slate-800">
            {element.marker}{" "}
          </span>
        )}

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
      </p>

      {hasChildren &&
        element.children.map((child) => (
          <ClaimElementRenderer
            key={child.id}
            element={child}
            viewerState={viewerState}
          />
        ))}
    </ClaimLimitation>
  );
}
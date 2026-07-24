/**
 * Splits text into highlighted and non-highlighted segments.
 *
 * Returns an array like:
 * [
 *   { text: "The ", highlighted: false },
 *   { text: "processor", highlighted: true },
 *   { text: " receives input.", highlighted: false }
 * ]
 */
export default function highlightText(
  text,
  query
) {
  if (!text) {
    return [];
  }

  const term = query.trim();

  if (!term) {
    return [
      {
        text,
        highlighted: false,
      },
    ];
  }

  const regex = new RegExp(
    `(${escapeRegExp(term)})`,
    "gi"
  );

  return text
    .split(regex)
    .filter(Boolean)
    .map((part) => ({
      text: part,
      highlighted:
        part.toLowerCase() ===
        term.toLowerCase(),
    }));
}

/**
 * Escapes regex special characters.
 */
function escapeRegExp(value) {
  return value.replace(
    /[.*+?^${}()|[\]\\]/g,
    "\\$&"
  );
}
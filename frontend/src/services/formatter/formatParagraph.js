/**
 * Format parsed paragraph for renderer.
 */
export function formatParagraph(paragraph) {
  if (!paragraph) {
    return null;
  }

  return {
    type: "paragraph",

    id: paragraph.id ?? null,

    text: paragraph.text ?? "",

    ast: paragraph.ast ?? [],

    references: paragraph.references ?? [],
  };
}

export default formatParagraph;
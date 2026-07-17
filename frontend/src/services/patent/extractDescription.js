import {
  get,
  toArray,
  getText,
} from "../parser/parserHelpers";

import {
  parseParagraph,
} from "../parser/richText";

/**
 * Extract patent description.
 *
 * Version 1:
 * - Headings
 * - Paragraphs
 * - Preserve order
 */
export function extractDescription(root) {
  const descriptionNode = get(root, "description");

  if (!descriptionNode) {
    return null;
  }

  const headings = toArray(
    get(descriptionNode, "heading")
  )
    .map((heading) => ({
      type: "heading",
      text: getText(heading)?.trim() ?? "",
    }))
    .filter((heading) => heading.text);

  const paragraphs = toArray(
    get(descriptionNode, "p")
  )
    .map(parseParagraph)
    .filter(Boolean);

  const references = paragraphs.flatMap(
    (paragraph) => paragraph.references
  );

  const content = [];

  let headingIndex = 0;
  let paragraphIndex = 0;

  /**
   * Version 1
   *
   * USPTO XML does not explicitly associate
   * headings with paragraphs.
   *
   * We preserve both collections while also
   * exposing a simple ordered content array.
   */
  while (
    headingIndex < headings.length ||
    paragraphIndex < paragraphs.length
  ) {
    if (headingIndex < headings.length) {
      content.push(headings[headingIndex++]);
    }

    if (paragraphIndex < paragraphs.length) {
      content.push(paragraphs[paragraphIndex++]);
    }
  }

  return {
    type: "description",

    headings,

    paragraphs,

    content,

    text: paragraphs
      .map((paragraph) => paragraph.text)
      .join("\n\n"),

    references,
  };
}
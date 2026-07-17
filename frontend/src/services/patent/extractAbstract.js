import {
  get,
  toArray,
} from "../parser/parserHelpers";

import {
  parseParagraph,
} from "../parser/richText";

/**
 * Extract patent abstract.
 *
 * @param {object} root
 */
export function extractAbstract(root) {
  const abstractNode = get(root, "abstract");

  if (!abstractNode) {
    return null;
  }

  const paragraphs = toArray(
    get(abstractNode, "p")
  )
    .map(parseParagraph)
    .filter(Boolean);

  const references = paragraphs.flatMap(
    (paragraph) => paragraph.references
  );

  return {
    type: "abstract",

    paragraphs,

    text: paragraphs
      .map((paragraph) => paragraph.text)
      .join("\n\n"),

    references,
  };
}
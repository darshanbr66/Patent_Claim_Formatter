import parseMixedContent from "./mixedContentParser";

/**
 * Parse inline content.
 *
 * This is intentionally a thin wrapper.
 * All mixed-content parsing is delegated to mixedContentParser.
 */
export function parseInline(node) {
  if (!node) {
    return [];
  }

  return parseMixedContent(node);
}

export default parseInline;
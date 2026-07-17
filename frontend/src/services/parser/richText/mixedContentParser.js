import buildRichTextAst from "./richTextAstBuilder";

export function parseMixedContent(node) {
  if (!node) {
    return [];
  }

  return buildRichTextAst(node);
}

export default parseMixedContent;
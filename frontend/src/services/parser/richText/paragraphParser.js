import buildRichTextAst from "./richTextAstBuilder";

/**
 * Recursively collect references from the AST.
 */
function collectReferences(nodes = [], references = []) {
  nodes.forEach((node) => {
    if (node.type === "reference") {
      references.push(node.reference);
    }

    if (node.children) {
      collectReferences(node.children, references);
    }
  });

  return references;
}

/**
 * Recursively build plain text.
 * (Used only for searching/filtering, NOT for rendering.)
 */
function buildPlainText(nodes = []) {
  return nodes
    .map((node) => {
      switch (node.type) {
        case "text":
          return node.text ?? "";

        case "reference":
          return node.reference?.text ?? "";

        case "paragraph":
          return buildPlainText(node.children);

        case "bold":
        case "italic":
        case "underline":
        case "superscript":
        case "subscript":
          return buildPlainText(node.children);

        default:
          return "";
      }
    })
    .join("");
}

export function parseParagraph(node) {
  if (!node) {
    return null;
  }

  const ast = buildRichTextAst(node);

  return {
    id: node["@_id"] ?? null,

    text: buildPlainText(ast).trim(),

    ast,

    references: collectReferences(ast),
  };
}

export default parseParagraph;
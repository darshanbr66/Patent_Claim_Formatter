import { parseReference } from "./referenceParser";

function asArray(value) {
  if (!value) return [];
  return Array.isArray(value) ? value : [value];
}

function normalizeText(text, isFirstText = false) {
  if (!text) return "";

  let value = String(text);

  // Decode the remaining degree entity if present.
  value = value.replace(/&#xb0;/gi, "°");

  // Normalize whitespace.
  value = value.replace(/\s+/g, " ");

  // Remove the XML claim number because the UI already renders it.
  if (isFirstText) {
    value = value.replace(/^\s*\d+\.\s*/, "");
  }

  return value;
}

function addText(nodes, value, isFirstText = false) {
  const text = normalizeText(value, isFirstText);

  if (!text.trim()) return;

  nodes.push({
    type: "text",
    text,
  });
}

function buildReference(type, value) {
  return {
    type: "reference",
    reference: parseReference(type, value),
  };
}

function buildFormatting(type, value) {
  return {
    type,
    children: buildRichTextAst(value),
  };
}

export function buildRichTextAst(node) {
  if (!node) {
    return [];
  }

  if (typeof node === "string") {
    return [
      {
        type: "text",
        text: node,
      },
    ];
  }

  const nodes = [];


  // Plain text
  asArray(node["#text"]).forEach((text, index) => {
    addText(nodes, text, nodes.length === 0 && index === 0);
  });

  // References
  asArray(node["claim-ref"]).forEach((ref) => {
    nodes.push(buildReference("claim-ref", ref));
  });

  asArray(node["figref"]).forEach((ref) => {
    nodes.push(buildReference("figref", ref));
  });

  asArray(node["table-ref"]).forEach((ref) => {
    nodes.push(buildReference("table-ref", ref));
  });

  // Formatting
  asArray(node.b).forEach((child) => {
    nodes.push(buildFormatting("bold", child));
  });

  asArray(node.i).forEach((child) => {
    nodes.push(buildFormatting("italic", child));
  });

  asArray(node.u).forEach((child) => {
    nodes.push(buildFormatting("underline", child));
  });

  asArray(node.sup).forEach((child) => {
    nodes.push(buildFormatting("superscript", child));
  });

  asArray(node.sub).forEach((child) => {
    nodes.push(buildFormatting("subscript", child));
  });

  // Nested claim-text (THIS IS THE IMPORTANT PART)
  asArray(node["claim-text"]).forEach((child) => {
    nodes.push({
      type: "paragraph",
      children: buildRichTextAst(child),
    });
  });

  return nodes;
}

export default buildRichTextAst;
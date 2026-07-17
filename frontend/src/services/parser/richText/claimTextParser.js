import { parseParagraph } from "./paragraphParser";

export function parseClaimText(node) {
  if (!node) {
    return null;
  }

  console.log("CLAIM NODE:", node);

  const paragraph = parseParagraph(node);

  console.log("PARAGRAPH:", paragraph);

  return paragraph;
}

export default parseClaimText;
import { XMLParser } from "fast-xml-parser";

const parser = new XMLParser({
  ignoreAttributes: false,
  attributeNamePrefix: "@_",

  parseAttributeValue: true,
  trimValues: true,

  allowBooleanAttributes: true,

  ignoreDeclaration: true,
  ignorePiTags: true,
  processEntities: true,

  isArray: () => false,
});

/**
 * Parse a USPTO XML string into a JavaScript object.
 *
 * @param {string} xmlString
 * @returns {object}
 */
export function parsePatentXml(xmlString) {
  if (!xmlString || typeof xmlString !== "string") {
    throw new Error("A valid XML string is required.");
  }

  try {
    return parser.parse(xmlString);
  } catch (error) {
    throw new Error(`Failed to parse XML: ${error.message}`);
  }
}
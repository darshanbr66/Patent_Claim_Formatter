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
    const parsed = parser.parse(xmlString);

    console.log(
      "CLAIM 2:",
      JSON.stringify(
        parsed["us-patent-grant"].claims.claim[1]["claim-text"],
        null,
        2
      )
    );

    return parsed;
  } catch (error) {
    throw new Error(`Failed to parse XML: ${error.message}`);
  }
}

export default parsePatentXml;
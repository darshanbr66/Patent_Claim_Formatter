import { parsePatentXml } from "./xmlParser";

/**
 * Debug helper for inspecting the parsed USPTO XML structure.
 * Remove this file after the parser is finalized.
 */
export function debugPatentXml(xmlString) {
  const parsed = parsePatentXml(xmlString);

  console.group("USPTO XML Parser");

  console.log("Parsed Object:");
  console.log(parsed);

  console.log("Top Level Keys:");
  console.log(Object.keys(parsed));

  console.groupEnd();

  return parsed;
}
/**
 * Returns the USPTO patent root node.
 */
export function getPatentRoot(parsedXml) {
  if (parsedXml["us-patent-grant"]) {
    return parsedXml["us-patent-grant"];
  }

  if (parsedXml["us-patent-application"]) {
    return parsedXml["us-patent-application"];
  }

  throw new Error("Unsupported USPTO patent document.");
}

/**
 * Returns the bibliographic section.
 */
export function getBibliographic(root) {
  return (
    root["us-bibliographic-data-grant"] ??
    root["us-bibliographic-data-application"] ??
    {}
  );
}

/**
 * Safely reads a nested property.
 */
export function get(object, path, defaultValue = null) {
  const value = path
    .split(".")
    .reduce((current, key) => current?.[key], object);

  return value ?? defaultValue;
}

/**
 * Always returns an array.
 */
export function toArray(value) {
  if (!value) return [];

  return Array.isArray(value) ? value : [value];
}

/**
 * Returns plain text from XML nodes.
 */
export function getText(value) {
  if (value == null) {
    return null;
  }

  if (typeof value === "string") {
    return value;
  }

  if (typeof value === "number") {
    return String(value);
  }

  if (typeof value === "object") {
    return value["#text"] ?? null;
  }

  return null;
}
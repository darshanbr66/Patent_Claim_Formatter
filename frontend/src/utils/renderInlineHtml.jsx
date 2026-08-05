import React from "react";

export default function renderInlineHtml(text = "") {
  if (!text) return null;

  const parser = new DOMParser();
  const doc = parser.parseFromString(text, "text/html");

  function convert(node, key) {
    if (node.nodeType === Node.TEXT_NODE) {
      return node.textContent;
    }

    if (node.nodeType !== Node.ELEMENT_NODE) {
      return null;
    }

    const children = Array.from(node.childNodes).map((child, index) =>
      convert(child, `${key}-${index}`)
    );

    switch (node.tagName.toLowerCase()) {
      case "sub":
        return <sub key={key}>{children}</sub>;

      case "sup":
        return <sup key={key}>{children}</sup>;

      default:
        return (
          <React.Fragment key={key}>
            {children}
          </React.Fragment>
        );
    }
  }

  return Array.from(doc.body.childNodes).map((node, index) =>
    convert(node, index)
  );
}
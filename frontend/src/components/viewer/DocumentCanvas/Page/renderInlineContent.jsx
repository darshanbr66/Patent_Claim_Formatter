import React from "react";
import highlightText from "../../../../services/search/highlightText";
import ClaimReference from "./ClaimReference";

export default function renderInlineContent({
  text = "",
  references = [],
  searchTerm = "",
}) {
  if (!text) {
    return null;
  }

  // First apply search highlighting
  const highlightedParts = highlightText(text, searchTerm);

  const output = [];

  highlightedParts.forEach((part, partIndex) => {
    const partText = part.text;

    if (!part.highlighted && references.length > 0) {
      let remaining = partText;
      let localIndex = 0;

      references.forEach((reference) => {
        const match = remaining.indexOf(reference.text);

        if (match === -1) {
          return;
        }

        if (match > 0) {
          output.push(
            <React.Fragment key={`txt-${partIndex}-${localIndex}`}>
              {remaining.slice(0, match)}
            </React.Fragment>
          );
        }

        output.push(
          <ClaimReference
            key={`ref-${partIndex}-${reference.claim_number}`}
            reference={reference}
          />
        );

        remaining = remaining.slice(match + reference.text.length);
        localIndex++;
      });

      if (remaining) {
        output.push(
          <React.Fragment key={`tail-${partIndex}`}>
            {remaining}
          </React.Fragment>
        );
      }
    } else if (part.highlighted) {
      output.push(
        <mark
          key={`mark-${partIndex}`}
          className="rounded bg-yellow-200 px-[1px]"
        >
          {partText}
        </mark>
      );
    } else {
      output.push(
        <React.Fragment key={`plain-${partIndex}`}>
          {partText}
        </React.Fragment>
      );
    }
  });

  return output;
}
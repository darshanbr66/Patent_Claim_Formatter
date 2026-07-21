import { Paragraph, AlignmentType } from "docx";
import buildRuns from "./buildRuns";

/**
 * Build a DOCX paragraph from a formatted paragraph.
 */
export function buildParagraph(
  paragraph,
  {
    prefixRuns = [],
    alignment = AlignmentType.LEFT,
    leftIndent = 0,
    hanging = 0,
  } = {}
) {
  if (!paragraph) {
    return null;
  }

  return new Paragraph({
    children: [
      ...prefixRuns,
      ...buildRuns(paragraph.ast ?? []),
    ],

    alignment,

    spacing: {
      before: 60,
      after: 60,
      line: 360,
    },

    indent: {
      left: leftIndent,
      hanging,
    },
  });
}

export default buildParagraph;
import { Paragraph, TextRun } from "docx";
import buildParagraph from "./buildParagraph";

/**
 * Build all patent claims.
 */
export function buildClaims(claims = []) {
  const paragraphs = [];

  paragraphs.push(
    new Paragraph({
      spacing: {
        before: 240,
        after: 240,
      },
      children: [
        new TextRun({
          text: "CLAIMS",
          bold: true,
          size: 28,
        }),
      ],
    })
  );

  claims.forEach((claim) => {
    (claim.paragraphs ?? []).forEach((paragraph, index) => {
      paragraphs.push(
        buildParagraph(paragraph, {
          prefixRuns:
            index === 0
              ? [
                  new TextRun({
                    text: `${claim.number}. `,
                    bold: true,
                  }),
                ]
              : [],

          leftIndent: 720,

          hanging: index === 0 ? 360 : 0,
        })
      );
    });

    paragraphs.push(new Paragraph({}));
  });

  return paragraphs;
}

export default buildClaims;
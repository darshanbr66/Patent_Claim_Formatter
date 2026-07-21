import { Paragraph, TextRun, AlignmentType } from "docx";

/**
 * Build patent document header.
 */
export function buildHeader(document) {
  if (!document) {
    return [];
  }

  return [
    new Paragraph({
      alignment: AlignmentType.CENTER,
      spacing: {
        after: 120,
      },
      children: [
        new TextRun({
          text: "UNITED STATES PATENT",
          bold: true,
          size: 28,
        }),
      ],
    }),

    new Paragraph({
      alignment: AlignmentType.CENTER,
      spacing: {
        after: 120,
      },
      children: [
        new TextRun({
          text: `${document.country ?? ""} ${document.publicationNumber ?? ""} ${document.kind ?? ""}`.trim(),
          bold: true,
          size: 36,
        }),
      ],
    }),

    new Paragraph({
      alignment: AlignmentType.CENTER,
      spacing: {
        after: 360,
      },
      children: [
        new TextRun({
          text: document.title ?? "",
          bold: true,
          size: 30,
        }),
      ],
    }),
  ];
}

export default buildHeader;
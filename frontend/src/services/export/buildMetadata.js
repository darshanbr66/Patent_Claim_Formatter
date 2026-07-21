import { Paragraph, Table, TableRow, TableCell, TextRun, WidthType } from "docx";

/**
 * Build patent metadata table.
 */
export function buildMetadata(document) {
  if (!document) {
    return [];
  }

  const rows = [
    ["Application No.", document.applicationNumber],
    ["Application Date", document.applicationDate],
    ["Publication No.", document.publicationNumber],
    ["Publication Date", document.publicationDate],
    ["Kind Code", document.kind],
    ["Language", document.language ?? "—"],
  ];

  return [
    new Table({
      width: {
        size: 100,
        type: WidthType.PERCENTAGE,
      },

      rows: rows.map(([label, value]) => {
        return new TableRow({
          children: [
            new TableCell({
              width: {
                size: 30,
                type: WidthType.PERCENTAGE,
              },
              children: [
                new Paragraph({
                  children: [
                    new TextRun({
                      text: label,
                      bold: true,
                    }),
                  ],
                }),
              ],
            }),

            new TableCell({
              width: {
                size: 70,
                type: WidthType.PERCENTAGE,
              },
              children: [
                new Paragraph({
                  children: [
                    new TextRun({
                      text: value ? String(value) : "—",
                    }),
                  ],
                }),
              ],
            }),
          ],
        });
      }),
    }),

    new Paragraph({
      spacing: {
        after: 250,
      },
    }),
  ];
}

export default buildMetadata;
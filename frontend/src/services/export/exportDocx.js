import { Packer } from "docx";
import { saveAs } from "file-saver";

import buildDocument from "./buildDocument";

/**
 * Generate and download a DOCX patent document.
 *
 * @param {object} patent
 */
export async function exportDocx(patent) {
  if (!patent) {
    throw new Error("Patent data is required.");
  }

  const document = buildDocument(patent);

  const blob = await Packer.toBlob(document);

  const publicationNumber =
    patent.document?.publicationNumber ?? "patent";

  saveAs(blob, `${publicationNumber}.docx`);
}

export default exportDocx;
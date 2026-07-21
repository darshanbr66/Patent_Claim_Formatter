import { TextRun } from "docx";

/**
 * Convert AST nodes into DOCX TextRuns.
 */
export function buildRuns(nodes = []) {
  const runs = [];

  function visit(node) {
    if (!node) return;

    switch (node.type) {
      case "text":
        runs.push(
          new TextRun({
            text: node.text ?? "",
          })
        );
        break;

      case "reference":
        runs.push(
          new TextRun({
            text: node.reference?.text ?? "",
            color: "0563C1",
            underline: {},
          })
        );
        break;

      case "bold":
        (node.children ?? []).forEach((child) => {
          runs.push(
            new TextRun({
              text: child.text ?? "",
              bold: true,
            })
          );
        });
        break;

      case "italic":
        (node.children ?? []).forEach((child) => {
          runs.push(
            new TextRun({
              text: child.text ?? "",
              italics: true,
            })
          );
        });
        break;

      case "underline":
        (node.children ?? []).forEach((child) => {
          runs.push(
            new TextRun({
              text: child.text ?? "",
              underline: {},
            })
          );
        });
        break;

      case "superscript":
        (node.children ?? []).forEach((child) => {
          runs.push(
            new TextRun({
              text: child.text ?? "",
              superScript: true,
            })
          );
        });
        break;

      case "subscript":
        (node.children ?? []).forEach((child) => {
          runs.push(
            new TextRun({
              text: child.text ?? "",
              subScript: true,
            })
          );
        });
        break;

      case "paragraph":
        (node.children ?? []).forEach(visit);
        break;

      default:
        if (Array.isArray(node.children)) {
          node.children.forEach(visit);
        }
    }
  }

  nodes.forEach(visit);

  return runs;
}

export default buildRuns;
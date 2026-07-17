/**
 * Converts parser runs into renderer-friendly runs.
 *
 * This layer isolates the React UI from the parser.
 * Later we can support:
 *  - bold
 *  - italic
 *  - underline
 *  - superscript
 *  - subscript
 *  - hyperlinks
 *  - claim references
 *  - figure references
 */
export function formatRuns(runs = []) {
  return runs.map((run) => {
    switch (run.type) {
      case "text":
        return {
          type: "text",
          text: run.value,
        };

      case "bold":
        return {
          type: "bold",
          text: run.value,
        };

      case "italic":
        return {
          type: "italic",
          text: run.value,
        };

      case "underline":
        return {
          type: "underline",
          text: run.value,
        };

      case "superscript":
        return {
          type: "superscript",
          text: run.value,
        };

      case "subscript":
        return {
          type: "subscript",
          text: run.value,
        };

      case "reference":
        return {
          type: "reference",
          reference: run.reference,
        };

      case "line-break":
        return {
          type: "line-break",
        };

      default:
        return run;
    }
  });
}

export default formatRuns;
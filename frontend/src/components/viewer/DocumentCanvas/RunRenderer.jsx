import ClaimReference from "./ClaimReference";

export default function RunRenderer({ run }) {
  if (!run) {
    return null;
  }

  function renderChildren(children = []) {
    return children.map((child, index) => (
      <RunRenderer
        key={index}
        run={child}
      />
    ));
  }

  switch (run.type) {
    case "text":
      return <>{run.text}</>;

    case "reference":
      return (
        <ClaimReference
          reference={run.reference}
        />
      );

    case "bold":
      return (
        <strong>
          {renderChildren(run.children)}
        </strong>
      );

    case "italic":
      return (
        <em>
          {renderChildren(run.children)}
        </em>
      );

    case "underline":
      return (
        <u>
          {renderChildren(run.children)}
        </u>
      );

    case "superscript":
      return (
        <sup>
          {renderChildren(run.children)}
        </sup>
      );

    case "subscript":
      return (
        <sub>
          {renderChildren(run.children)}
        </sub>
      );

    case "paragraph":
      return (
        <div className="mt-2 ml-8">
          {renderChildren(run.children)}
        </div>
      );

    case "line-break":
      return <br />;

    default:
      return null;
  }
}
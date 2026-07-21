import { useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";

import { useDocument } from "../../context/DocumentContext";

import { formatPatent } from "../../services/formatter";

import ViewerToolbar from "./ViewerToolbar/ViewerToolbar";
import ProcessingSummary from "./ProcessingSummary";
import DocumentCanvas from "./DocumentCanvas/DocumentCanvas";
import StatusBar from "./StatusBar";
import { exportDocx } from "../../services/export";

export default function ViewerPage() {
  const navigate = useNavigate();

  const {
    documentState,
    resetDocument,
  } = useDocument();

  const { result } = documentState;

  useEffect(() => {
    if (!result) {
      navigate("/", { replace: true });
    }
  }, [result, navigate]);

  if (!result) {
    return null;
  }

  const formattedPatent = useMemo(
    () => formatPatent(result),
    [result]
  );

  const handleUploadAnother = () => {
    resetDocument();
    navigate("/", { replace: true });
  };

  const handleDownload = async () => {
    try {
      await exportDocx(formattedPatent);
    } catch (error) {
      console.error(error);

      alert("Failed to export DOCX.");
    }
  };

  const handleZoomChange = (zoom) => {
    console.info("Selected zoom:", zoom);
  };

  return (
    <section
      className="
        flex
        flex-col
        gap-4
      "
    >
      <ViewerToolbar
        document={result.document}
        metadata={result.metadata}
        onUploadAnother={handleUploadAnother}
        onDownload={handleDownload}
        zoom={100}
        onZoomChange={handleZoomChange}
        downloadDisabled={false}
        zoomDisabled
      />

      <ProcessingSummary
        document={result.document}
        metadata={result.metadata}
      />

      <div
        className="
          h-[calc(100vh-230px)]
          min-h-[650px]
          overflow-hidden
        "
      >
        <DocumentCanvas
          patent={formattedPatent}
        />
      </div>

      <div className="pt-4">
        <StatusBar
          document={result.document}
          metadata={result.metadata}
        />
      </div>
    </section>
  );
}
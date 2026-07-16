import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { useDocument } from "../../context/DocumentContext";

import ViewerToolbar from "./ViewerToolbar/ViewerToolbar";
import ProcessingSummary from "./ProcessingSummary";
import DocumentCanvas from "./DocumentCanvas/DocumentCanvas";
import StatusBar from "./StatusBar";

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

  const handleUploadAnother = () => {
    resetDocument();
    navigate("/", { replace: true });
  };

  const handleDownload = () => {
    console.info(
      "PDF download will be implemented after backend integration."
    );
  };

  const handleZoomChange = (zoom) => {
    console.info("Selected zoom:", zoom);
  };

  return (
    <section className="mx-auto flex w-full max-w-7xl flex-col gap-6">
      <ViewerToolbar
        document={result.document}
        metadata={result.metadata}
        onUploadAnother={handleUploadAnother}
        onDownload={handleDownload}
        zoom={100}
        onZoomChange={handleZoomChange}
        downloadDisabled={true}
        zoomDisabled={true}
      />

      <ProcessingSummary
        document={result.document}
        metadata={result.metadata}
      />

      <DocumentCanvas
        claims={result.claims}
      />

      <StatusBar
        document={result.document}
        metadata={result.metadata}
      />
    </section>
  );
}
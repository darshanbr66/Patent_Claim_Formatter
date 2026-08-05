import { useEffect, useMemo, useRef, useState } from "react";

import { useNavigate } from "react-router-dom";

import { useDocument } from "../../context/DocumentContext";

import { formatPatent } from "../../services/formatter";

import ViewerToolbar from "./ViewerToolbar/ViewerToolbar";
import ProcessingSummary from "./ProcessingSummary";
import DocumentCanvas from "./DocumentCanvas/DocumentCanvas";
import StatusBar from "./StatusBar";
import { downloadPatentPdf } from "../../api/patentApi";

export default function ViewerPage() {
 
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);
  const topSectionRef = useRef(null);
  const [topSectionHeight, setTopSectionHeight] = useState(0);
  const [downloading, setDownloading] = useState(false);

  const {
    documentState,
    resetDocument,

    searchTerm,
    setSearchTerm,
    searchResults,
  } = useDocument();

  const { result } = documentState;

  useEffect(() => {
    if (!result) {
      navigate("/", { replace: true });
    }
  }, [result, navigate]);

  useEffect(() => {
    if (!topSectionRef.current) return;

    const updateHeight = () => {
      setTopSectionHeight(topSectionRef.current.offsetHeight);
    };

    updateHeight();

    const observer = new ResizeObserver(updateHeight);
    observer.observe(topSectionRef.current);

    return () => observer.disconnect();
  }, []);

  const formattedPatent = useMemo(() => {
    return result ? formatPatent(result) : null;
  }, [result]);

  if (!formattedPatent) {
    return null;
  }

  const handleUploadAnother = () => {
    resetDocument();
    navigate("/", { replace: true });
  };

  const handleDownload = async () => {
  try {
    setDownloading(true);
    // XML file uploaded by the user
    const xmlFile = documentState.file;

    if (!xmlFile) {
      alert("No XML file found.");
      return;
    }

    const response = await downloadPatentPdf(xmlFile);

    const url = window.URL.createObjectURL(response.data);

    const link = document.createElement("a");

    // Default filename
    let filename = "Patent.pdf";

    // Read filename from Content-Disposition header
    const disposition = response.headers["content-disposition"];

    if (disposition) {
      const match =
        disposition.match(/filename\*?=(?:UTF-8'')?"?([^";]+)"?/);

      if (match?.[1]) {
        filename = decodeURIComponent(match[1]);
      }
    }

    link.href = url;
    link.download = filename;

    document.body.appendChild(link);
    link.click();

    document.body.removeChild(link);

    window.URL.revokeObjectURL(url);
  } catch (error) {
    console.error(error);
    alert("Failed to download PDF.");
  }finally {
    setDownloading(false);
  }
};

  const handleZoomChange = (zoom) => {
    console.info("Selected zoom:", zoom);
  };

  //  console.log("Backend result:", result);
  //  console.log("Statistics:", formattedPatent.statistics);

  const handleDocumentScroll = (scrollTop) => {
    setCollapsed(scrollTop > 20);
  };

  return (
    <section
  className={`
    flex
    w-full
    min-w-0
    flex-col
    ${collapsed ? "gap-0" : "gap-4"}
  `}
>

      <div
        ref={topSectionRef}
        className={`
          overflow-hidden
          transition-[max-height,opacity]
          duration-300
          ease-in-out
          ${collapsed ? "max-h-0 opacity-0" : "max-h-[600px] opacity-100"}
        `}
      >
        <ViewerToolbar
          document={formattedPatent.document}
          metadata={formattedPatent.metadata}
          statistics={formattedPatent.statistics}
          claims={formattedPatent.claims}
          onUploadAnother={handleUploadAnother}
          onDownload={handleDownload}
          zoom={100}
          onZoomChange={handleZoomChange}
          downloadDisabled={false}
          downloadLoading={downloading}
          zoomDisabled
        />

        <div className="mt-4">
          <ProcessingSummary
            document={formattedPatent.document}
            statistics={formattedPatent.statistics}
            claims={formattedPatent.claims}
            metadata={formattedPatent.metadata}
          />
        </div>
      </div>

      <div
        style={{
          height: collapsed
            ? "calc(100vh - 64px)"
            : `calc(100vh - ${64 + topSectionHeight}px)`,
        }}
        className="
          mt-0
          overflow-hidden
          transition-[height]
          duration-300
          ease-in-out
        "
      >
        <DocumentCanvas
          patent={formattedPatent}
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          searchResults={searchResults}
          onScroll={handleDocumentScroll}
        />
      </div>

    </section>
  );
}
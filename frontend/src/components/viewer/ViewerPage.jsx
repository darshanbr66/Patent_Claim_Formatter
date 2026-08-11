import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import { useNavigate } from "react-router-dom";

import { useDocument } from "../../context/DocumentContext";

import { formatPatent } from "../../services/formatter";

import ViewerToolbar from "./ViewerToolbar/ViewerToolbar";
import ProcessingSummary from "./ProcessingSummary";
import DocumentCanvas from "./DocumentCanvas/DocumentCanvas";
import StatusBar from "./StatusBar";
import { downloadPatentPdf } from "../../api/patentApi";

import {
  getFile,
  clearFile,
} from "../../utils/fileStorage";

export default function ViewerPage() {
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);
  const topSectionRef = useRef(null);
  const [topSectionHeight, setTopSectionHeight] =
    useState(0);
  const [downloading, setDownloading] =
    useState(false);

  const {
    documentState,
    setDocumentState,
    resetDocument,

    searchTerm,
    setSearchTerm,
    searchResults,
  } = useDocument();

  const { result } = documentState;

  useEffect(() => {
    async function restore() {
      if (result) {
        return;
      }

      const cachedPatent =
        sessionStorage.getItem("parsedPatent");

      if (!cachedPatent) {
        navigate("/", { replace: true });
        return;
      }

      try {
        const parsedPatent =
          JSON.parse(cachedPatent);

        const restoredFile = await getFile();

        setDocumentState((prev) => ({
          ...prev,
          file: restoredFile,
          result: parsedPatent,
          processingStatus: "completed",
          progress: 100,
        }));
      } catch (error) {
        console.error(error);

        sessionStorage.removeItem("parsedPatent");

        navigate("/", { replace: true });
      }
    }

    restore();
  }, [result, navigate, setDocumentState]);

  useEffect(() => {
    if (!topSectionRef.current) return;

    const updateHeight = () => {
      setTopSectionHeight(
        topSectionRef.current.offsetHeight
      );
    };

    updateHeight();

    const observer = new ResizeObserver(
      updateHeight
    );

    observer.observe(topSectionRef.current);

    return () => observer.disconnect();
  }, []);

  const formattedPatent = useMemo(() => {
    return result ? formatPatent(result) : null;
  }, [result]);

  const handleUploadAnother = async () => {
    await clearFile();

    sessionStorage.removeItem("parsedPatent");

    resetDocument();

    navigate("/", { replace: true });
  };

  const handleDownload = useCallback(
    async () => {
      try {
        setDownloading(true);

        // XML file uploaded by the user
        const xmlFile = documentState.file;

        if (!xmlFile) {
          alert("No XML file found.");
          return;
        }

        const response =
          await downloadPatentPdf(xmlFile);

        const url =
          window.URL.createObjectURL(
            response.data
          );

        const link =
          document.createElement("a");

        // Default filename
        let filename = "Patent.pdf";

        // Read filename from Content-Disposition header
        const disposition =
          response.headers[
            "content-disposition"
          ];

        if (disposition) {
          const match =
            disposition.match(
              /filename\*?=(?:UTF-8'')?"?([^";]+)"?/
            );

          if (match?.[1]) {
            filename =
              decodeURIComponent(match[1]);
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
      } finally {
        setDownloading(false);
      }
    },
    [documentState.file]
  );

  const handleZoomChange = (zoom) => {
    console.info("Selected zoom:", zoom);
  };

  const handleDocumentScroll = (scrollTop) => {
    setCollapsed(scrollTop > 20);
  };

  useEffect(() => {
    window.dispatchEvent(
      new CustomEvent(
        "viewer:collapsed-change",
        {
          detail: collapsed,
        }
      )
    );
  }, [collapsed]);

  useEffect(() => {
    const handleHeaderDownload = () => {
      handleDownload();
   };

    window.addEventListener(
      "viewer:download",
      handleHeaderDownload
    );

    return () => {
      window.removeEventListener(
        "viewer:download",
        handleHeaderDownload
      );
    };
  }, [handleDownload]);

  useEffect(() => {
    const handleHeaderUploadAnother = () => {
      handleUploadAnother();
    };

    window.addEventListener(
      "viewer:upload-another",
      handleHeaderUploadAnother
    );

    return () => {
      window.removeEventListener(
        "viewer:upload-another",
        handleHeaderUploadAnother
      );
    };
  }, []);

  useEffect(() => {
    window.dispatchEvent(
      new CustomEvent(
        "viewer:download-state",
        {
          detail: downloading,
        }
      )
    );
  }, [downloading]);

  /*
   * All hooks must be called before this return.
   */
  if (!formattedPatent) {
    return null;
  }

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
          ${
            collapsed
              ? "max-h-0 opacity-0"
              : "max-h-[600px] opacity-100"
          }
        `}
      >
        <ViewerToolbar
          document={formattedPatent.document}
          metadata={formattedPatent.metadata}
          statistics={
            formattedPatent.statistics
          }
          claims={formattedPatent.claims}
          onUploadAnother={
            handleUploadAnother
          }
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
            statistics={
              formattedPatent.statistics
            }
            claims={formattedPatent.claims}
            metadata={formattedPatent.metadata}
          />
        </div>
      </div>

      <div
        style={{
          height: collapsed
            ? "calc(100vh - 64px)"
            : `calc(100vh - ${
                64 + topSectionHeight
              }px`,
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
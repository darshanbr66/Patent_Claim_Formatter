import {
  Download,
  Loader2,
  Upload,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

import Logo from "./Logo";

export default function Header() {
  const location = useLocation();

  const [viewerCollapsed, setViewerCollapsed] =
    useState(false);

  const [downloadLoading, setDownloadLoading] =
    useState(false);

  useEffect(() => {
    if (location.pathname !== "/viewer") {
      setViewerCollapsed(false);
      return;
    }

    const handleViewerCollapsed = (event) => {
      setViewerCollapsed(
        Boolean(event.detail)
      );
    };

    window.addEventListener(
      "viewer:collapsed-change",
      handleViewerCollapsed
    );

    return () => {
      window.removeEventListener(
        "viewer:collapsed-change",
        handleViewerCollapsed
      );
    };
  }, [location.pathname]);

  useEffect(() => {
    const handleDownloadState = (event) => {
      setDownloadLoading(
        Boolean(event.detail)
      );
    };

    window.addEventListener(
      "viewer:download-state",
      handleDownloadState
    );

    return () => {
      window.removeEventListener(
        "viewer:download-state",
        handleDownloadState
      );
    };
  }, []);

  const handleDownloadClick = () => {
    if (downloadLoading) {
      return;
    }

    window.dispatchEvent(
      new CustomEvent("viewer:download")
    );
  };

  const showViewerActions =
    location.pathname === "/viewer" &&
    viewerCollapsed;

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/90 backdrop-blur">
      <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-6 lg:px-8">
        <div className="flex items-center gap-3">
          <Logo size="lg" />

          <div>
            <h1 className="text-lg font-semibold tracking-tight text-slate-900">
              AI Patent Claim Formatter
            </h1>

            <p className="text-xs text-slate-500">
              Enterprise Patent Document Processing Platform
            </p>
          </div>
        </div>

        <div className="flex items-center gap-6">
          {/* Viewer actions */}
          <div
            className={`
              flex
              items-center
              gap-2
              overflow-hidden
              transition-all
              duration-300
              ease-out
              ${
                showViewerActions
                  ? "max-w-24 translate-x-0 opacity-100"
                  : "pointer-events-none max-w-0 translate-x-2 opacity-0"
              }
            `}
          >
            {/* Download */}
            <button
              type="button"
              onClick={handleDownloadClick}
              disabled={downloadLoading}
              aria-label={
                downloadLoading
                  ? "Generating PDF"
                  : "Download PDF"
              }
              title={
                downloadLoading
                  ? "Generating PDF..."
                  : "Download PDF"
              }
              className="
                inline-flex
                h-9
                w-9
                shrink-0
                items-center
                justify-center
                rounded-lg
                border
                border-slate-300
                bg-white
                text-slate-600
                transition-all
                duration-200
                hover:border-blue-300
                hover:bg-blue-50
                hover:text-blue-600
                hover:shadow-sm
                focus:outline-none
                focus:ring-2
                focus:ring-blue-500
                focus:ring-offset-2
                disabled:cursor-wait
                disabled:bg-slate-100
                disabled:text-slate-400
                disabled:hover:border-slate-300
                disabled:hover:bg-slate-100
                disabled:hover:text-slate-400
                disabled:hover:shadow-none
              "
            >
              {downloadLoading ? (
                <Loader2
                  size={18}
                  className="animate-spin"
                />
              ) : (
                <Download size={18} />
              )}
            </button>

            {/* Upload Another */}
            <button
              type="button"
              onClick={() => {
                window.dispatchEvent(
                  new CustomEvent(
                    "viewer:upload-another"
                  )
                );
              }}
              aria-label="Upload another document"
              title="Upload another document"
              className="
                inline-flex
                h-9
                w-9
                shrink-0
                items-center
                justify-center
                rounded-lg
                border
                border-slate-300
                bg-white
                text-slate-600
                transition-all
                duration-200
                hover:border-blue-300
                hover:bg-blue-50
                hover:text-blue-600
                hover:shadow-sm
                focus:outline-none
                focus:ring-2
                focus:ring-blue-500
                focus:ring-offset-2
              "
            >
              <Upload size={18} />
            </button>
          </div>

          {/* Main navigation */}
          <div className="hidden items-center gap-6 md:flex">
            <button className="text-sm font-medium text-slate-600 transition hover:text-blue-600">
              Documentation
            </button>

            <button className="text-sm font-medium text-slate-600 transition hover:text-blue-600">
              About
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
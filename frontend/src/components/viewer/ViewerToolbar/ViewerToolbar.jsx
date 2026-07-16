import DocumentTitle from "./DocumentTitle";
import ZoomControls from "./ZoomControls";
import DownloadMenu from "./DownloadMenu";
import UploadAnotherButton from "./UploadAnotherButton";

export default function ViewerToolbar({
  document,
  metadata,
  onUploadAnother,
  onDownload,
  zoom = 100,
  onZoomChange,
  downloadDisabled = true,
  zoomDisabled = true,
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
        {/* Left Section */}
        <DocumentTitle
          document={document}
          metadata={metadata}
        />

        {/* Right Section */}
        <div className="flex flex-wrap items-center gap-3">
          <ZoomControls
            value={zoom}
            disabled={zoomDisabled}
            onChange={onZoomChange}
          />

          <DownloadMenu
            disabled={downloadDisabled}
            onDownload={onDownload}
          />

          <UploadAnotherButton
            onClick={onUploadAnother}
          />
        </div>
      </div>
    </div>
  );
}
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
    <div className="rounded-xl border border-slate-200 bg-white px-5 py-4 shadow-sm">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
        {/* Left */}
        <DocumentTitle
          document={document}
          metadata={metadata}
        />

        {/* Right */}
        <div className="flex flex-wrap items-center justify-end gap-2">
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
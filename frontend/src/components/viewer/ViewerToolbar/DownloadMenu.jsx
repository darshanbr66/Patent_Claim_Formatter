import { Download } from "lucide-react";

export default function DownloadMenu({
  disabled = true,
  onDownload,
}) {
  const handleClick = () => {
    if (disabled) return;

    if (onDownload) {
      onDownload();
    }
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={disabled}
      className="
        inline-flex
        items-center
        justify-center
        gap-2
        rounded-xl
        bg-blue-600
        px-4
        py-2.5
        text-sm
        font-medium
        text-white
        transition-all
        duration-200
        hover:bg-blue-700
        hover:shadow-sm
        focus:outline-none
        focus:ring-2
        focus:ring-blue-500
        focus:ring-offset-2
        disabled:cursor-not-allowed
        disabled:bg-slate-300
        disabled:text-slate-100
        disabled:hover:shadow-none
      "
      title={
        disabled
          ? "PDF download will be enabled after backend integration."
          : "Download PDF"
      }
    >
      <Download size={16} />

      <span>Download PDF</span>
    </button>
  );
}
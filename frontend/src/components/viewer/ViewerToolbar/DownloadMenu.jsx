import { Download, Loader2 } from "lucide-react";

export default function DownloadMenu({
  disabled = true,
  loading = false,
  onDownload,
}) {
  const handleClick = () => {
    if (disabled || loading) return;

    onDownload?.();
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={disabled || loading}
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
        disabled:cursor-wait
        disabled:bg-slate-300
        disabled:text-slate-100
        disabled:hover:shadow-none
      "
      title={
        loading
          ? "Generating PDF..."
          : disabled
          ? "PDF download unavailable"
          : "Download PDF"
      }
    >
      {loading ? (
        <Loader2
          size={16}
          className="animate-spin"
        />
      ) : (
        <Download size={16} />
      )}

      <span>
        {loading ? "Generating PDF..." : "Download PDF"}
      </span>
    </button>
  );
}
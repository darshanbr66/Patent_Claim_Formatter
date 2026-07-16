import { RotateCcw } from "lucide-react";

export default function UploadAnotherButton({
  onClick,
  disabled = false,
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className="
        inline-flex
        items-center
        justify-center
        gap-2
        rounded-xl
        border
        border-slate-300
        bg-white
        px-4
        py-2.5
        text-sm
        font-medium
        text-slate-700
        transition-all
        duration-200
        hover:border-slate-400
        hover:bg-slate-50
        hover:shadow-sm
        focus:outline-none
        focus:ring-2
        focus:ring-blue-500
        focus:ring-offset-2
        disabled:cursor-not-allowed
        disabled:opacity-50
      "
    >
      <RotateCcw size={16} />

      <span>Upload Another</span>
    </button>
  );
}
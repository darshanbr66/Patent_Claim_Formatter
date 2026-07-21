import { ZoomIn } from "lucide-react";

const ZOOM_OPTIONS = [100, 125, 150];

export default function ZoomControls({
  value = 100,
  disabled = true,
  onChange,
}) {
  const handleChange = (event) => {
    if (disabled) return;

    const zoom = Number(event.target.value);

    onChange?.(zoom);
  };

  return (
    <div className="flex items-center gap-2">
      <div
        className="
          flex
          h-9
          w-9
          items-center
          justify-center
          rounded-lg
          border
          border-slate-300
          bg-white
          text-slate-600
        "
      >
        <ZoomIn size={15} />
      </div>

      <select
        value={value}
        onChange={handleChange}
        disabled={disabled}
        className="
          h-9
          rounded-lg
          border
          border-slate-300
          bg-white
          px-3
          text-sm
          font-medium
          text-slate-700
          transition
          focus:border-blue-500
          focus:outline-none
          focus:ring-2
          focus:ring-blue-500/20
          disabled:cursor-not-allowed
          disabled:bg-slate-100
          disabled:text-slate-400
        "
        title={
          disabled
            ? "Zoom controls will be enabled in a future release."
            : "Document Zoom"
        }
      >
        {ZOOM_OPTIONS.map((zoom) => (
          <option
            key={zoom}
            value={zoom}
          >
            {zoom}%
          </option>
        ))}
      </select>
    </div>
  );
}
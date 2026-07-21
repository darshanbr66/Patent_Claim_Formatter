import { Search, X } from "lucide-react";

export default function SearchBox({
  value = "",
  onChange,
  placeholder = "Search claims...",
}) {
  return (
    <div className="relative">
      <Search
        size={18}
        className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
      />

      <input
        type="text"
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        placeholder={placeholder}
        className="
          w-full
          rounded-lg
          border
          border-slate-300
          bg-white
          py-2.5
          pl-10
          pr-10
          text-sm
          outline-none
          transition
          focus:border-blue-500
          focus:ring-2
          focus:ring-blue-100
        "
      />

      {value && (
        <button
          type="button"
          onClick={() => onChange?.("")}
          className="
            absolute
            right-3
            top-1/2
            -translate-y-1/2
            text-slate-400
            hover:text-slate-700
          "
        >
          <X size={16} />
        </button>
      )}
    </div>
  );
}
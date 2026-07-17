import { Search } from "lucide-react";

export default function SearchBox({
  value,
  onChange,
}) {
  return (
    <div className="relative mb-4">
      <Search
        size={16}
        className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
      />

      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search claims..."
        className="
          w-full
          rounded-md
          border
          border-slate-300
          py-2
          pl-9
          pr-3
          text-sm
          outline-none
          transition
          focus:border-blue-500
        "
      />
    </div>
  );
}
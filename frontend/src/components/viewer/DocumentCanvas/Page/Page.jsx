export default function Page({ children }) {
  return (
    <div
      className="
        mx-auto
        my-8
        w-full
        max-w-[210mm]
        min-h-[297mm]
        bg-white
        border
        border-slate-200
        rounded-sm
        shadow-lg
        overflow-hidden
      "
    >
      <div
        className="
          px-[26mm]
          py-[24mm]
        "
      >
        {children}
      </div>
    </div>
  );
}
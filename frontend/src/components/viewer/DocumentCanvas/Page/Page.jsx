export default function Page({ children }) {
  return (
    <div
      className="
        mx-auto
        my-6
        w-full
        max-w-[210mm]
        min-h-[297mm]
        bg-white
        border
        border-slate-300
        shadow-md
        overflow-hidden
      "
    >
      <div
        className="
          px-[20mm]
          pt-[18mm]
          pb-[20mm]
        "
      >
        {children}
      </div>
    </div>
  );
}
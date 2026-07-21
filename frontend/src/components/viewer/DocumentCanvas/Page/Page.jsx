export default function Page({ children }) {
  return (
    <div
      className="
        mx-auto
        my-10
        min-h-[297mm]
        w-[210mm]
        bg-white
        shadow-2xl
      "
    >
      <div className="px-[28mm] py-[25mm]">
        {children}
      </div>
    </div>
  );
}
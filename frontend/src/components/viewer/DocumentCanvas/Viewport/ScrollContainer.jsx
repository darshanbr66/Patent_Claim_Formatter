import { useRef } from "react";

export default function ScrollContainer({
  children,
  onScroll,
}) {
  const scrollRef = useRef(null);

  const handleScroll = (event) => {
    onScroll?.(event.target.scrollTop);
  };

  return (
    <div
      className="
        flex
        h-full
        min-h-0
        flex-1
        flex-col
        overflow-hidden
        rounded-xl
        border
        border-slate-200
        bg-slate-100
        shadow-sm
      "
    >
      <div
        ref={scrollRef}
        onScroll={handleScroll}
        className="
          viewer-scrollbar
          flex-1
          overflow-y-auto
          overflow-x-auto
          scroll-smooth
        "
      >
        <div
          className="
            flex
            min-h-full
            justify-center
            px-6
            py-8
          "
        >
          <div className="w-full max-w-[210mm]">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
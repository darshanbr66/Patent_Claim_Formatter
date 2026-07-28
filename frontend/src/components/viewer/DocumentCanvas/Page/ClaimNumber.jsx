export default function ClaimNumber({ number }) {
  return (
    <span
      className="
        inline-block
        w-full
        font-serif
        text-[13.5px]
        leading-[1.5]
        font-normal
        tabular-nums
        text-slate-900
        select-none
      "
    >
      {number}.
    </span>
  );
}
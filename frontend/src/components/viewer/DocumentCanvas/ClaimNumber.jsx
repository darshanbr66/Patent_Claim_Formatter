export default function ClaimNumber({ number }) {
  return (
    <div
      className="
        font-serif
        text-[17px]
        font-semibold
        leading-8
        text-slate-900
        tabular-nums
        select-none
      "
    >
      {number}.
    </div>
  );
}
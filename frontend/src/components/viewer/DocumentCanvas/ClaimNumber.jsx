export default function ClaimNumber({ number }) {
  return (
    <div
      className="
        w-14
        shrink-0
        pr-4
        text-right
        font-semibold
        text-slate-900
        text-[15px]
        leading-8
        select-none
      "
    >
      {number}.
    </div>
  );
}
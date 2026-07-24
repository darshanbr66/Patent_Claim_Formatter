export default function ClaimNumber({ number }) {
  return (
    <span
      className="
        font-serif
        text-[15px]
        leading-[1.7]
        font-medium
        text-slate-900
        tabular-nums
      "
    >
      {number}.
    </span>
  );
}
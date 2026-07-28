export default function ClaimReference({ reference }) {
  if (!reference) {
    return null;
  }

  const claimNumber = reference.claim_number;
  const label = reference.text ?? `claim ${claimNumber}`;

  function handleClick() {
  if (!claimNumber) {
    return;
  }

  window.dispatchEvent(
    new CustomEvent("claim:navigate", {
      detail: claimNumber,
    })
  );
}

  return (
    <button
      type="button"
      title={`Go to Claim ${claimNumber}`}
      onClick={handleClick}
      className="
        inline
        text-inherit
        cursor-pointer
        transition-all
        hover:text-blue-700
        hover:underline
      "
    >
      {label}
    </button>
  );
}
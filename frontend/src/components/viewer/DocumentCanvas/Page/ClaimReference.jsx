export default function ClaimReference({ reference }) {
  if (!reference) {
    return null;
  }

  const claimNumber = reference.claim_number;
  const label = reference.text ?? `claim ${claimNumber}`;

  function handleClick() {
    if (!claimNumber) return;

    const element = document.getElementById(
      `claim-${claimNumber}`
    );

    if (!element) return;

    element.scrollIntoView({
      behavior: "smooth",
      block: "center",
    });

    element.classList.add(
      "ring-2",
      "ring-blue-300",
      "rounded"
    );

    setTimeout(() => {
      element.classList.remove(
        "ring-2",
        "ring-blue-300",
        "rounded"
      );
    }, 1200);
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
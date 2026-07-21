export default function ClaimReference({ reference }) {
  if (!reference) {
    return null;
  }

  const label =
    reference.text?.replace(/^claim/i, "Claim") ?? "Claim";

  function handleClick() {
    if (!reference.idref) return;

    const element = document.getElementById(
      `claim-${reference.idref}`
    );

    if (!element) return;

    element.scrollIntoView({
      behavior: "smooth",
      block: "center",
    });

    element.classList.add("bg-yellow-100");

    setTimeout(() => {
      element.classList.remove("bg-yellow-100");
    }, 1500);
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      className="
        inline
        font-medium
        text-blue-700
        hover:text-blue-900
        hover:underline
        transition-colors
      "
    >
      {label}
    </button>
  );
}
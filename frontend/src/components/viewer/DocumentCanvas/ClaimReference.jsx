export default function ClaimReference({
  reference,
}) {
  if (!reference) {
    return null;
  }

  function handleClick() {
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
    }, 1800);
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      className="font-medium text-blue-700 hover:underline"
    >
      {reference.text}
    </button>
  );
}
import { useEffect, useState } from "react";

export default function useActiveClaim() {
  const [activeClaimId, setActiveClaimId] = useState(null);

  useEffect(() => {
    const elements = document.querySelectorAll('[id^="claim-"]');

    if (!elements.length) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter(
          (entry) => entry.isIntersecting
        );

        if (!visible.length) {
          return;
        }

        const closest = visible.sort((a, b) => {
          return (
            Math.abs(a.boundingClientRect.top) -
            Math.abs(b.boundingClientRect.top)
          );
        })[0];

        const id = Number(
          closest.target.id.replace("claim-", "")
        );

        setActiveClaimId(id);
      },
      {
        threshold: 0.1,
      }
    );

    elements.forEach((element) =>
      observer.observe(element)
    );

    return () => observer.disconnect();
  }, []);

  return activeClaimId;
}
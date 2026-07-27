import { useCallback } from "react";

export default function useClaimNavigation({
  setSelectedClaimId,
  manualNavigationRef,
}) {
  const navigateToClaim = useCallback(
    (claim) => {
        const claimId =
        typeof claim === "object"
            ? claim.number
            : claim;

        if (claimId == null) {
        return;
        }
      if (claimId == null) {
        return;
      }

      manualNavigationRef.current = true;

      setSelectedClaimId(claimId);

      const element = document.getElementById(
        `claim-${claimId}`
      );

      if (element) {
        element.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });

        element.classList.add(
          "ring-2",
          "ring-blue-300",
          "rounded-lg"
        );

        window.setTimeout(() => {
          element.classList.remove(
            "ring-2",
            "ring-blue-300",
            "rounded-lg"
          );

          manualNavigationRef.current = false;
        }, 1200);
      } else {
        manualNavigationRef.current = false;
      }
    },
    [manualNavigationRef, setSelectedClaimId]
  );

  return {
    navigateToClaim,
  };
}
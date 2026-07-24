import {
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import Sidebar from "./Sidebar/Sidebar";
import DocumentViewport from "./Viewport/DocumentViewport";

import useActiveClaim from "../../../hooks/useActiveClaim";

export default function DocumentCanvas({
  patent,
  searchTerm,
  onSearchChange,
  searchResults,
}) {
  /*
   * Selected by clicking in the sidebar.
   */
  const [selectedClaimId, setSelectedClaimId] =
    useState(null);

  const manualNavigationRef = useRef(false);

  /*
   * Selected automatically while scrolling.
   */
  const activeClaimId = useActiveClaim();

  const claims = patent?.claims ?? [];

  /*
   * Filter the sidebar claim list.
   * The document itself still renders all claims.
   */
  const filteredClaims = useMemo(() => {
    if (!searchTerm.trim()) {
      return claims;
    }

    const matchedIds = new Set(
      searchResults.map((result) => result.claimId)
    );

    return claims.filter((claim) =>
      matchedIds.has(claim.id)
    );
  }, [claims, searchResults, searchTerm]);

  function handleSelectClaim(claim) {
    manualNavigationRef.current = true;

    setSelectedClaimId(claim.id);

    document
      .getElementById(`claim-${claim.id}`)
      ?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });

    window.setTimeout(() => {
      manualNavigationRef.current = false;
    }, 500);
  }

  /*
   * If the user is scrolling,
   * keep the selected claim synchronized.
   */
  useEffect(() => {
    if (!activeClaimId) {
      return;
    }

    if (manualNavigationRef.current) {
      return;
    }

    setSelectedClaimId(Number(activeClaimId));
  }, [activeClaimId]);

  return (
    <section
      className="
        flex
        h-full
        min-h-full
        gap-4
        overflow-hidden
      "
    >
      <div
        className="
          h-full
          min-h-0
          w-80
          flex-shrink-0
          overflow-hidden
        "
      >
        <Sidebar
          claims={filteredClaims}
          searchTerm={searchTerm}
          onSearchChange={onSearchChange}
          searchResults={searchResults}
          selectedClaimId={selectedClaimId}
          onSelectClaim={handleSelectClaim}
        />
      </div>

      <div
        className="
          h-full
          min-h-0
          min-w-0
          flex-1
          overflow-hidden
        "
      >
        <DocumentViewport
          document={patent}
          searchTerm={searchTerm}
          searchResults={searchResults}
          selectedClaimId={selectedClaimId}
        />
      </div>
    </section>
  );
}
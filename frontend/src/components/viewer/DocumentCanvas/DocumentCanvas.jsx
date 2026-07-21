import { useMemo, useState } from "react";

import Sidebar from "./Sidebar/Sidebar";

import DocumentViewport from "./Viewport/DocumentViewport";

export default function DocumentCanvas({ patent }) {
  const [searchTerm, setSearchTerm] = useState("");

  const [selectedClaimId, setSelectedClaimId] = useState(null);

  const claims = patent?.claims ?? [];

  const filteredClaims = useMemo(() => {
    if (!searchTerm.trim()) {
      return claims;
    }

    const query = searchTerm.toLowerCase();

    return claims.filter((claim) => {
      return (
        String(claim.number).includes(query) ||
        claim.text?.toLowerCase().includes(query)
      );
    });
  }, [claims, searchTerm]);

  function handleSelectClaim(claim) {
    setSelectedClaimId(claim.id);

    const element = document.getElementById(
      `claim-${claim.id}`
    );

    if (!element) return;

    element.scrollIntoView({
      behavior: "smooth",
      block: "center",
    });
  }

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
          onSearchChange={setSearchTerm}
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
        />
      </div>
    </section>
  );
}
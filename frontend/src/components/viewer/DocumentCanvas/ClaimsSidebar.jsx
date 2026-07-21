import { useMemo, useState } from "react";
import { Search } from "lucide-react";

import buildClaimTree from "../../../utils/buildClaimTree";
import ClaimTreeNode from "./ClaimTreeNode";

export default function ClaimsSidebar({
  claims = [],
}) {
  const [search, setSearch] = useState("");

  function jumpToClaim(id) {
    const element = document.getElementById(`claim-${id}`);

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

  const filteredClaims = useMemo(() => {
    if (!search.trim()) {
      return claims;
    }

    const query = search.toLowerCase();

    return claims.filter((claim) => {
      return (
        String(claim.number).includes(query) ||
        (claim.text ?? "").toLowerCase().includes(query)
      );
    });
  }, [claims, search]);

  const tree = useMemo(() => {
    return buildClaimTree(filteredClaims);
  }, [filteredClaims]);

  return (
    <aside
      className="
        sticky
        top-24
         h-[calc(100vh-7rem)]
        w-72
        rounded-xl
        border
        border-slate-200
        bg-white
        p-4
        shadow-sm
      "
    >
      <h3 className="mb-4 text-sm font-bold uppercase tracking-wider text-slate-600">
        Claims
      </h3>

      <div className="relative mb-4">
        <Search
          size={16}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
        />

        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by claim number or text..."
          className="
            w-full
            rounded-md
            border
            border-slate-300
            py-2
            pl-9
            pr-3
            text-sm
            outline-none
            focus:border-blue-500
          "
        />
      </div>

      <div className="max-h-[70vh] overflow-y-auto">
        {tree.length === 0 ? (
          <div className="py-6 text-center text-sm text-slate-500">
            No matching claims
          </div>
        ) : (
          tree.map((claim) => (
            <ClaimTreeNode
              key={claim.id}
              claim={claim}
              onSelect={jumpToClaim}
            />
          ))
        )}
      </div>
    </aside>
  );
}
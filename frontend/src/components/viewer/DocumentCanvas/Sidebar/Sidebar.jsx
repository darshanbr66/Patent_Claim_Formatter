import SearchBox from "./SearchBox";
import ClaimStatistics from "./ClaimStatistics";
import ClaimNavigator from "./ClaimNavigator";

export default function Sidebar({
  claims = [],
  searchTerm = "",
  onSearchChange,
  searchResults = [],
  selectedClaimId,
  onSelectClaim,
}) {
  return (
    <aside
      className="
        flex
        h-full
        min-h-0
        flex-col
        rounded-2xl
        border
        border-slate-200
        bg-white
        shadow-sm
      "
    >
      {/* Search */}
      <div className="flex-shrink-0 border-b border-slate-200 p-5">
        <SearchBox
          value={searchTerm}
          onChange={onSearchChange}
          resultCount={searchResults.length}
        />
      </div>

      {/* Statistics */}
      <div className="flex-shrink-0 border-b border-slate-200 p-5">
        <ClaimStatistics claims={claims} />
      </div>

      {/* Claim List */}
      <div
        className="
          flex-1
          min-h-0
          overflow-y-auto
          viewer-scrollbar
        "
      >
        <ClaimNavigator
          claims={claims}
          selectedClaimId={selectedClaimId}
          onSelectClaim={onSelectClaim}
        />
      </div>
    </aside>
  );
}
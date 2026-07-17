export default function ClaimTreeNode({
  claim,
  level = 0,
  onSelect,
}) {
  return (
    <>
      <button
        onClick={() => onSelect(claim.id)}
        className="
          flex
          w-full
          rounded
          px-2
          py-2
          text-left
          text-sm
          hover:bg-slate-100
        "
        style={{
          paddingLeft: `${12 + level * 18}px`,
        }}
      >
        <span className="font-medium">
          Claim {claim.number}
        </span>
      </button>

      {claim.children.map((child) => (
        <ClaimTreeNode
          key={child.id}
          claim={child}
          level={level + 1}
          onSelect={onSelect}
        />
      ))}
    </>
  );
}
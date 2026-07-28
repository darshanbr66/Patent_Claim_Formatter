export default function ClaimLimitation({
  children,
  level = 0,
}) {
  // Only indent nested semantic children.
  // Top-level limitations (level 0/1) own their indentation
  // through the paragraph itself.
  const nestedLevel = Math.max(0, level - 1);

  return (
    <div
      className="w-full"
      style={{
        marginLeft: nestedLevel * 18,
      }}
    >
      {children}
    </div>
  );
}
export default function ClaimLimitation({
  children,
  level = 0,
}) {
  // Clamp the nesting level to avoid excessive indentation.
  const safeLevel = Math.max(0, Math.min(level, 5));

  // Indent by 18px per level.
  const marginLeft = safeLevel * 18;

  return (
    <div
      style={{
        marginLeft,
      }}
      className="w-full"
    >
      {children}
    </div>
  );
}
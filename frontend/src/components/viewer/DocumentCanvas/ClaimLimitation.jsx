export default function ClaimLimitation({
  children,
  level = 0,
}) {
  const margin = Math.min(level, 5) * 24;

  return (
    <div
      style={{
        marginLeft: `${margin}px`,
      }}
    >
      {children}
    </div>
  );
}
export default function ClaimLimitation({
  children,
  level = 0,
}) {
  return (
    <div
      className="mb-2"
      style={{
        paddingLeft: `${level * 28}px`,
      }}
    >
      {children}
    </div>
  );
}
const SIZE_CLASSES = {
  sm: "h-8 w-8",
  md: "h-10 w-10",
  lg: "h-12 w-12",
  xl: "h-16 w-16",
};

export default function Logo({
  size = "md",
  className = "",
}) {
  const sizeClass = SIZE_CLASSES[size] ?? SIZE_CLASSES.md;

  return (
    <img
      src="/logo.png"
      alt="Patent Claim Formatter"
      className={`${sizeClass} object-contain ${className}`}
    />
  );
}
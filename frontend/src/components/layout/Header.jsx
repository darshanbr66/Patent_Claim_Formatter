import Logo from "./Logo";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/90 backdrop-blur">
      <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-6 lg:px-8">
        <div className="flex items-center gap-3">
          <Logo size="lg" />

          <div>
            <h1 className="text-lg font-semibold tracking-tight text-slate-900">
              AI Patent Claim Formatter
            </h1>

            <p className="text-xs text-slate-500">
              Enterprise Patent Document Processing Platform
            </p>
          </div>
        </div>

        <div className="hidden items-center gap-6 md:flex">
          <button className="text-sm font-medium text-slate-600 transition hover:text-blue-600">
            Documentation
          </button>

          <button className="text-sm font-medium text-slate-600 transition hover:text-blue-600">
            About
          </button>
        </div>
      </div>
    </header>
  );
}
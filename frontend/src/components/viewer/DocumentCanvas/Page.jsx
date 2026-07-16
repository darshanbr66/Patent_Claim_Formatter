export default function Page({ children }) {
  return (
    <div className="mx-auto w-full max-w-[850px]">
      <div
        className="
          min-h-[1123px]
          rounded-md
          border
          border-slate-300
          bg-white
          shadow-lg
        "
      >
        {/* Page Header */}
        <header className="border-b border-slate-200 px-12 py-8">
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">
            Patent Claim Formatter
          </h1>

          <p className="mt-2 text-sm text-slate-500">
            Formatted Patent Claims
          </p>
        </header>

        {/* Document Body */}
        <main className="px-12 py-10">
          {children}
        </main>

        {/* Page Footer */}
        <footer className="border-t border-slate-200 px-12 py-6">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>Patent Claim Formatter</span>

            <span>Generated Document</span>
          </div>
        </footer>
      </div>
    </div>
  );
}
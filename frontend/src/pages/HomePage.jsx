import UploadCard from "../components/upload/UploadCard";

export default function HomePage() {
  return (
    <section className="flex w-full flex-col items-center justify-center">
      <div className="w-full max-w-6xl">
        {/* Hero */}
        <div className="mx-auto max-w-4xl text-center">
          <span className="inline-flex rounded-full border border-blue-100 bg-blue-50 px-4 py-1 text-sm font-medium text-blue-700">
            Enterprise Patent Document Processing Platform
          </span>

          <h1 className="mt-6 text-5xl font-bold tracking-tight text-slate-900">
            AI Patent Claim Formatter
          </h1>

          <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-slate-600">
            Upload patent documents and receive professionally formatted patent
            claims through a modern, enterprise-grade document processing
            experience.
          </p>
        </div>

        {/* Upload */}
        <div className="mx-auto mt-14 max-w-4xl">
          <UploadCard />
        </div>

        {/* Features */}
        <div className="mt-16 grid gap-6 md:grid-cols-3">
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-blue-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 16V8a2 2 0 012-2h12a2 2 0 012 2v8M8 12h8"
                />
              </svg>
            </div>

            <h2 className="text-lg font-semibold text-slate-900">
              Multiple Input Formats
            </h2>

            <p className="mt-2 text-sm leading-6 text-slate-600">
              Upload XML, PDF, TXT and DOCX patent documents through a unified
              workflow.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-50">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-emerald-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>

            <h2 className="text-lg font-semibold text-slate-900">
              Enterprise Workflow
            </h2>

            <p className="mt-2 text-sm leading-6 text-slate-600">
              Built for scalable backend integration with a production-ready
              frontend architecture.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-purple-50">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-purple-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 17v-6h13M9 7h13M3 7h.01M3 17h.01"
                />
              </svg>
            </div>

            <h2 className="text-lg font-semibold text-slate-900">
              Professional Output
            </h2>

            <p className="mt-2 text-sm leading-6 text-slate-600">
              View and download professionally formatted patent claim documents
              through a clean enterprise interface.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
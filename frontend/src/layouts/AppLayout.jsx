import Header from "../components/layout/Header";

export default function AppLayout({ children }) {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <Header />

      <main className="mx-auto flex w-full max-w-7xl flex-1 px-6 py-10 lg:px-8">
        {children}
      </main>
    </div>
  );
}
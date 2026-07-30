import Header from "../components/layout/Header";

export default function AppLayout({ children }) {
  return (
    <div
      className="
        flex
        min-h-screen
        flex-col
        bg-slate-50
        text-slate-900
      "
    >
      <Header />

      <main
        className="
          flex
          w-full
          flex-1
          min-h-0
          px-6
          py-2
          lg:px-8
        "
      >
        {children}
      </main>
    </div>
  );
}
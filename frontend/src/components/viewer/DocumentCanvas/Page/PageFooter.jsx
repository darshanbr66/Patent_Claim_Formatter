export default function PageFooter({
  pageNumber = 1,
}) {
  return (
    <footer className="mt-16 border-t border-slate-300 pt-4 text-center text-sm text-slate-500">
      Page {pageNumber}
    </footer>
  );
}
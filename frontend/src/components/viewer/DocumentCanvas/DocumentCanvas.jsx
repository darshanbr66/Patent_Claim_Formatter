import Page from "./Page";
import ClaimRenderer from "./ClaimRenderer";

export default function DocumentCanvas({ claims = [] }) {
  return (
    <section className="rounded-2xl border border-slate-200 bg-slate-100 p-6 shadow-sm">
      <div className="overflow-auto">
        <Page>
          <ClaimRenderer claims={claims} />
        </Page>
      </div>
    </section>
  );
}
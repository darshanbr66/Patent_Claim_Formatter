import Page from "./Page";

import PatentHeader from "./PatentHeader";
import PatentMetadata from "./PatentMetadata";

import ClaimBlock from "./ClaimBlock";

export default function DocumentCanvas({ document }) {
  if (!document) {
    return (
      <section className="rounded-2xl border border-slate-200 bg-slate-100 p-6 shadow-sm">
        <div className="text-center text-slate-500">
          No document loaded.
        </div>
      </section>
    );
  }

  return (
    <section className="rounded-2xl border border-slate-200 bg-slate-100 p-8 shadow-sm">
      <div className="overflow-auto">
        <Page>
          <PatentHeader document={document.document} />

          <PatentMetadata document={document.document} />

          <section className="mt-10">
            {document.claims.map((claim) => (
              <ClaimBlock
                key={claim.id}
                claim={claim}
              />
            ))}
          </section>
        </Page>
      </div>
    </section>
  );
}
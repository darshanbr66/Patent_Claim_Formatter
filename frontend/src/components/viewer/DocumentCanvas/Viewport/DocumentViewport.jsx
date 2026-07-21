import ScrollContainer from "./ScrollContainer";

import Page from "../Page/Page";
import PatentHeader from "../Page/PatentHeader";
import PatentMetadata from "../Page/PatentMetadata";
import ClaimBlock from "../Page/ClaimBlock";

export default function DocumentViewport({ document }) {
  return (
    <div className="flex h-full min-h-0 flex-1 flex-col">
      <ScrollContainer>
        {!document ? (
          <div className="py-16 text-center text-slate-500">
            No document loaded.
          </div>
        ) : (
          <Page>
            <PatentHeader document={document.document} />

            <PatentMetadata document={document.document} />

            <section className="mt-12">
              {document.claims?.map((claim) => (
                <ClaimBlock
                  key={claim.id}
                  claim={claim}
                />
              ))}
            </section>
          </Page>
        )}
      </ScrollContainer>
    </div>
  );
}
/**
 * Converts a backend claim into the frontend claim model.
 */
export default function formatClaim(claim) {
  const paragraphText = [
    claim.header,
    ...(claim.elements ?? []).map((element) => element.text),
  ]
    .filter(Boolean)
    .join("\n\n");

  return {
    id: claim.number,

    number: claim.number,

    claimType: claim.claim_type,

    parentClaim: claim.parent_claim,

    header: claim.header ?? "",

    paragraphs: [
      {
        id: `claim-${claim.number}`,

        text: paragraphText,

        ast: [],

        references: [],
      },
    ],

    elements: (claim.elements ?? []).map((element, index) => ({
      id: `${claim.number}-${index}`,

      text: element.text,

      level: element.level ?? 0,

      marker: element.marker,

      type: element.element_type,

      order: element.order,

      children: element.children ?? [],
    })),

    metadata: claim.metadata ?? {},
  };
}
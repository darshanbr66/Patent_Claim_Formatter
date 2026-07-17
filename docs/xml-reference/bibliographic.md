# USPTO Patent Grant - Bibliographic Data

This document describes the structure of the `<us-bibliographic-data-grant>` element.

---

# XML Path

```text
us-patent-grant
└── us-bibliographic-data-grant
```

---

# Description

The `us-bibliographic-data-grant` element contains all bibliographic and legal metadata about a patent.

It does **not** contain:

- Abstract
- Description
- Claims
- Drawings

Those are stored directly under the root element.

---

# Complete Hierarchy

```text
us-bibliographic-data-grant
│
├── publication-reference
│
├── application-reference
│
├── us-application-series-code
│
├── priority-claims
│
├── us-term-of-grant
│
├── classifications-ipcr
│
├── classifications-cpc
│
├── invention-title
│
├── us-references-cited
│
├── number-of-claims
│
├── us-exemplary-claim
│
├── figures
│
├── us-parties
│
├── assignees
│
├── examiners
│
├── us-related-documents
│
├── disclaimer
│
├── notices
│
├── us-field-of-classification-search
│
├── classification-national
│
├── rule-47-flag
│
└── ...
```

---

# Child Elements

| XML Element | Document |
|-------------|----------|
| publication-reference | publication-reference.md |
| application-reference | application-reference.md |
| priority-claims | priority-claims.md |
| us-parties | parties.md |
| assignees | assignees.md |
| examiners | examiners.md |
| classifications-ipcr | classifications-ipcr.md |
| classifications-cpc | classifications-cpc.md |
| us-references-cited | references-cited.md |
| us-related-documents | related-documents.md |

---

# Tree (Expanded)

```text
us-bibliographic-data-grant
├── publication-reference
├── application-reference
├── us-application-series-code
├── priority-claims
├── us-term-of-grant
├── classifications-ipcr
├── classifications-cpc
├── invention-title
├── us-references-cited
├── number-of-claims
├── us-exemplary-claim
├── figures
├── us-parties
├── assignees
├── examiners
├── us-related-documents
├── disclaimer
├── notices
├── us-field-of-classification-search
├── classification-national
├── rule-47-flag
└── ...
```

---

# Notes

- This is the largest metadata section in the patent XML.
- Every child element has its own dedicated reference document.
- Some elements are optional and depend on the patent type or prosecution history.
- Repeating elements (arrays) are documented in their respective files.
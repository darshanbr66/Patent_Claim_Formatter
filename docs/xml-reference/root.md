# USPTO Patent Grant XML Root Structure

This document describes the root hierarchy of a USPTO Patent Grant XML document (DTD v4.7).

---

## Root Element

```xml
<us-patent-grant>
```

---

## Root Attributes

```text
us-patent-grant
├── @lang
├── @dtd-version
├── @file
├── @status
├── @id
├── @country
├── @date-produced
└── @date-publ
```

Example

```xml
<us-patent-grant
    lang="EN"
    dtd-version="v4.7 2022-02-17"
    file="US12402548-20250902.XML"
    status="PRODUCTION"
    id="us-patent-grant"
    country="US"
    date-produced="20250819"
    date-publ="20250902">
```

---

# Root Hierarchy

```text
us-patent-grant
│
├── us-bibliographic-data-grant
│
├── abstract
│
├── description
│
├── drawings
│
├── claims
│
└── us-sequence-listing (optional)
```

---

# Child Elements

## us-bibliographic-data-grant

Contains all patent metadata.

See:

- bibliographic.md

---

## abstract

Contains the patent abstract.

See:

- abstract.md

---

## description

Contains the complete specification.

See:

- description.md

---

## drawings

Contains drawing information.

See:

- drawings.md

---

## claims

Contains every patent claim.

See:

- claims.md

---

## us-sequence-listing

Optional.

Only available for biotechnology patents.

---

# Complete Tree

```text
us-patent-grant
├── @lang
├── @dtd-version
├── @file
├── @status
├── @id
├── @country
├── @date-produced
├── @date-publ
│
├── us-bibliographic-data-grant
├── abstract
├── description
├── drawings
├── claims
└── us-sequence-listing (optional)
```

---

# Notes

- Every USPTO Patent Grant XML starts with `us-patent-grant`.
- Only one root element exists.
- All other patent information is contained within this element.
- The XML declaration (`<?xml ...?>`) and DOCTYPE are not children of the root element.
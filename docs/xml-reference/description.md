# USPTO Patent Grant - Description

This document describes the structure of the `<description>` element.

---

# XML Path

```text
us-patent-grant
└── description
```

---

# Description

The `<description>` element contains the complete specification of the invention.

Unlike claims, the description is not divided into fixed XML elements like "Background", "Summary", or "Detailed Description". These sections are typically represented using headings (`<heading>`) and paragraphs (`<p>`).

---

# Complete Hierarchy

```text
description
├── @id (optional)
│
├── description-of-drawings (optional)
│   ├── heading
│   └── p[]
│
├── heading[]
│   └── #text
│
├── p[]
│   ├── @id (optional)
│   ├── #text
│   ├── b
│   ├── i
│   ├── u
│   ├── sup
│   ├── sub
│   ├── br
│   ├── figref
│   │   ├── @idref
│   │   └── #text
│   ├── claim-ref
│   │   ├── @idref
│   │   └── #text
│   ├── table-ref
│   │   ├── @idref
│   │   └── #text
│   ├── math
│   ├── inline-formula
│   ├── chemical-formula
│   ├── img
│   ├── ul
│   │   └── li[]
│   ├── ol
│   │   └── li[]
│   └── ...
│
├── table-wrap[]
│   ├── @id
│   ├── table
│   ├── caption
│   └── footnote
│
├── math[]
│
├── inline-formula[]
│
├── chemical-formula[]
│
├── sequence-listing (optional)
│
└── ...
```

---

# Tree

```text
us-patent-grant
└── description
    ├── description-of-drawings
    ├── heading[]
    ├── p[]
    ├── table-wrap[]
    ├── math[]
    ├── inline-formula[]
    ├── chemical-formula[]
    └── sequence-listing
```

---

# heading

Represents a section heading.

Examples

```text
BACKGROUND

SUMMARY

BRIEF DESCRIPTION OF THE DRAWINGS

DETAILED DESCRIPTION
```

Example

```xml
<heading>BACKGROUND</heading>
```

---

# p

Represents a paragraph.

Occurs

```text
1..n
```

Example

```xml
<p id="p-0001">
The present invention relates to agricultural machinery.
</p>
```

---

# Paragraph Hierarchy

```text
p
├── @id
├── #text
├── b
├── i
├── u
├── sup
├── sub
├── br
├── figref
├── claim-ref
├── table-ref
├── math
├── inline-formula
├── chemical-formula
├── img
├── ul
│   └── li[]
├── ol
│   └── li[]
└── ...
```

---

# description-of-drawings

Optional section describing each drawing figure.

Example

```xml
<description-of-drawings>

    <heading>BRIEF DESCRIPTION OF THE DRAWINGS</heading>

    <p>FIG. 1 illustrates...</p>

    <p>FIG. 2 illustrates...</p>

</description-of-drawings>
```

---

# figref

Reference to a figure.

Example

```xml
<figref idref="FIG-00001">
FIG. 1
</figref>
```

---

# claim-ref

Reference to another claim.

Example

```xml
<claim-ref idref="CLM-00001">
claim 1
</claim-ref>
```

---

# table-wrap

Represents a table.

```text
table-wrap
├── @id
├── caption
├── table
└── footnote
```

---

# Typical Structure

```xml
<description>

    <heading>BACKGROUND</heading>

    <p>
    The present invention relates to...
    </p>

    <heading>SUMMARY</heading>

    <p>
    According to one embodiment...
    </p>

    <heading>DETAILED DESCRIPTION</heading>

    <p>
    Referring to
    <figref idref="FIG-00001">FIG. 1</figref>,
    the apparatus...
    </p>

</description>
```

---

# Cardinality

```text
description                 1

heading                     0..n

p                           1..n

description-of-drawings     0..1

figref                      0..n

claim-ref                   0..n

table-wrap                  0..n

math                        0..n

inline-formula              0..n

chemical-formula            0..n

sequence-listing            0..1
```

---

# Notes

- The description is the largest section of a patent.
- Section titles such as "Background" and "Summary" are usually represented as `<heading>` elements.
- The actual content is stored in `<p>` elements.
- Figures, claims, and tables are referenced using dedicated XML elements rather than plain text.
- Some patents contain mathematical expressions, chemical formulas, sequence listings, or tables.
- A parser should preserve the order of headings, paragraphs, figures, and tables exactly as they appear in the XML.
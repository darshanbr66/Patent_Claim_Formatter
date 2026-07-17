# USPTO Patent Grant - Claims

This document describes the structure of the `<claims>` element.

---

# XML Path

```text
us-patent-grant
└── claims
```

---

# Description

The `<claims>` element contains every patent claim.

Each claim is represented by a `<claim>` element.

A patent contains one or more claims.

---

# Complete Hierarchy

```text
claims
└── claim[]
    ├── @id
    ├── @num
    ├── @claim-type (optional)
    ├── @status (optional)
    ├── claim-text[]
    │   ├── @id (optional)
    │   ├── #text
    │   ├── b
    │   ├── i
    │   ├── u
    │   ├── sup
    │   ├── sub
    │   ├── br
    │   ├── claim-ref
    │   │   ├── @idref
    │   │   └── #text
    │   ├── figref
    │   │   ├── @idref
    │   │   └── #text
    │   ├── table-ref
    │   │   ├── @idref
    │   │   └── #text
    │   ├── math
    │   ├── inline-formula
    │   ├── chemical-formula
    │   ├── img
    │   └── ...
    │
    ├── claim-text[]
    ├── claim-text[]
    └── ...
```

---

# Tree

```text
us-patent-grant
└── claims
    └── claim[]
        ├── @id
        ├── @num
        ├── @claim-type
        ├── @status
        └── claim-text[]
```

---

# claim

Represents a single patent claim.

Occurs

```text
1..n
```

Example

```xml
<claim id="CLM-00001" num="00001">
    ...
</claim>
```

---

# claim Attributes

```text
claim
├── @id
├── @num
├── @claim-type (optional)
└── @status (optional)
```

---

# claim-text

Contains the actual text of the claim.

A claim may contain one or more `<claim-text>` elements.

Example

```xml
<claim-text>
A planting apparatus comprising:
</claim-text>

<claim-text>
a frame;
</claim-text>

<claim-text>
a wheel assembly;
</claim-text>
```

---

# claim-text Hierarchy

```text
claim-text
├── #text
├── b
├── i
├── u
├── sup
├── sub
├── br
├── claim-ref
├── figref
├── table-ref
├── math
├── inline-formula
├── chemical-formula
├── img
└── ...
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

# figref

Reference to a drawing figure.

Example

```xml
<figref idref="FIG-00001">
FIG. 1
</figref>
```

---

# table-ref

Reference to a table.

Example

```xml
<table-ref idref="TBL-00001">
Table 1
</table-ref>
```

---

# Typical Structure

```xml
<claims>

    <claim id="CLM-00001" num="00001">

        <claim-text>
        A system comprising:
        </claim-text>

        <claim-text>
        a processor;
        </claim-text>

        <claim-text>
        a memory;
        </claim-text>

    </claim>

    <claim id="CLM-00002" num="00002">

        <claim-text>
        The system of
        <claim-ref idref="CLM-00001">claim 1</claim-ref>
        further comprising...
        </claim-text>

    </claim>

</claims>
```

---

# Cardinality

```text
claims                     1

claim[]                    1..n

claim-text[]               1..n

claim-ref                  0..n

figref                     0..n

table-ref                  0..n

math                       0..n

inline-formula             0..n
```

---

# Notes

- Every patent contains at least one claim.
- Claim numbering starts from 1.
- Independent and dependent claims use the same XML structure.
- A claim may be split into multiple `<claim-text>` elements.
- Formatting elements (`b`, `i`, `sup`, `sub`, etc.) may appear inside `<claim-text>`.
- References to other claims and figures are represented as child elements, not plain text.
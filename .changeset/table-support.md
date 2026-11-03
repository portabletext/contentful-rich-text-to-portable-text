---
'@portabletext/contentful-rich-text-to-portable-text': minor
---

feat: convert tables

Tables now convert to the nested `table`, `row` and `cell` shape `@portabletext/plugin-table` edits, with leading header rows counted in `headerRows`. Before, converting a document with a table threw `No transformer found for node type "table"`.

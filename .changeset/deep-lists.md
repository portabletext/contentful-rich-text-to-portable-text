---
'@portabletext/contentful-rich-text-to-portable-text': patch
---

fix: flatten lists nested four or more levels deep

Lists nested four or more levels deep now convert to one list block per item. Before, items from the fourth level down came back wrapped in arrays inside the result.

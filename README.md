# contentful-rich-text-to-portable-text

This package transforms data of the RichText type (used by Contentful) into a data structure representing the same content in Portable Text.

## Installation

```
npm i @portabletext/contentful-rich-text-to-portable-text
```

## Examples

### Simple transformation

```js
const { toPortableText } = require('@portabletext/contentful-rich-text-to-portable-text')

const richText = {
  "nodeType": "document",
  "data": {},
  "content": [
    {
      "nodeType": "heading-1",
      "data": {},
      "content": [
        {
          "nodeType": "text",
          "value": "Hello, everyone!",
          "marks": [],
          "data": {}
        }
      ]
    }
  ]
}


const portableText = toPortableText(richText)

// portableText is
[
  {
    "_type": "block",
    "_key": "heading-1",
    "style": "h1",
    "markDefs": [],
    "children": [
      {
        "_type": "span",
        "_key": "text",
        "marks": [],
        "text": "Hello, everyone!"
      }
    ]
  }
]
```

### Transformation with styling

```js
const { toPortableText } = require('@portabletext/contentful-rich-text-to-portable-text')

const richText = {
  nodeType: 'document',
  data: {},
  content: [
    {
      nodeType: 'heading-2',
      data: {},
      content: [
        {
          nodeType: 'text',
          value: 'Hello',
          marks: [{type: 'bold'}],
          data: {}
        },
        {
          nodeType: 'text',
          value: ', ',
          marks: [],
          data: {}
        },
        {
          nodeType: 'text',
          value: 'everyone!',
          marks: [{type: 'underline'}],
          data: {}
        }
      ]
    }
  ]
}

const portableText = toPortableText(richText)
// portableText is
[
  {
    "_type": "block",
    "_key": "heading-2",
    "style": "h2",
    "markDefs": [],
    "children": [
      {
        "_type": "span",
        "_key": "text",
        "marks": [
          "strong"
        ],
        "text": "Hello"
      },
      {
        "_type": "span",
        "_key": "text",
        "marks": [],
        "text": ", "
      },
      {
        "_type": "span",
        "_key": "text",
        "marks": [
          "underline"
        ],
        "text": "everyone!"
      }
    ]
  }
]
```

### Custom key generation via options.generateKey

```js
const uuid = require('uuid')
const { toPortableText } = require('@portabletext/contentful-rich-text-to-portable-text')

const richText = {
  "nodeType": "document",
  "data": {},
  "content": [
    {
      "nodeType": "heading-1",
      "data": {},
      "content": [
        {
          "nodeType": "text",
          "value": "Hello, everyone!",
          "marks": [],
          "data": {}
        }
      ]
    }
  ]
}

const portableText = toPortableText(richText, {
  generateKey: (node) => [node.nodeType, uuid()].join('-')
})

// portableText is
[
  {
    "_type": "block",
    "_key": "heading-1-83474017-970f-4450-b983-dc052027ef9b",
    "style": "h1",
    "markDefs": [],
    "children": [
      {
        "_type": "span",
        "_key": "text-33e92fc6-cc93-4441-8537-0eba5db9ad6a",
        "marks": [],
        "text": "Hello, everyone!"
      }
    ]
  }
]
```

### Custom transformation of HR node via options.transformers.hr

```js
const { toPortableText } = require('@portabletext/contentful-rich-text-to-portable-text')

const richText = {
  nodeType: 'document',
  data: {},
  content: [
    {
      nodeType: "heading-1",
      data: {},
      content: [
        {
          nodeType: "text",
          value: "Hello, everyone!",
          marks: [],
          data: {}
        }
      ]
    },
    {
      data: {},
      content: [],
      nodeType: 'hr'
    },
    {
      nodeType: 'paragraph',
      content: [
        {
          nodeType: 'text',
          value: "This is a little introduction. It's just a paragraph without any fancy stuff.",
          marks: [],
          data: {}
        }
      ],
      data: {}
    }
  ]
}

const portableText = toPortableText(data, {
  transformers: {
    hr: (node) => {
      return [
        {
          _type: "break",
          style: "lineBreak",
        },
      ];
    },
  }
})

// portableText is
[
  {
    "_type": "block",
    "_key": "heading-1",
    "style": "h1",
    "markDefs": [],
    "children": [
      {
        "_type": "span",
        "_key": "text",
        "marks": [],
        "text": "Hello, everyone!"
      }
    ]
  },
  {
    "_type": "break",
    "style": "lineBreak"
  },
  {
    "_type": "block",
    "_key": "paragraph",
    "style": "normal",
    "markDefs": [],
    "children": [
      {
        "_type": "span",
        "_key": "text",
        "marks": [],
        "text": "This is a little introduction. It's just a paragraph without any fancy stuff."
      }
    ]
  }
]

```

## Options

To control the transformation of specific nodes you may pass in a function to handle these with these properties of `options.transformers`

```
link?: Function
'entry-hyperlink'?: Function
'asset-hyperlink'?: Function
'embedded-asset-block'?: Function
'embedded-entry-block'?: Function
'embedded-entry-inline'?: Function
hr?: Function
```

Custom key generation is a function passed as `options.generateKey` which is expected to return a `string`.

## Caveats

- You will need to specify your own serialization for HR tags. See examples.
- Blockquotes in RichText and PortableText do not currently map directly. You may lose newlines in this step and you should verify the output and make any needed adjustments.

## License

MIT-licensed. See LICENSE.

export default {
  nodeType: 'blockquote',
  content: [
    {
      nodeType: 'paragraph',
      content: [
        {
          nodeType: 'text',
          value: 'Single line quote, with a ',
          marks: [],
          data: {}
        },
        {
          nodeType: 'hyperlink',
          content: [
            {
              nodeType: 'text',
              value: 'link',
              marks: [],
              data: {}
            }
          ],
          data: {
            uri: 'https://quotes.com'
          }
        },
        {
          nodeType: 'text',
          value: '!',
          marks: [],
          data: {}
        }
      ],
      data: {}
    },
    {
      nodeType: 'paragraph',
      content: [
        {
          nodeType: 'text',
          value: 'Bold',
          marks: [
            {
              type: 'bold'
            }
          ],
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
          value: 'italics',
          marks: [
            {
              type: 'italic'
            }
          ],
          data: {}
        },
        {
          nodeType: 'text',
          value: ' and ',
          marks: [],
          data: {}
        },
        {
          nodeType: 'text',
          value: 'underline',
          marks: [
            {
              type: 'underline'
            }
          ],
          data: {}
        }
      ],
      data: {}
    },
    {
      nodeType: 'paragraph',
      content: [
        {
          nodeType: 'text',
          value: 'Can even do ',
          marks: [],
          data: {}
        },
        {
          nodeType: 'text',
          value: 'code in here',
          marks: [
            {
              type: 'code'
            }
          ],
          data: {}
        }
      ],
      data: {}
    }
  ],
  data: {}
}

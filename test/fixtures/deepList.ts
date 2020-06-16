export default {
  nodeType: 'unordered-list',
  data: {},
  content: [
    {
      nodeType: 'list-item',
      data: {},
      content: [
        {
          nodeType: 'paragraph',
          data: {},
          content: [
            {
              nodeType: 'text',
              value: 'Simple lists are supported, of course.',
              marks: [],
              data: {}
            }
          ]
        },
        {
          nodeType: 'ordered-list',
          data: {},
          content: [
            {
              nodeType: 'list-item',
              data: {},
              content: [
                {
                  nodeType: 'paragraph',
                  data: {},
                  content: [
                    {
                      nodeType: 'text',
                      value: 'Deeper is cooler?',
                      marks: [],
                      data: {}
                    }
                  ]
                }
              ]
            },
            {
              nodeType: 'list-item',
              data: {},
              content: [
                {
                  nodeType: 'paragraph',
                  data: {},
                  content: [
                    {
                      nodeType: 'text',
                      value: 'Especially with multiple items?',
                      marks: [{type: 'bold'}],
                      data: {}
                    }
                  ]
                }
              ]
            }
          ]
        },
        {
          nodeType: 'paragraph',
          data: {},
          content: [
            {
              nodeType: 'text',
              value: "Even when they're split",
              marks: [],
              data: {}
            }
          ]
        }
      ]
    },
    {
      nodeType: 'list-item',
      data: {},
      content: [
        {
          nodeType: 'paragraph',
          data: {},
          content: [
            {
              nodeType: 'text',
              value: 'Trailing bullet at level 1.',
              marks: [],
              data: {}
            }
          ]
        }
      ]
    }
  ]
}

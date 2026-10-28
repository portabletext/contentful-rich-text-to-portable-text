const text = (value: string) => ({nodeType: 'text', value, marks: [], data: {}})

const paragraph = (value: string) => ({nodeType: 'paragraph', data: {}, content: [text(value)]})

const listItem = (...content: object[]) => ({nodeType: 'list-item', data: {}, content})

export default {
  nodeType: 'document',
  data: {},
  content: [
    {
      nodeType: 'table',
      data: {},
      content: [
        {
          nodeType: 'table-row',
          data: {},
          content: [
            {
              nodeType: 'table-cell',
              data: {},
              content: [
                paragraph('Ingredients'),
                {
                  nodeType: 'unordered-list',
                  data: {},
                  content: [
                    listItem(paragraph('Flour'), {
                      nodeType: 'ordered-list',
                      data: {},
                      content: [
                        listItem(paragraph('Sifted'), {
                          nodeType: 'unordered-list',
                          data: {},
                          content: [listItem(paragraph('Twice'))]
                        })
                      ]
                    }),
                    listItem(paragraph('Sugar'))
                  ]
                }
              ]
            }
          ]
        }
      ]
    }
  ]
}

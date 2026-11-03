const paragraph = (value: string) => ({
  nodeType: 'paragraph',
  data: {},
  content: [{nodeType: 'text', value, marks: [], data: {}}]
})

const list = (nodeType: string, ...content: object[]) => ({nodeType, data: {}, content})

const listItem = (...content: object[]) => ({nodeType: 'list-item', data: {}, content})

export default {
  nodeType: 'document',
  data: {},
  content: [
    list(
      'unordered-list',
      listItem(
        paragraph('One'),
        list(
          'ordered-list',
          listItem(
            paragraph('Two'),
            list(
              'unordered-list',
              listItem(paragraph('Three'), list('ordered-list', listItem(paragraph('Four'))))
            )
          )
        )
      ),
      listItem(paragraph('Back to one'))
    )
  ]
}

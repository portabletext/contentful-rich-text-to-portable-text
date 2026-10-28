const text = (value: string, marks: string[] = []) => ({
  nodeType: 'text',
  value,
  marks: marks.map(type => ({type})),
  data: {}
})

const paragraph = (...content: object[]) => ({nodeType: 'paragraph', data: {}, content})

const cell = (nodeType: string, ...content: object[]) => ({nodeType, data: {}, content})

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
            cell('table-header-cell', paragraph(text('Year'))),
            cell('table-header-cell', paragraph(text('Sales')))
          ]
        },
        {
          nodeType: 'table-row',
          data: {},
          content: [
            cell('table-cell', paragraph(text('2022'))),
            cell('table-cell', paragraph(text('$8,000', ['bold'])), paragraph(text('Best year')))
          ]
        },
        {
          nodeType: 'table-row',
          data: {},
          content: [cell('table-cell', paragraph(text('2023')))]
        }
      ]
    }
  ]
}

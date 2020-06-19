export interface SanityFieldType extends Record<string, any> {
  name: string
  type: string
  title?: string
}

export interface SanitySchemaType extends Record<string, any> {
  type: 'object' | 'document'
  name: string
  fields: SanityFieldType[]
}

export interface PTNode {
  _type: string
  _key: string
}

export interface PTBreak extends PTNode {
  _type: 'break'
  _key: string
  style: 'lineBreak' | 'readMore'
}

export interface PTSpan extends PTNode {
  _type: 'span'
  _key: string
  marks: string[]
  text: string
}

export interface PTMark extends PTNode {
  _type: string
  _key: string
  [key: string]: any
}

export interface PTBlock extends PTNode {
  _type: 'block'
  style: string
  children: PTNode[]
  markDefs: PTMark[]
  listItem?: string
  level?: number
}

export interface PTListItem extends PTBlock {
  listItem: string
  level: number
}

export interface PTVirtualList extends PTNode {
  _type: 'virtualList'
  type: string
  level: number
  children: PTNode[]
}

export interface PTLink extends PTMark {
  _type: 'link'
  href: string
}

export interface PTReference extends PTNode {
  _type: 'reference'
  _ref: string
  _weak?: boolean
}

export const markMapping: {[key: string]: string} = {
  bold: 'strong',
  italic: 'em'
}

export function isPTBlockNode(node: PTNode): node is PTBlock {
  return node._type === 'block'
}

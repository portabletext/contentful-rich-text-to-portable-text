import {
  PTNode,
  PTBlock,
  PTMark,
  PTSpan,
  markMapping,
  PTVirtualList,
  isPTBlockNode,
  PTListItem,
  PTReference
} from './ptTypes'
import {
  CFNode,
  CFDocumentNode,
  CFHeadingNode,
  CFContainerNode,
  isCFTextNode,
  CFHyperlinkNode,
  CFTextNode,
  CFUnorderedListNode,
  CFOrderedListNode,
  CFListItemNode,
  CFBlockQuoteNode,
  CFEmbeddedEntryBlockNode,
  CFEmbeddedEntryInlineNode,
  CFAssetHyperlinkNode,
  CFEntryHyperlinkNode
} from './cfTypes'

type KeyGenerator = (node: CFNode | CFContainerNode, options: TransformOptions) => string

export interface TransformOptions {
  generateKey: KeyGenerator
  depth?: number
  referenceResolver?: Function
  transformers: {
    link?: Function
    'entry-hyperlink'?: Function
    'asset-hyperlink'?: Function
    'embedded-asset-block'?: Function
    'embedded-entry-block'?: Function
    'embedded-entry-inline'?: Function
    hr?: Function
  }
}

const generateKey = (node: CFNode) => node.nodeType
const defaultTransformers: {[key: string]: Function} = {
  document,
  hr: skip,
  blockquote,
  paragraph: block,
  hyperlink: link,
  'heading-1': heading,
  'heading-2': heading,
  'heading-3': heading,
  'heading-4': heading,
  'heading-5': heading,
  'heading-6': heading,
  'ordered-list': list,
  'unordered-list': list,
  'entry-hyperlink': assetOrEntryLink,
  'asset-hyperlink': assetOrEntryLink,
  'embedded-asset-block': reference,
  'embedded-entry-block': reference,
  'embedded-entry-inline': reference
}

function skip(): PTNode[] {
  return []
}

function list(
  node: CFUnorderedListNode | CFOrderedListNode,
  options: TransformOptions,
  parent?: CFNode
): PTNode[] {
  const depth = options.depth || 1
  const type = node.nodeType === 'ordered-list' ? 'number' : 'bullet'
  const children = node.content.map(item => listItem(item, options, {type}))
  const listNode: PTVirtualList = {
    _type: 'virtualList',
    _key: options.generateKey(node, options),
    type,
    level: depth,
    children: children.reduce((acc, group) => [...acc, ...group], [])
  }

  return !parent || parent.nodeType === 'document' ? flattenList(listNode) : [listNode]
}

function listItem(
  node: CFListItemNode,
  options: TransformOptions,
  parent: {type: 'number' | 'bullet'}
): PTNode[] {
  const nodes: PTNode[] = []
  for (let i = 0; i < node.content.length; i++) {
    const child = node.content[i]
    toPortableText(child, options, node).forEach(ptNode => {
      if (isPTBlockNode(ptNode)) {
        nodes.push({...ptNode, level: options.depth, listItem: parent.type} as PTListItem)
      } else {
        nodes.push(ptNode)
      }
    })
  }
  return nodes
}

function link(
  node: CFHyperlinkNode,
  options: TransformOptions
): {nodes: PTSpan[]; markDefs: PTMark[]} {
  const {nodes, linkKey} = parseLinkNode(node, options)
  const markDefs: PTMark[] = [{_type: 'link', _key: linkKey, href: node.data.uri}]

  return {nodes, markDefs}
}

function parseLinkNode(
  node: CFHyperlinkNode | CFEntryHyperlinkNode | CFAssetHyperlinkNode,
  options: TransformOptions
): {nodes: PTSpan[]; linkKey: string} {
  const linkKey = options.generateKey(node, options)

  const nodes = node.content
    .filter(isCFTextNode)
    .map(child => convertSpan(child, options))
    .map(span => ({...span, marks: span.marks.concat(linkKey)}))

  return {nodes, linkKey}
}

function assetOrEntryLink(
  node: CFAssetHyperlinkNode | CFEntryHyperlinkNode,
  options: TransformOptions
): {nodes: PTSpan[]; markDefs: PTMark[]} {
  const {nodes} = parseLinkNode(node, options)
  let markDefs: PTMark[] = reference(node, options)

  return {nodes, markDefs}
}

function reference(
  node:
    | CFEmbeddedEntryBlockNode
    | CFEmbeddedEntryInlineNode
    | CFAssetHyperlinkNode
    | CFEntryHyperlinkNode,
  options: TransformOptions
): PTReference[] {
  if (options.referenceResolver) {
    return [
      Object.assign(
        {
          _key: options.generateKey(node, options)
        },
        options.referenceResolver(node, options)
      )
    ]
  }

  return [
    {
      _type: 'reference',
      _key: options.generateKey(node, options),
      _ref: node.data.target.sys.id
    }
  ]
}

function heading(node: CFHeadingNode, options: TransformOptions): PTBlock[] {
  const level = node.nodeType.slice(-1)
  const style = `h${level}`
  const block = convertBlock(node, options)
  return [{...block, style}]
}

function blockquote(node: CFBlockQuoteNode, options: TransformOptions): PTBlock[] {
  const children: PTBlock[] = []
  let markDefs: PTMark[] = []
  for (let i = 0; i < node.content.length; i++) {
    const block = convertBlock(node.content[i], options)
    markDefs = markDefs.concat(block.markDefs)
    children.push(block)
  }

  return [
    {
      _type: 'block',
      _key: options.generateKey(node, options),
      style: 'blockquote',
      markDefs,
      // We only want the childrens children (they are blocks, but we need their
      // paragraphs etc).
      children: flatten(children.map(c => c.children))
    }
  ]
}

function block(node: CFContainerNode, options: TransformOptions): PTBlock[] {
  return [convertBlock(node, options)]
}

function document(node: CFDocumentNode, options: TransformOptions): PTNode[] {
  return (node.content || []).reduce(
    (nodes, node) => [...nodes, ...toPortableText(node, {...options, depth: 0})],
    [] as PTNode[]
  )
}

function convertSpan(node: CFTextNode, options: TransformOptions): PTSpan {
  return {
    _type: 'span',
    _key: options.generateKey(node, options),
    marks: node.marks.map(mark => markMapping[mark.type] || mark.type),
    text: node.value
  }
}

function convertBlock(node: CFContainerNode, options: TransformOptions): PTBlock {
  const markDefinitions: PTMark[] = []
  const children: PTNode[] = []
  const transformers: {[key: string]: Function | undefined} =
    options.transformers || defaultTransformers

  for (let i = 0; i < node.content.length; i++) {
    const child = node.content[i]
    const transformer = transformers[child.nodeType]
    if (isCFTextNode(child)) {
      children.push(convertSpan(child, options))
    } else if (transformer) {
      // Not all these transformers return the same result, should fix this.
      const result = transformer(child, options)
      if (result.nodes) {
        children.push(...result.nodes)
        markDefinitions.push(...result.markDefs)
      } else if (Array.isArray(result)) {
        children.push(...result)
      } else {
        children.push(result)
      }
    } else {
      throw new Error(`No transformer found for node type "${child.nodeType}"`)
    }
  }

  return {
    _type: 'block',
    _key: options.generateKey(node, options),
    style: 'normal',
    markDefs: markDefinitions,
    children
  }
}

function flattenList(list: PTVirtualList): PTNode[] {
  return list.children.map(child => (isVirtualList(child) ? flattenList(child) : child)) as PTNode[]
}

function isVirtualList(node: PTNode): node is PTVirtualList {
  return node._type === 'virtualList'
}

function increaseDepth(options: TransformOptions): TransformOptions {
  return {...options, depth: (options.depth || 0) + 1}
}

function isNodeArray(node: PTNode | PTNode[]): node is PTNode[] {
  return Array.isArray(node)
}

function flatten(nodes: (PTNode | PTNode[])[]): PTNode[] {
  const flat: PTNode[] = []
  for (let i = 0; i < nodes.length; i++) {
    const node = nodes[i]
    if (isNodeArray(node)) {
      flat.push(...node)
    } else {
      flat.push(node)
    }
  }
  return flat
}

export function toPortableText(
  data: CFNode,
  options?: Partial<TransformOptions>,
  parent?: CFNode
): PTNode[] {
  const transformers: {[key: string]: Function | undefined} = {
    ...defaultTransformers,
    ...(options ? options.transformers : {})
  }

  const opts: TransformOptions = {generateKey, depth: 0, ...options, transformers}
  const transformer = transformers[data.nodeType]
  if (!transformer) {
    throw new Error(`No transformer found for node type "${data.nodeType}"`)
  }

  return flatten(transformer(data, increaseDepth(opts), parent))
}

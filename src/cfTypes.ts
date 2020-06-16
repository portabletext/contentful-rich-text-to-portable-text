export interface CFNode {
  nodeType: string
  data: {[key: string]: any}
  content?: CFNode[]
}

export interface CFContainerNode extends CFNode {
  content: CFNode[]
}

export interface CFDocumentNode extends CFContainerNode {
  nodeType: 'document'
}

export interface CFHeadingNode extends CFContainerNode {
  nodeType: 'heading-1' | 'heading-2' | 'heading-3' | 'heading-4' | 'heading-5' | 'heading-6'
}

export interface CFParagraphNode extends CFContainerNode {
  nodeType: 'paragraph'
}

export interface CFTextNode extends CFNode {
  nodeType: 'text'
  value: string
  marks: CFMark[]
}

export interface CFHyperlinkNode extends CFContainerNode {
  nodeType: 'hyperlink'
  data: {uri: string}
}

export interface CFEntryHyperlinkNode extends CFContainerNode {
  nodeType: 'entry-hyperlink'
  data: {target: CFEntryReference}
}

export interface CFAssetHyperlinkNode extends CFContainerNode {
  nodeType: 'asset-hyperlink'
  data: {target: CFAssetReference}
}

export interface CFListItemNode extends CFContainerNode {
  nodeType: 'list-item'
}

export interface CFUnorderedListNode extends CFContainerNode {
  nodeType: 'unordered-list'
  content: CFListItemNode[]
}

export interface CFOrderedListNode extends CFContainerNode {
  nodeType: 'ordered-list'
  content: CFListItemNode[]
}

export interface CFHorizontalRuleNode extends CFContainerNode {
  nodeType: 'hr'
}

export interface CFBlockQuoteNode extends CFContainerNode {
  nodeType: 'blockquote'
}

export interface CFEmbeddedEntryBlockNode extends CFContainerNode {
  nodeType: 'embedded-entry-block'
  data: {
    target: CFEntryReference
  }
}

export interface CFEmbeddedEntryInlineNode extends CFContainerNode {
  nodeType: 'embedded-entry-inline'
  data: {
    target: CFEntryReference
  }
}

export interface CFEmbeddedAssetBlockNode extends CFContainerNode {
  nodeType: 'embedded-asset-block'
  data: {
    target: CFAssetReference
  }
}

export interface CFEntryReference {
  sys: {
    id: string
    type: 'Link'
    linkType: 'Entry'
  }
}

export interface CFAssetReference {
  sys: {
    id: string
    type: 'Link'
    linkType: 'Asset'
  }
}

export type CFReference = CFEntryReference | CFAssetReference

export interface CFMark {
  type: 'bold' | 'italic' | 'underline' | 'code'
}

export function isCFTextNode(node: CFNode): node is CFTextNode {
  return node.nodeType === 'text'
}

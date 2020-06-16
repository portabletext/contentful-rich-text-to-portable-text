import objectHash from 'object-hash'
import {toPortableText, TransformOptions} from '../src'
import {CFNode, CFAssetHyperlinkNode} from '../src/cfTypes'
import heading from './fixtures/heading'
import marks from './fixtures/marks'
import doubleMarks from './fixtures/doubleMarks'
import paragraph from './fixtures/paragraph'
import deepList from './fixtures/deepList'
import link from './fixtures/link'
import list from './fixtures/list'
import allFeatures from './fixtures/allFeatures'
import {PTLink} from 'ptTypes'

const generateKey = (node: CFNode) => `k${objectHash(node).slice(0, 7)}`
const options = {generateKey}

describe('toPortableText', () => {
  it('basic h1', () => {
    const pt = toPortableText(heading, options)
    expect(pt).toHaveLength(1)
    expect(pt[0]).toMatchObject({
      _type: 'block',
      style: 'h1',
      markDefs: [],
      children: [{_type: 'span', marks: [], text: 'Hello, everyone!'}]
    })
  })

  it('basic marks', () => {
    const pt = toPortableText(marks, options)
    expect(pt).toHaveLength(1)
    expect(pt[0]).toMatchObject({
      _type: 'block',
      style: 'h2',
      markDefs: [],
      children: [
        {_type: 'span', marks: ['strong'], text: 'Hello'},
        {_type: 'span', marks: [], text: ', '},
        {_type: 'span', marks: ['underline'], text: 'everyone!'}
      ]
    })
  })

  it('double marks', () => {
    const pt = toPortableText(doubleMarks, options)
    expect(pt).toHaveLength(1)
    expect(pt[0]).toMatchObject({
      _type: 'block',
      style: 'h3',
      markDefs: [],
      children: [
        {_type: 'span', marks: ['strong', 'em'], text: 'Hello'},
        {_type: 'span', marks: [], text: ', '},
        {_type: 'span', marks: ['underline'], text: 'everyone!'}
      ]
    })
  })

  it('paragraph', () => {
    const pt = toPortableText(paragraph, options)
    expect(pt).toHaveLength(1)
    expect(pt[0]).toMatchObject({
      _type: 'block',
      style: 'normal',
      markDefs: [],
      children: [
        {
          _type: 'span',
          marks: [],
          text: "This is a little introduction. It's just a paragraph without any fancy stuff."
        }
      ]
    })
  })

  it('link', () => {
    const pt = toPortableText(link, options)
    expect(pt).toHaveLength(1)
    expect(pt[0]).toMatchObject({
      _type: 'block',
      style: 'normal',
      markDefs: [
        {
          _type: 'link',
          href: 'https://www.techopedia.com/definition/23666/platform-agnostic'
        }
      ],
      children: [
        {
          _type: 'span',
          _key: 'k1864115',
          marks: [],
          text: 'When representing text with formatting (such as '
        },
        {
          _type: 'span',
          marks: ['strong'],
          text: 'bold'
        },
        {
          _type: 'span',
          marks: [],
          text: ', '
        },
        {
          _type: 'span',
          marks: ['em'],
          text: 'italic'
        },
        {
          _type: 'span',
          marks: [],
          text: ', '
        },
        {
          _type: 'span',
          marks: ['underline'],
          text: 'underline'
        },
        {
          _type: 'span',
          marks: [],
          text: ' or '
        },
        {
          _type: 'span',
          marks: ['code'],
          text: 'code'
        },
        {
          _type: 'span',
          marks: [],
          text: '), you want to do this in a '
        },
        {
          _type: 'span',
          marks: ['k933711f'],
          text: 'platform-agnostic'
        },
        {
          _type: 'span',
          marks: [],
          text: ' way, so you are able to render it on any device/surface.'
        }
      ]
    })
  })

  it('unordered list', () => {
    const pt = toPortableText(list, options)
    expect(pt).toHaveLength(2)
    expect(pt[0]).toMatchObject({
      _type: 'block',
      style: 'normal',
      listItem: 'bullet',
      level: 1,
      markDefs: [],
      children: [
        {
          _type: 'span',
          marks: [],
          text: 'Simple lists are supported, of course.'
        }
      ]
    })
    expect(pt[1]).toMatchObject({
      _type: 'block',
      style: 'normal',
      listItem: 'bullet',
      level: 1,
      markDefs: [],
      children: [
        {
          _type: 'span',
          marks: [],
          text: "It's full of "
        },
        {
          _type: 'span',
          marks: ['strong'],
          text: 'bullets'
        }
      ]
    })
  })

  it('deep lists', () => {
    const pt = toPortableText(deepList, options)
    expect(pt[0]).toMatchObject({
      _type: 'block',
      style: 'normal',
      listItem: 'bullet',
      level: 1,
      markDefs: [],
      children: [
        {
          _type: 'span',
          _key: 'k6494432',
          marks: [],
          text: 'Simple lists are supported, of course.'
        }
      ]
    })

    expect(pt[1]).toMatchObject({
      _type: 'block',
      style: 'normal',
      listItem: 'number',
      level: 2,
      markDefs: [],
      children: [
        {
          _type: 'span',
          _key: 'k2a71eca',
          marks: [],
          text: 'Deeper is cooler?'
        }
      ]
    })

    expect(pt[2]).toMatchObject({
      _type: 'block',
      style: 'normal',
      listItem: 'number',
      level: 2,
      markDefs: [],
      children: [
        {
          _type: 'span',
          _key: 'k3c2b38c',
          marks: ['strong'],
          text: 'Especially with multiple items?'
        }
      ]
    })

    expect(pt[3]).toMatchObject({
      _type: 'block',
      _key: 'k4f770d8',
      style: 'normal',
      markDefs: [],
      children: [
        {
          _type: 'span',
          _key: 'k25f5438',
          marks: [],
          text: "Even when they're split"
        }
      ],
      level: 1,
      listItem: 'bullet'
    })

    expect(pt[4]).toMatchObject({
      _type: 'block',
      style: 'normal',
      listItem: 'bullet',
      level: 1,
      markDefs: [],
      children: [
        {
          _type: 'span',
          _key: 'k2005001',
          marks: [],
          text: 'Trailing bullet at level 1.'
        }
      ]
    })
  })

  it('supports all features', () => {
    const pt = toPortableText(allFeatures, options)
    expect(pt).toMatchSnapshot()
  })

  it('can control asset handling', () => {
    const pt = toPortableText(allFeatures, {
      ...options,
      transformers: {
        'asset-hyperlink': (node: CFAssetHyperlinkNode, options: TransformOptions): PTLink[] => {
          const link = options.transformers.link()
          return [
            {
              _type: 'link',
              _key: options.generateKey(node, options),
              href: 'https://foo.bar'
            }
          ]
          //const target = console.log(node, void options)
          //return []
        }
      }
    })
    expect(pt).toMatchSnapshot()
  })
})

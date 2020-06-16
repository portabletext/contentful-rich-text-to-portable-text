export default {
  nodeType: 'document',
  data: {},
  content: [
    {
      nodeType: 'heading-1',
      data: {},
      content: [
        {
          nodeType: 'text',
          value: 'Hello, everyone!',
          marks: [],
          data: {}
        }
      ]
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
    },
    {
      nodeType: 'heading-2',
      content: [
        {
          nodeType: 'text',
          value: 'Background',
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
          value: 'When representing text with formatting (such as ',
          marks: [],
          data: {}
        },
        {
          nodeType: 'text',
          value: 'bold',
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
          value: 'italic',
          marks: [
            {
              type: 'italic'
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
          value: 'underline',
          marks: [
            {
              type: 'underline'
            }
          ],
          data: {}
        },
        {
          nodeType: 'text',
          value: ' or ',
          marks: [],
          data: {}
        },
        {
          nodeType: 'text',
          value: 'code',
          marks: [
            {
              type: 'code'
            }
          ],
          data: {}
        },
        {
          nodeType: 'text',
          value: '), you want to do this in a ',
          marks: [],
          data: {}
        },
        {
          nodeType: 'hyperlink',
          content: [
            {
              nodeType: 'text',
              value: 'platform-agnostic',
              marks: [],
              data: {}
            }
          ],
          data: {
            uri: 'https://www.techopedia.com/definition/23666/platform-agnostic'
          }
        },
        {
          nodeType: 'text',
          value: ' way, so you are able to render it on any device/surface.',
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
          value: 'The situation gets more complex when you want to combine ',
          marks: [],
          data: {}
        },
        {
          nodeType: 'hyperlink',
          data: {
            uri: 'https://multiple.com/'
          },
          content: [
            {
              nodeType: 'text',
              value: 'multiple',
              marks: [
                {
                  type: 'bold'
                },
                {
                  type: 'italic'
                }
              ],
              data: {}
            }
          ]
        },
        {
          nodeType: 'text',
          value: ' formatting options, or when several "marks" are split ',
          marks: [],
          data: {}
        },
        {
          nodeType: 'text',
          value: 'across ',
          marks: [
            {
              type: 'bold'
            }
          ],
          data: {}
        },
        {
          nodeType: 'text',
          value: 'multiple',
          marks: [
            {
              type: 'bold'
            },
            {
              type: 'underline'
            }
          ],
          data: {}
        },
        {
          nodeType: 'text',
          value: ' words',
          marks: [
            {
              type: 'bold'
            }
          ],
          data: {}
        },
        {
          nodeType: 'text',
          value: '.',
          marks: [],
          data: {}
        }
      ],
      data: {}
    },
    {
      nodeType: 'unordered-list',
      foo: 'root',
      content: [
        {
          nodeType: 'list-item',
          data: {},
          content: [
            {
              nodeType: 'paragraph',
              content: [
                {
                  nodeType: 'text',
                  value: 'Simple lists are supported, of course.',
                  marks: [],
                  data: {}
                }
              ],
              data: {}
            },
            {
              nodeType: 'unordered-list',
              content: [
                {
                  nodeType: 'list-item',
                  content: [
                    {
                      nodeType: 'paragraph',
                      content: [
                        {
                          nodeType: 'text',
                          value: 'Indented ones as well',
                          marks: [],
                          data: {}
                        }
                      ],
                      data: {}
                    },
                    {
                      nodeType: 'unordered-list',
                      content: [
                        {
                          nodeType: 'list-item',
                          content: [
                            {
                              nodeType: 'paragraph',
                              content: [
                                {
                                  nodeType: 'text',
                                  value: "But you can't skip levels.",
                                  marks: [],
                                  data: {}
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
                  ],
                  data: {}
                }
              ],
              data: {}
            }
          ]
        },
        {
          nodeType: 'list-item',
          content: [
            {
              nodeType: 'paragraph',
              content: [
                {
                  nodeType: 'text',
                  value: 'How these are represented in the same list is an interesting question.',
                  marks: [],
                  data: {}
                }
              ],
              data: {}
            }
          ],
          data: {}
        }
      ],
      data: {}
    },
    {
      nodeType: 'hr',
      content: [],
      data: {}
    },
    {
      nodeType: 'heading-4',
      content: [
        {
          nodeType: 'text',
          value: 'Another thing to note',
          marks: [],
          data: {}
        }
      ],
      data: {}
    },
    {
      nodeType: 'ordered-list',
      content: [
        {
          nodeType: 'list-item',
          data: {},
          content: [
            {
              nodeType: 'paragraph',
              content: [
                {
                  nodeType: 'text',
                  value:
                    "Ordered lists are also a thing. I'm assuming they're implemented the same as bullet lists.",
                  marks: [],
                  data: {}
                }
              ],
              data: {}
            }
          ]
        },
        {
          nodeType: 'list-item',
          content: [
            {
              nodeType: 'paragraph',
              content: [
                {
                  nodeType: 'text',
                  value: 'Cause that would make sense.',
                  marks: [],
                  data: {}
                }
              ],
              data: {}
            }
          ],
          data: {}
        }
      ],
      data: {}
    },
    {
      nodeType: 'hr',
      content: [],
      data: {}
    },
    {
      nodeType: 'blockquote',
      content: [
        {
          nodeType: 'paragraph',
          data: {},
          content: [
            {
              nodeType: 'text',
              value: 'It would make sense.\n- Espen',
              marks: [],
              data: {}
            }
          ]
        }
      ],
      data: {}
    },
    {
      nodeType: 'hr',
      content: [],
      data: {}
    },
    {
      nodeType: 'paragraph',
      content: [
        {
          nodeType: 'text',
          value: "Here's a reference to an entry as a block level thing:",
          marks: [],
          data: {}
        }
      ],
      data: {}
    },
    {
      nodeType: 'embedded-entry-block',
      content: [],
      data: {
        target: {
          sys: {
            id: 'beer-1572281',
            type: 'Link',
            linkType: 'Entry'
          }
        }
      }
    },
    {
      nodeType: 'paragraph',
      content: [
        {
          nodeType: 'text',
          value: 'And ',
          marks: [],
          data: {}
        },
        {
          nodeType: 'entry-hyperlink',
          content: [
            {
              nodeType: 'text',
              value: 'here',
              marks: [],
              data: {}
            }
          ],
          data: {
            target: {
              sys: {
                id: 'beer-1572281',
                type: 'Link',
                linkType: 'Entry'
              }
            }
          }
        },
        {
          nodeType: 'text',
          value: ' is an inline reference to one. Another option is to link to an ',
          marks: [],
          data: {}
        },
        {
          nodeType: 'asset-hyperlink',
          content: [
            {
              nodeType: 'text',
              value: 'asset',
              marks: [],
              data: {}
            }
          ],
          data: {
            target: {
              sys: {
                id: '1dLJ4l0QwoKqCSEGcEsyAm',
                type: 'Link',
                linkType: 'Asset'
              }
            }
          }
        },
        {
          nodeType: 'text',
          value: '.',
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
          value: "Here's an inline ",
          marks: [],
          data: {}
        },
        {
          nodeType: 'text',
          data: {},
          value: 'entry:',
          marks: [
            {
              type: 'bold'
            }
          ]
        },
        {
          nodeType: 'embedded-entry-inline',
          data: {
            target: {
              sys: {
                id: 'beer-1572281',
                type: 'Link',
                linkType: 'Entry'
              }
            }
          },
          content: []
        },
        {
          nodeType: 'text',
          value: 'which',
          marks: [
            {
              type: 'bold'
            }
          ],
          data: {}
        },
        {
          nodeType: 'text',
          value: ' is pretty cool.',
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
          value: 'Who would have thought you could embed assets, huh?',
          marks: [],
          data: {}
        }
      ],
      data: {}
    },
    {
      nodeType: 'embedded-asset-block',
      content: [],
      data: {
        target: {
          sys: {
            id: '3LJQayn0FiaYi8K2m6KMia',
            type: 'Link',
            linkType: 'Asset'
          }
        }
      }
    },
    {
      nodeType: 'paragraph',
      content: [
        {
          nodeType: 'text',
          value: "That's it for today? I think that's all the features it supports.",
          marks: [],
          data: {}
        }
      ],
      data: {}
    }
  ]
}

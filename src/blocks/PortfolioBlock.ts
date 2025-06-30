/**
 * @fileoverview Portfolio block configuration for Payload CMS
 * @module PortfolioBlock
 */

import { Block } from 'payload'

export const PortfolioBlock: Block = {
  slug: 'portfolio',
  fields: [
    {
      name: 'portfolio',
      label: 'Portfolio',
      type: 'blocks',
      blocks: [
        {
          slug: 'project',
          fields: [
            {
              name: 'media',
              type: 'upload',
              relationTo: 'media',
              required: true,
            },
            {
              name: 'thumbnail',
              type: 'upload',
              relationTo: 'media',
            },
            {
              name: 'title',
              type: 'text',
              required: true,
            },
            {
              name: 'description',
              type: 'richText',
              required: true,
            },
            {
              name: 'mediaType',
              type: 'text',
            },
            {
              name: 'link',
              type: 'text',
              required: true,
            },
            {
              name: 'client',
              type: 'text',
            },
            {
              name: 'year',
              type: 'number',
            },
          ],
        },
    ],
    },
  ],
}
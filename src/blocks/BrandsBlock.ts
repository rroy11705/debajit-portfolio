/**
 * @fileoverview Brands block configuration for Payload CMS
 * @module BrandsBlock
 */

import { Block } from 'payload'

export const BrandsBlock: Block = {
  slug: 'brands',
  fields: [
    {
      name: 'brands',
      label: 'Brands',
      type: 'blocks',
      blocks: [
        {
          slug: 'brand',
          fields: [
            {
              name: 'brand',
              type: 'upload',
              relationTo: 'media',
            },
          ],
        },
    ],
    },
  ],
}
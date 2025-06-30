/**
 * @fileoverview About block configuration for Payload CMS
 * @module AboutBlock
 */

import { Block } from 'payload'

export const AboutBlock: Block = {
  slug: 'about',
  fields: [
    {
      name: 'aboutVideoLink',
      type: 'text',
      required: true,
    },
    {
      name: 'aboutVideoThumb',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
  ],
}
/**
 * @fileoverview Hero block configuration for Payload CMS
 * @module HeroBlock
 */

import { Block } from 'payload'

export const HeroBlock: Block = {
  slug: 'hero',
  fields: [
    {
      label: 'Heading',
      type: 'collapsible',
      fields: [
        // required
        {
          name: 'title',
          type: 'text',
          required: true,
        },
        {
          name: 'highlightedText',
          type: 'text',
          required: true,
        },
      ]
    },
    {
      name: 'subheading',
      type: 'text',
      required: true,
    },
    {
      name: 'tagline',
      type: 'text',
    },
    {
      label: "How i work?",
      name: 'howIWork',
      type: 'blocks',
      blocks: [
				{
					slug: 'howIWork',
					fields: [
						{
							name: 'point',
							type: 'text',
							required: true,
						},
					],
				},
			],
    },
    {
      name: 'resume',
      type: 'upload',
      relationTo: 'media',
    },
  ],
}
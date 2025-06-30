import { AboutBlock } from '@/blocks/AboutBlock'
import { BrandsBlock } from '@/blocks/BrandsBlock'
import { HeroBlock } from '@/blocks/HeroBlock'
import { PortfolioBlock } from '@/blocks/PortfolioBlock'
import type { CollectionConfig } from 'payload'

export const Pages: CollectionConfig = {
  slug: 'pages',
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
		{
      name: 'slug',
      type: 'text',
      required: true,
    },
		{
      name: 'layout',
      type: 'blocks',
      required: true,
      blocks: [HeroBlock, BrandsBlock, AboutBlock, PortfolioBlock],
    },
  ],
}

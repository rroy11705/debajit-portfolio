import { getPayload } from 'payload'
import React from 'react'

import config from '@/payload.config'
import { Page } from '@/payload-types'
import Hero from './components/home/Hero'
import BrandsCarousel from './components/home/BrandsCarousel'
import About from './components/home/About'
import PortfolioGrid from './components/home/PortfolioGrid'

/**
 * Renders a block based on its type from the page layout
 *
 * @param {Page['layout'][0]} block - The block configuration from the page layout
 * @returns {JSX.Element | null} The rendered block component or null if type not recognized
 */
const renderBlock = (block: Page['layout'][0]) => {
  switch (block.blockType) {
    case 'hero':
      return <Hero block={block} key={block.id} />;
    case 'brands':
      return <BrandsCarousel block={block} key={block.id} />;
    case 'about':
      return <About block={block} key={block.id} />;
    case 'portfolio':
      return <PortfolioGrid block={block} key={block.id} />;
    default:
      return null;
  }
}

export default async function HomePage() {
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })

  const {
    docs: [page],
  } = await payload.find({
    collection: 'pages',
    where: {
      slug: { equals: 'home' },
    },
  })

  return (
    <div>
      <div className="page">{page?.layout?.map((block) => renderBlock(block))}</div>
    </div>
  )
}

import React from 'react'
import VideoPlayer from '../common/VideoPlayer'
import { Page } from '@/payload-types'

const About = ({ block }: { block: Page['layout'][0]}) => {
  
  return (
    <section className='relative container mx-auto flex flex-row bg-white'>
			<div className='relative w-full py-25'>
				{'aboutVideoLink' in block && block.aboutVideoLink ? (
					<VideoPlayer
						id='about-video-player'
						url={block.aboutVideoLink}
						classNames='bg-black aspect-[16/9.04] relative border-2 border-black overflow-hidden rounded-md shadow-[12px_12px_0px_#000]'
						controls={true}
						playing={true}
						light={
							'aboutVideoThumb' in block && block.aboutVideoThumb && typeof block.aboutVideoThumb !== 'string'
								? block.aboutVideoThumb.url ?? ''
								: ''
						}
					/>
				) : null}
			</div>
				
    </section>
  )
}

export default About;
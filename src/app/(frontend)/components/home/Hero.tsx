'use client';

import { Page } from '@/payload-types';
import { useState, useEffect, useRef } from 'react';
import SanitizedText from '../common/SanitizedText';
import Link from 'next/link';
import Image from 'next/image';

const Hero = ({ block }: { block: Page['layout'][0]}) => {
  const [scrollY, setScrollY] = useState(0);
  const spiralRef = useRef<HTMLDivElement>(null);
  const logoTextRef = useRef<HTMLDivElement>(null);
  const taglineTextRef = useRef<HTMLDivElement>(null);


  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    // Add scroll event listener
    window.addEventListener('scroll', handleScroll, { passive: true });

    // Cleanup
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    if (spiralRef.current) {
      spiralRef.current.style.transform = `translate3d(${scrollY * 0.2}px, -${scrollY * 0.4}px, 0)`;
    }

    if (logoTextRef.current) {
      logoTextRef.current.style.transform = `translate3d(0, ${scrollY * 0.25}px, 0)`;
    }

    if (taglineTextRef.current) {
      taglineTextRef.current.style.transform = `translate3d(0, ${scrollY * 0.25}px, 0)`;
    }
  }, [scrollY]);

  return (
    <section className="relative mx-auto h-fit min-h-70 flex flex-col md:flex-row overflow-hidden bg-turquoise-green border-b border-solid border-black">
      <div className='w-full md:w-[40%] flex flex-col p-4 md:p-0'>
        <div className='w-full md:max-w-[365px] 2xl:max-w-[380px] md:mr-33 px-10 md:px-0 ml-auto mt-20 md:mt-40 mb-20 flex flex-col gap-8'>
          <Image
            src='/avatar.png'
            alt='Debajit Dey'
            width={2000}
            height={2565}
          />
        </div>
      </div>
      <div className='w-full md:w-[60%] bg-sandstorm-yellow flex flex-col border-l border-solid border-black p-4 md:p-0'>
        <div className="w-full md:max-w-[787px] 2xl:max-w-[921.6px] mr-auto md:pl-18 flex flex-col justify-center items-start gap-4 mt-5 mb-25 md:my-40">
          <h1 className="font-display font-extrabold text-black text-3xl md:text-4xl leading-[150%] mb-8">
            <SanitizedText text={'title' in block ? block.title : ''} />
            {' '}
            <span className='relative inline-block before:absolute before:-inset-1 before:block before:-skew-y-3 before:bg-tropical-indigo'>
              <span className="relative text-white">
                {'highlightedText' in block ? block.highlightedText : null}
              </span>
            </span>
          </h1>
          {/* <h2 className="relative font-sans font-medium text-black text-xl md:text-2xl pr-20">
            {'subheading' in block ? block.subheading : null}
          </h2> */}
          <p className='relative font-sans text-black text-xs md:text-base pr-20'>
            {'tagline' in block ? block.tagline : null}
          </p>

          {'howIWork' in block && block.howIWork?.length && block.howIWork?.length > 0 && (
            <div className="flex flex-col gap-4 mt-10 mb-8">
              {block.howIWork.map((item, index) => (
                <div key={index} className="flex items-center gap-4">
                  <div className="flex items-center justify-center w-6 h-6 bg-black text-white text-sm rounded-full">
                    {index + 1}
                  </div>
                  <p className="text-black text-sm">{item.point}</p>
                </div>
              ))}
            </div>
          )}
          <div className='w-full relative'>
            {'resume' in block && typeof block.resume === 'object' && block.resume?.url && (
              <Link
                href={block.resume.url} 
                target='_blank'
                className="bg-orange-red border-2 border-black text-black text-lg md:text-xl px-8 py-4 rounded-md shadow-[6px_4px_0px_#000] hover:shadow-[10px_8px_0px_#000] absolute left-0 top-0 hover:-left-1 hover:-top-1 transition-all duration-300 ease-in-out"
              >
                Download CV
              </Link>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;

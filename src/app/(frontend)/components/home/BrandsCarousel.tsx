'use client';

import { Page } from '@/payload-types';
import React, { useRef, useEffect, useState, useMemo } from 'react';
import Image from 'next/image';

const SCROLL_SPEED_NORMAL = 1; // pixels per frame
const SCROLL_SPEED_SLOW = 0.3; // slower speed on hover

const BrandsCarousel = ({ block }: { block: Page['layout'][0]}) => {
	const brands = useMemo(() => 
		'brands' in block ? block?.brands ?? [] : []
	, [block]);
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollSpeed, setScrollSpeed] = useState(SCROLL_SPEED_NORMAL);

  useEffect(() => {
    let animationFrameId: number;

    const scroll = () => {
      if (containerRef.current) {
        containerRef.current.scrollLeft += scrollSpeed;
        // Loop scroll
        if (
          containerRef.current.scrollLeft >=
          containerRef.current.scrollWidth / 2
        ) {
          containerRef.current.scrollLeft = 0;
        }
      }
      animationFrameId = requestAnimationFrame(scroll);
    };

    animationFrameId = requestAnimationFrame(scroll);

    return () => cancelAnimationFrame(animationFrameId);
  }, [scrollSpeed]);

  // Duplicate brands array to create infinite scroll effect
  const duplicatedBrands = [...brands, ...brands];

  return (
    <section
      ref={containerRef}
      onMouseEnter={() => setScrollSpeed(SCROLL_SPEED_SLOW)}
      onMouseLeave={() => setScrollSpeed(SCROLL_SPEED_NORMAL)}
      className="overflow-x-hidden whitespace-nowrap cursor-pointer select-none w-full box-border py-4 bg-black"
      aria-label="Brands carousel"
    >
      {duplicatedBrands.map((brand, index) => (
        <Image
          key={`brand-${index}-${brand.id}`}
          src={brand.brand && typeof brand.brand === 'object' && 'url' in brand.brand ? brand.brand.url ?? '' : ''}
          alt={brand.brand && typeof brand.brand === 'object' && 'alt' in brand.brand ? brand.brand.alt ?? '' : ''}
          width={100}
          height={100}
          style={{
            marginRight: '200px',
            filter: 'brightness(0) invert(1)', // makes image completely white
            display: 'inline-block',
            verticalAlign: 'middle',
            pointerEvents: 'none',
          }}
          draggable={false}
        />
      ))}
    </section>
  );
};

export default BrandsCarousel;
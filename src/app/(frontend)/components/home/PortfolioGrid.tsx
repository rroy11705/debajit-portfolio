"use client";

import { Media, Page } from '@/payload-types'
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import VideoPlayer from '../common/VideoPlayer';
import { RichText } from '@payloadcms/richtext-lexical/react';
import type { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical';
import { X, ChevronLeft, ChevronRight, Play, Pause } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

interface Project { 
  media: string | Media; 
  thumbnail?: (string | null) | Media;
  title: string; 
  mediaType?: string | null; 
  link: string; 
  description: SerializedEditorState;
  id?: string | null; 
  blockName?: string | null; 
  blockType: "project"; 
  year?: number | null;
  client?: string | null;
}

const PortfolioGrid = ({ block }: { block: Page['layout'][0]}) => {
  const works = useMemo(() => 
		'portfolio' in block ? block?.portfolio ?? [] : []
	, [block]);
  
  const [items, setItems] = useState<Project[]>([]);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const [selectedItem, setSelectedItem] = useState<Project | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  console.log("selectedItem", selectedItem);
  console.log("items", items);


  const fetchPortfolioItems = useCallback((startIndex: number, count: number) => {
    return works.slice(startIndex, startIndex + count);
  }, [works]);

  useEffect(() => {
    if (works && works.length > 0) {
      setItems(fetchPortfolioItems(0, 4));
    }
  }, [works, fetchPortfolioItems]);

  const loadMore = useCallback(() => {
    if (loading || !hasMore) return;
    
    setLoading(true);
    
    // Simulate API call delay
    setTimeout(() => {
      const newItems = fetchPortfolioItems(items.length, 4);
      setItems(prev => [...prev, ...newItems]);
      setLoading(false);
      
      if (items.length >= works.length) {
        setHasMore(false);
      }
    }, 1000);
  }, [loading, hasMore, fetchPortfolioItems, items.length, works.length]);


  useEffect(() => {
    const handleScroll = () => {
      if (window.innerHeight + document.documentElement.scrollTop >= 
          document.documentElement.offsetHeight - 1000) {
        loadMore();
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [loadMore]);

  // Modal navigation
  const goToNext = () => {
    if (selectedItem) {
      const currentIndex = items.findIndex(item => item.id === selectedItem.id);
      const nextIndex = (currentIndex + 1) % items.length;
      setSelectedItem(items[nextIndex]);
      setIsPlaying(true);
    }
  };

  const goToPrevious = () => {
    if (selectedItem) {
      const currentIndex = items.findIndex(item => item.id === selectedItem.id);
      const prevIndex = currentIndex === 0 ? items.length - 1 : currentIndex - 1;
      setSelectedItem(items[prevIndex]);
      setIsPlaying(true);
    }
  };

  const closeModal = () => {
    setSelectedItem(null);
    setIsPlaying(false);
  };

  const handleItemClicked = (item: Project) => {
    setSelectedItem(item);
    setIsPlaying(true);
  }


  return (
    <section className='bg-sandstorm-yellow py-25 border-t-4 border-black'>
      <div className='container mx-auto'>
        {/* Projects Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {items.map((item) => (
            <div
              key={item.id}
              onClick={() => handleItemClicked(item)}
              className="relative bg-black group cursor-pointer transform transition-transform duration-200 hover:-translate-y-2 overflow-hidden rounded-md border-2 border-black shadow-[12px_12px_0px_#000]"
            >
              {/* Project Image/Color Block */}
              <div className="relative aspect-[9/16]">
                <div className="absolute inset-0 text-sm font-black">
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-200 z-10"></div>
                  <Image
                    id={item.id as string}
                    className='bg-black aspect-[9/16] relative overflow-hidden'
                    fill
                    src={item.thumbnail && typeof item.thumbnail === 'object' && 'url' in item.thumbnail ? item.thumbnail.url ?? '' : ''} 
                    alt={item.title}                
                  />
                </div>
              </div>

              {/* Project Info */}
              <div className="absolute w-full -bottom-full group-hover:bottom-0 bg-white border-4 border-black rounded-b-md p-4 transition-all duration-500">
                <div className="bg-black text-white px-3 py-1 text-xs font-black inline-block mb-3">
                  {item.mediaType}
                </div>
                <h3 className="text-xl font-black text-black mb-2 leading-tight text-ellipsis overflow-hidden">
                  {item.title}
                </h3>
                <div className="text-black font-bold text-sm leading-relaxed">
                  <RichText
                    data={item.description}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Modal */}
        {selectedItem && (
          <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4">
            <div className="bg-white border-8 border-black max-w-7xl w-full max-h-[90vh] flex flex-col lg:flex-row shadow-[16px_16px_0px_0px_#000000]">
              
              {/* Media Section - Left */}
              <div className="lg:w-3/5 bg-black p-4 flex items-center justify-center min-h-[300px] lg:min-h-[600px]">
                {typeof selectedItem.media === 'object' && 'mimeType' in selectedItem.media && selectedItem.media.mimeType === 'video/mp4' ? (
                  <div className="relative w-full h-full flex items-center justify-center">
                    <VideoPlayer
                      id={selectedItem.id ?? ''}                      
                      url={selectedItem.media && typeof selectedItem.media === 'object' && 'url' in selectedItem.media ? selectedItem.media.url ?? '' : ''}
                      controls={false}
                      playing={isPlaying}
                      light={false} 
                    />
                  </div>
                ) : (
                  <Image
                    src={selectedItem.thumbnail && typeof selectedItem.thumbnail === 'object' && 'url' in selectedItem.thumbnail ? selectedItem.thumbnail.url ?? '' : ''}
                    fill
                    alt={selectedItem.title}
                    className="max-w-full max-h-full object-contain border-4 border-white"
                  />
                )}
              </div>

              {/* Content Section - Right */}
              <div className="lg:w-2/5 p-8 overflow-y-auto">
                <div className="flex justify-between items-start mb-6">
                  <div className="bg-black text-white px-3 py-1 text-xs font-black">
                    {selectedItem.mediaType}
                  </div>
                  <button
                    onClick={closeModal}
                    className="bg-red-500 text-white p-2 border-4 border-black hover:bg-red-600 transition-colors shadow-[2px_2px_0px_0px_#000000] cursor-pointer"
                  >
                    <X size={20} strokeWidth={3} />
                  </button>
                </div>

                <h2 className="text-2xl font-black text-black mb-4 leading-tight text-ellipsis overflow-hidden">
                  {selectedItem.title}
                </h2>

                <div className="mb-6">
                  <div className="bg-yellow-400 text-black px-3 py-1 text-sm font-black inline-block mb-2">
                    CLIENT: {selectedItem.client}
                  </div>
                  <div className="bg-green-400 text-black px-3 py-1 text-sm font-black inline-block mb-2 ml-2">
                    YEAR: {selectedItem.year}
                  </div>
                </div>

                {/* <div className="mb-6">
                  <h3 className="text-lg font-black text-black mb-3">SERVICES:</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedItem.services.map((service, index) => (
                      <span key={index} className="bg-black text-white px-2 py-1 text-xs font-black border-2 border-black">
                        {service}
                      </span>
                    ))}
                  </div>
                </div> */}

                <div className="mb-8">
                  <h3 className="text-lg font-black text-black mb-3">DESCRIPTION:</h3>
                  <div className="text-black font-bold text-sm leading-relaxed whitespace-pre-line">
                    <RichText data={selectedItem.description} />
                  </div>
                </div>

                {selectedItem.link && (
                  <Link 
                    href={selectedItem.link}
                    target="_blank"
                    className="mt-4 bg-black text-white px-6 py-3 font-black text-sm border-4 border-black hover:bg-white hover:text-black transition-colors duration-200 shadow-[2px_2px_0px_0px_#000000]"
                  >
                    VIEW PROJECT →
                  </Link>
                )}

                {/* Navigation Controls */}
                <div className="flex justify-between mt-50">
                  <button
                    onClick={goToPrevious}
                    className="bg-black text-white px-4 py-3 font-black text-sm border-4 border-black hover:bg-gray-800 transition-colors shadow-[2px_2px_0px_0px_#000000] flex items-center gap-2 cursor-pointer"
                  >
                    <ChevronLeft size={16} strokeWidth={3} />
                    PREVIOUS
                  </button>
                  <button
                    onClick={goToNext}
                    className="bg-black text-white px-4 py-3 font-black text-sm border-4 border-black hover:bg-gray-800 transition-colors shadow-[2px_2px_0px_0px_#000000] flex items-center gap-2 cursor-pointer"
                  >
                    NEXT
                    <ChevronRight size={16} strokeWidth={3} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Loading State */}
        {loading && (
          <div className="flex justify-center items-center mt-12">
            <div className="bg-black text-white px-8 py-4 border-4 border-black font-black text-lg">
              LOADING MORE PROJECTS...
            </div>
          </div>
        )}
      </div>
    </section>
  )
}

export default PortfolioGrid
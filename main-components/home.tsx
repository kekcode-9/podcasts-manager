"use client"
import React, { useEffect, useRef, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Image from 'next/image';
import SearchBar from '@/common-components/search-bar';
import Dropdown from '@/common-components/dropdown';
import Filter from '@/assets/icons/filter-icon';
// to be moved to PodcastCard component file later
import { dateFormatter } from '@/utils/utility-functions';
import { PlayButton } from '@/common-components/cta';
import { PodcastType } from '@/types';

/**
 * pass it a single podcast object
 */
type PodcastCardPropsType = {
  podcast: PodcastType
}

function PodcastCard({
  podcast
}: PodcastCardPropsType) {
  const { 
    collectionName, 
    artistName, 
    primaryGenreName, 
    releaseDate, 
    thumbnailSmall,
    thumbnailLarge
   } = podcast;
  const releaseDateOnly = dateFormatter(releaseDate);

  const thumbRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (thumbRef.current) {
      // animate entry by turning opacity up
    }
  }, [])

  return (
    <div
      className='podcast-card
      flex
      w-[20rem] sm:w-[32rem] h-fit
      bg-gradient-to-br  from-[#ab73fa66] from-0% to-[#04133c] to-100%
      bg-opacity-40
      text-snow
      border-[1pxu] border-snowe
      rounded-md overflow-hidden'
    >
      <div
        className='thumbnail-img
        relative flex-shrink-0
        w-[5rem] sm:w-[7rem] 
        h-[5rem] sm:h-[7rem] 
        border-r-2u border-snowe'
      >
        <Image ref={thumbRef}
          src={thumbnailLarge}
          alt={collectionName}
          loading='lazy'
          quality={100}
          unoptimized
          layout='fill'
          className='opacity-1'
        />
      </div>
      <div
        className='podcast-meta-data
        flex flex-col justify-center gap-2 sm:gap-1
        w-full 
        px-2 sm:px-4
        max-sm:text-sm'
      >
        <div className='w-[10rem] sm:w-[16rem] truncate'>{collectionName}</div>
        <div
          className='artist-genre
          flex gap-2 items-center'
        >
          <div className='max-w-[8rem] truncate'>{artistName}</div>
          <div
            className='divider
            max-sm:hidden
            w-2 h-2 
            rounded-full bg-davys-gray'
          />
          <div className='max-sm:hidden min-w-[8rem] max-w-[8rem] truncate'>{primaryGenreName}</div>
        </div>
        <div className='max-sm:hidden'>{releaseDateOnly}</div>
      </div>
      <div
        className='play-button-wrapper
        flex items-center justify-center 
        p-2 sm:p-4'
      >
        <PlayButton onPlay={() => {}}/>
      </div>
    </div>
  )
}

export default function HomePage() {
  const [searchResults, updateSearchResults] = useState<{[key: string]: any}[]>();

  const router = useRouter();
  const searchParams = useSearchParams();

  const onSearch = async (searchString: string | undefined) => {
    if (searchString !== undefined) {
      // make the api call
      const searchParam = searchString.replaceAll(' ', '+');

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}api/proxy/search/?` +
        new URLSearchParams({
          search: searchParam,
          ordering: 'oldest'
        }), {
          method: 'GET'
        }
      )
      
      // store the result is searchResults
      const result = await response.json();
      const collections = result.results as {[key: string]: any}[];
      router.push(`?search=${searchParam}`);
      console.log('collections: ', collections);
      updateSearchResults(collections);
    }
  }

  useEffect(() => {
    const query = searchParams.get("search");
    
    if (query) {
      onSearch(query);
    }

  }, [searchParams])

  return (
    <div className='home-page
        relative
        flex flex-col items-center gap-[2rem] sm:gap-[3rem]
        w-screen max-sm:px-[2rem] max-sm:py-[2rem] sm:p-[4rem]
        bg-rich-black'
    >
      <div 
          className='search-bar-container
          sticky top-[2rem] sm:top-[4rem] z-[888] m-auto'
      >
          <SearchBar onSearch={onSearch} />
      </div>
      <div
        className='search-results-container
        flex flex-col items-center gap-6'
      >
        {
          searchResults?.length ?
          <div
            className='sort-filter sticky top-[6rem] sm:top-[9rem] z-[999]
            flex items-center justify-end gap-4 
            w-full h-fit
            text-snow'
          >
            <div
              className='
              flex items-center gap-4
              w-fit h-fit
              py-2 px-3 bg-[#000000] rounded-full'
            >
              <Dropdown
                onSelect={() => {}}
                dropdownList={[]}
              />
              <div 
                className='filter-icon-wrapper
                flex items-center gap-1'
              >
                <Filter/> <span>Filter</span>
              </div>
            </div>
          </div> : <></>
        }
        {
          // if searchResults is not empty, display them here
          searchResults?.length ? 
          <div
            className='search-results
            flex flex-col gap-4 sm:gap-8'
          >
            {
              searchResults.map((result, i) => {
                result
                return <PodcastCard key={result.collectionId} podcast={result as PodcastType} />
              })
            }
          </div> : <></>
        }
      </div>
    </div>
  )
}

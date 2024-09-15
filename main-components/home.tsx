"use client"
import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import SearchBar from '@/common-components/search-bar';
import Sort from '@/assets/icons/sort-icon';
import Filter from '@/assets/icons/filter-icon';
// to be moved to PodcastCard component file later
import { dateFormatter } from '@/utils/utility-functions';
import { PlayButton } from '@/common-components/cta';
import { PodcastType } from '@/types';

const DUMMY = {
  name: "Dummy Name Dummy Artist Dummy Artist Dummy Artist Dummy Artist Dummy Artist Dummy Artist Dummy Artist",
  artist: "Dummy Artist Dummy Artist Dummy Artist Dummy Artist Dummy Artist",
  genre: "Dummy Genre Dummy Genre Dummy Genre Dummy Genre Dummy Genre Dummy Genre",
  releaseDate: "2024-09-13T11:51:00Z",
  duration: "45 min",
  thumbnail: "https://via.placeholder.com/150/92c952"
}

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
      w-[20rem] sm:w-[34rem] h-fit
      bg-gradient-to-br  from-[#e9dbfc] from-0% to-[#b0c4fa] to-100%
      bg-opacity-40
      text-rich-black
      border-[1px] border-snow
      rounded-md overflow-hidden'
    >
      <div
        className='thumbnail-img
        relative flex-shrink-0
        w-[5rem] sm:w-[7rem] 
        h-[5rem] sm:h-[7rem] 
        border-r-2 border-snow'
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
        <div className='w-[10rem] sm:w-[18rem] truncate'>{collectionName}</div>
        <div
          className='artist-genre
          flex gap-2 items-center'
        >
          <div className='max-w-full truncate'>{artistName}</div>
          <div
            className='divider
            max-sm:hidden
            w-2 h-2 
            rounded-full bg-davys-gray'
          />
          <div className='max-sm:hidden min-w-[8rem] max-w-[10rem] truncate'>{primaryGenreName}</div>
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

  const onSearch = async (searchString: string | undefined) => {
    if (searchString !== undefined) {
      // make the api call
      const response = await fetch(
        'http://podcasts-platform.us-east-1.elasticbeanstalk.com/podcasts/search/' + 
        '?query=' + searchString.replaceAll(' ', '+'));
      
      if (!response.ok) {}
      // store the result is searchResults
      const result = await response.json();
      const collections = result.results as {[key: string]: any}[];
      updateSearchResults(collections);
    }
  }

  return (
    <div className='home-page
        relative
        flex flex-col items-center gap-[2rem] sm:gap-[3rem]
        w-screen max-sm:px-[2rem] max-sm:py-[2rem] sm:p-[4rem]
        bg-rich-black'
    >
      <div 
          className='search-bar-container
          sticky top-[2rem] sm:top-[4rem] z-[999] m-auto'
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
            className='sort-filter
            flex items-center justify-end gap-4 
            w-full h-fit
            text-snow'
          >
            <div 
              className='sort-icon-wrapper
              flex items-center gap-1'
            >
              <Sort/> <span>Sort</span>
            </div>
            <div 
              className='filter-icon-wrapper
              flex items-center gap-1'
            >
              <Filter/> <span>Filter</span>
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
                const podcast = {
                  collectionId: result.collectionId,
                  collectionName: result.collectionName, // name of the entire podcast
                  artistName: result.artistName,
                  trackTimeMillis: result.trackTimeMillis,
                  trackCount: result.trackCount, // number of episodes
                  thumbnailSmall: result.artworkUrl100, // for small devices - artworkUrl100 in the api response
                  thumbnailLarge: result.artworkUrl600, // for larger devices - artworkUrl600 in the api response
                  genres: result.genres,
                  primaryGenreName: result.primaryGenreName, // the genre to show on the podcast card
                  collectionViewUrl: result.collectionViewUrl,
                  releaseDate: result.releaseDate,
                }
                return <PodcastCard key={podcast.collectionId} podcast={podcast} />
              })
            }
          </div> : <></>
        }
      </div>
      <div
        className='search-results-container
        flex flex-col gap-2 sm:gap-8'
      >
        {
          // new Array(10).fill('').map((item, i) => {
          //   return (
          //     <PodcastCard key={i} />
          //   )
          // })
        }
      </div>
    </div>
  )
}

import React from 'react';
import SearchBar from '@/common-components/search-bar';

export default function HomePage() {
  return (
    <div className='home-page
        relative
        w-screen h-screen 
        bg-rich-black
        flex items-center justify-center'
    >
        <div 
            className='search-bar-container
            absolute top-[4rem] m-auto'
        >
            <SearchBar/>
        </div>
    </div>
  )
}

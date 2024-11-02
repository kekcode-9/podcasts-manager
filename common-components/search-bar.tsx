import React, { useRef } from 'react';
import Magnify from '@/assets/icons/magnify-icon';

type SearchBarPropTypes = {
    onSearch: (searchString: string | undefined) => void
}

export default function SearchBar({
    onSearch
}: SearchBarPropTypes) {
    const inputRef = useRef<HTMLInputElement>(null);

  return (
    <div className={`search-bar relative 
        w-fit h-fit
        rounded-full p-[2px]
        bg-gradient-to-br  from-tropical-indigo from-0% to-chefchaouen-blue to-100%`}
    >
        <div 
            className='shadow
            absolute
            w-[20rem] h-[6rem]
            sm:w-[32rem] sm:h-[9rem]
            mt-[12px]
            opacity-45
            bg-gradient-to-br  from-tropical-indigo from-0% to-chefchaouen-blue to-100%
            rounded-full blur-[100px]
            pointer-events-none'
        />
        <input type='text' ref={inputRef}
            onKeyDown={(e) => {
                if (e.key === 'Enter') {
                    onSearch(inputRef.current?.value);
                }
            }}
            placeholder='What do you seek ?'
            className={`search-input
            relative z-10
            w-[18.5rem] h-[2.5rem]
            sm:w-[32rem] sm:h-[3rem] 
            py-2 pl-4 pr-[48px]
            rounded-full
            bg-opacity-[0.7] bg-rich-black text-snow
            focus:outline-none focus:bg-[#000000]
            transition-colors duration-300`}
        />
        <div 
            className='search-icon
            absolute top-[0.15rem] sm:top-[0.25rem] right-[0.5rem] z-20
            p-[0.5rem] cursor-pointer'
            onClick={() => onSearch(inputRef.current?.value)}
        >
            <Magnify/>
        </div>
    </div>
  )
}

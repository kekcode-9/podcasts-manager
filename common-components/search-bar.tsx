import React from 'react';
import Magnify from '@/assets/icons/magnify-icon';
export default function SearchBar() {

  return (
    <div className={`search-bar relative
        w-fit h-fit
        rounded-full p-[2px]
        bg-gradient-to-br  from-tropical-indigo from-0% to-chefchaouen-blue to-100%`}
    >
        <div 
            className='shadow
            absolute
            w-[23.5rem] h-[9rem]
            mt-[12px]
            opacity-45
            bg-gradient-to-br  from-tropical-indigo from-0% to-chefchaouen-blue to-100%
            rounded-full blur-[100px]
            pointer-events-none'
        />
        <input type='text'
            placeholder='What do you seek ?'
            className={`search-input
            relative z-10
            w-[23.5rem] h-[3rem] 
            py-2 px-4
            rounded-full
            bg-opacity-[0.7] bg-rich-black text-snow
            focus:outline-none focus:bg-[#000000]
            transition-colors duration-300`}
        />
        <div
            className='search-icon
            absolute top-[0.75rem] right-[1rem] z-20'
        >
            <Magnify/>
        </div>
    </div>
  )
}

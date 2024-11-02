import React from 'react';
import Play from '@/assets/icons/play-icon';

type CTAPropsType = {
    text: string,
    onClick: () => void
}

export default function CTA({
    text,
    onClick
}: CTAPropsType) {
  return (
    <div onClick={onClick}
        className='cta
        sm:w-[7.5rem] sm:h-[2.5rem]
        text-snow
        bg-gradient-to-br  from-tropical-indigo from-0% to-chefchaouen-blue to-100%'
    >
        {text}
    </div>
  )
}

type PlayButtonPropsType = {
    onPlay: () => void
}

export function PlayButton({
    onPlay
}: PlayButtonPropsType) {
    return (
        <div onClick={onPlay}
            className='play-button
            flex items-center justify-center
            w-[1.5rem] sm:w-[2.5rem] 
            h-[1.5rem] sm:h-[2.5rem]
            rounded-full 
            sm:border-2 sm:border-snow
            bg-rich-black cursor-pointer 
            hover:bg-gradient-to-br  from-tropical-indigo from-0% to-claret to-100%
            hover:border-rich-black 
            transition-all duration-150 hover:transition-all hover:duration-150'
        >
            <Play/>
        </div>
    )
}
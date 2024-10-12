import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

type TextLoaderPropTypes = {
    loaderType: "text",
    lineWidth: string,
    lineHeight: string
}

function TextLoader({
    lineHeight,
    lineWidth
}: TextLoaderPropTypes) {
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (ref.current) {
            gsap.to(ref.current, {
                opacity: 0.8,
                repeat: -1,
                yoyo: true,
                duration: 0.7
            })
        }
    }, [])

    return (
        <div ref={ref}
            className={`text-loader opacity-30
              ${lineHeight} ${lineWidth}
              rounded-full bg-davys-gray  
            `}
        />
    )
}

type ImageLoaderPropTypes = {
    loaderType: "image",
    imageSize: string
}

function ImageLoader({
    imageSize
}: ImageLoaderPropTypes) {
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (ref.current) {
            gsap.to(ref.current, {
                opacity: 0.8,
                repeat: -1,
                yoyo: true,
                duration: 0.7
            })
        }
    }, [])

    return (
        <div ref={ref}
            className={`image-loader opacity-30
                ${imageSize} bg-davys-gray
                rounded-md
            `}
        />
    )
}

type CardLoaderPropTypes = {
    loaderType: "card",
    classNames: string,
}

function CardLoader({
    classNames
}: CardLoaderPropTypes) {
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (ref.current) {
            gsap.to(ref.current, {
                opacity: 0.8,
                repeat: -1,
                yoyo: true,
                duration: 0.7
            })
        }
    }, [])

    return (
        <div ref={ref}
            className={`card-loader opacity-30
                ${classNames} bg-davys-gray
            `}
        />
    )
}

type LoadersPropTypes = {
    loader: CardLoaderPropTypes | TextLoaderPropTypes | ImageLoaderPropTypes
}

export default function Loaders({
    loader
}: LoadersPropTypes) {
  switch(loader.loaderType) {
    case "card":
        return (
            <CardLoader 
                loaderType={loader.loaderType}
                classNames={loader.classNames}
            />
        )
    case "image":
        return (
            <ImageLoader 
                loaderType={loader.loaderType}
                imageSize={loader.imageSize}
            />
        )
    case "text":
        return (
            <TextLoader 
                loaderType={loader.loaderType}
                lineHeight={loader.lineHeight}
                lineWidth={loader.lineWidth}
            />
        )
    default:
        return <></>
  }
}

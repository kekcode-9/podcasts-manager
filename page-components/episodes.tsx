"use client";
import React, { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { useSearchParams } from "next/navigation";
import { dateFormatter } from "@/utils/utility-functions";
import ROUTE_CONSTANTS from "@/constants/routeConstants";
import { EpisodeType, PodcastShortType } from "@/types";
import API_CONSTANTS from "@/constants/apiConstants";
import { PlayButton } from "@/common-components/cta";
import Collapse from "@/assets/icons/collapse-icon";
import Expand from "@/assets/icons/expansion-icon";
import Loaders from "@/common-components/loaders";

const { QUERY_PARAMS_FRONTEND } = ROUTE_CONSTANTS;
const { COLLECTION_ID } = QUERY_PARAMS_FRONTEND;

const { PROXY_API_ROUTES } = API_CONSTANTS;
const { PROXY_EPISODES } = PROXY_API_ROUTES;

/**
 * Tailwind classNames begin
 */
const EPISODE_CARD_OUTER = `flex gap-4 shrink-0
  w-[90vw] sm:w-[80vw] md:w-[72vw] lg:w-[min(50vw,32rem)] xl:w-[min(50vw,48rem)] 
  h-[5rem] sm:h-[7rem]
  px-4 y-3 sm:p-2 
  rounded-md
  text-snow`;

const EPISODE_CARD_IMAGE_SIZE = `w-[5rem] sm:w-[7rem] 
  h-[5rem] sm:h-[7rem]`;

const EPISODE_CARD_META_WRAPPER_CLASSES = `flex flex-col max-sm:justify-start justify-center gap-2 sm:gap-1 shrink
  w-full 
  px-2 sm:px-4`;

const PLAYER_CONTAINER_IMAGE_SIZE = `w-[12rem] h-[12rem]
  md:w-[15rem] md:h-[15rem]
  lg:w-[20rem] lg:h-[20rem]`;

/**
 * Tailwind classNames end
 */

type AudioPlayerPropsType = {
  trackId: Number;
  episodeUrl: string;
};

function AudioPlayer({ trackId, episodeUrl }: AudioPlayerPropsType) {
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    if (episodeUrl && audioRef.current) {
      audioRef.current.src = episodeUrl;
    }
  }, [episodeUrl]);

  const handlePlayPause = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.style.pointerEvents = "none";

      setTimeout(() => {
        if (audioRef.current) {
          audioRef.current.style.pointerEvents = "auto";
          audioRef.current.style.userSelect = "none";
        }
      }, 1000);
    }
  }, []);

  return (
    <motion.audio
      controls
      ref={audioRef}
      className="relative
      w-full 
      rounded-full
      bg-transparent"
      initial={{
        opacity: 0,
      }}
      animate={{
        opacity: 1,
        transition: {
          delay: 0.3,
          duration: 0.5,
        },
      }}
      onCanPlay={() => audioRef.current?.play()}
      onPlay={handlePlayPause}
      onPause={handlePlayPause}
    >
      <source src={episodeUrl} type="audio/mp3" />
    </motion.audio>
  );
}

type EpisodeCardPropsType = {
  episode: EpisodeType;
  onPlay: () => void;
  isCurrent: boolean;
};

function EpisodeCard({ episode, onPlay, isCurrent }: EpisodeCardPropsType) {
  const {
    trackName,
    trackTimeMillis,
    episodeUrl,
    releaseDate,
    description,
    thumbnail,
  } = episode;

  const releaseDateOnly = dateFormatter(releaseDate);
  return (
    <div
      className={`episode-card
      flex flex-col gap-4
      w-[100vw] sm:w-[80vw] md:w-[72vw] lg:w-[min(50vw,32rem)] xl:w-[min(50vw,48rem)] 
      h-fit
      px-4 py-3 sm:p-2 
      sm:rounded-md
      text-snow
      ${
        isCurrent &&
        "bg-gradient-to-r from-[#9C0D38D0] from-0% to-rich-black to-100%"
      }`}
    >
      <div
        className="episode-data
        flex w-full"
      >
        <div
          className={`thumbnail-wrapper relative
          flex-shrink-0
          ${EPISODE_CARD_IMAGE_SIZE}
          rounded-md overflow-hidden
          `}
        >
          <Image
            src={thumbnail}
            alt={trackName}
            quality={100}
            loading="lazy"
            layout="fill"
          />
        </div>
        <div
          className={`episode-meta-data
          ${EPISODE_CARD_META_WRAPPER_CLASSES}
          max-sm:text-sm`}
        >
          <div className="line-clamp-1 font-bold">{trackName}</div>
          <div className="text-snow-low-opacity font-semibold">
            {releaseDateOnly}
          </div>
          <div className="max-sm:hidden w-full line-clamp-2 text-snow-low-opacity">
            {description}
          </div>
        </div>
        {!isCurrent && (
          <div
            className="play-button-wrapper
            flex items-start sm:items-center justify-center 
            p-2 sm:p-4"
          >
            <PlayButton
              onPlay={() => {
                onPlay();
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
}

type PlayerContainerPropsType = {
  podcast?: {
    collectionName: string;
    thumbnail: string;
    artistName: string;
    trackCount: number;
  };
  episode?: EpisodeType;
  children: React.ReactElement;
};

/**
 * When not playing any episode, this container shows info on the podcast.
 * When an episode is selected to play, this container shows the detail of the episode
 * and the player feature
 */
function PlayerContainer({
  podcast,
  episode,
  children,
}: PlayerContainerPropsType) {
  // only for screens <=1024px (max-lg:)
  const [isCollapsed, toggleIsCollapsed] = useState<Boolean>(false);

  return (
    <div
      className="player-container
      max-lg:sticky max-lg:top-0 max-lg:z-20
      w-full lg:w-[70vw]
      h-fit lg:h-screen
      pb-4 sm:pb-8
      bg-gradient-to-b from-[#9C0D38D0] from-0% to-rich-black to-100%
      backdrop-blur-sm"
    >
      {podcast && (
        <div
          className={`podcast-container
            flex ${isCollapsed ? "flex-row" : "flex-col"} sm:flex-col 
            ${isCollapsed ? "items-start" : "items-center"} gap-3 sm:gap-8
            pointer-events-auto
            p-4 sm:p-8`}
        >
          <div
            className={`podcast-thumbnail
            relative shrink-0
            ${isCollapsed ? "w-[5rem] h-[5rem]" : "w-[12rem] h-[12rem]"}
            md:w-[15rem] md:h-[15rem]
            lg:w-[20rem] lg:h-[20rem]
            rounded-md overflow-hidden`}
          >
            <Image
              src={podcast.thumbnail}
              alt={podcast.collectionName}
              quality={100}
              loading="lazy"
              layout="fill"
            />
          </div>
          <div
            className={`wrapper
            flex ${isCollapsed ? "flex-col-reverse" : "flex-col"} sm:flex-col
            ${isCollapsed ? "items-start" : "items-center"} sm:items-center
            ${isCollapsed ? "gap-2" : "gap-3"}
            sm:gap-8
            `}
          >
            <div
              className={`episode-meta 
              flex flex-col items-start gap-2 sm:gap-4
              text-snow`}
            >
              <div
                className={`header
                ${
                  isCollapsed
                    ? "text-base font-normal line-clamp-1"
                    : "text-xl font-semibold"
                } 
                sm:text-2xl sm:font-bold`}
              >
                {podcast.collectionName}
              </div>
              <div
                className="artist
                line-clamp-1
                text-snow-low-opacity"
              >
                {podcast.artistName}
              </div>
            </div>
          </div>
        </div>
      )}
      {episode && (
        <div
          className={`curr-episode-container
          flex ${isCollapsed ? "flex-row" : "flex-col"} sm:flex-col 
          ${isCollapsed ? "items-start gap-2" : "items-center gap-3"} sm:gap-8
          ${isCollapsed ? "p-3" : "p-4"} sm:p-8`}
        >
          <div
            className={`episode-thumbnail
            relative shrink-0
            ${isCollapsed ? "w-[5rem] h-[5rem]" : "w-[12rem] h-[12rem]"}
            md:w-[15rem] md:h-[15rem]
            lg:w-[20rem] lg:h-[20rem]
            rounded-md overflow-hidden`}
          >
            <Image
              src={episode.thumbnail}
              alt={episode.trackName}
              quality={100}
              loading="lazy"
              layout="fill"
            />
          </div>
          <div
            className={`wrapper
            flex ${isCollapsed ? "flex-col-reverse" : "flex-col"} sm:flex-col
            ${isCollapsed ? "items-start" : "items-center"} sm:items-center
            ${isCollapsed ? "gap-2" : "gap-3"}
            sm:gap-8
            `}
          >
            <div
              className="player
              w-full"
            >
              {children}
            </div>
            <div
              className="episode-meta 
              flex flex-col items-start gap-4
              text-snow"
            >
              <div
                className={`header
                ${
                  isCollapsed
                    ? "text-base font-normal line-clamp-2"
                    : "text-xl font-semibold"
                } 
                sm:text-2xl sm:font-bold`}
              >
                {episode.trackName}
              </div>
              {!isCollapsed && (
                <p
                  className="description
                  text-sm sm:text-base text-snow-low-opacity"
                >
                  {episode.description}
                </p>
              )}
            </div>
          </div>
        </div>
      )}
      {(podcast || episode) && (
        <div
          className="expand-collapse
          md:hidden flex items-center justify-center
          w-full"
        >
          <div
            className="flex items-center justify-center
            w-fit h-fit
            p-2 border border-snow rounded-full"
            onClick={() => {
              toggleIsCollapsed(!isCollapsed);
            }}
          >
            {isCollapsed ? <Expand /> : <Collapse />}
          </div>
        </div>
      )}
      {
        !(podcast || episode) &&
        <div
          className={`loader-container
            flex flex-col 
            items-center gap-4 sm:gap-9
            p-4 sm:p-8`}
        >
          <Loaders 
            loader={{
              loaderType: "image",
              imageSize: PLAYER_CONTAINER_IMAGE_SIZE
            }}
          />
          <Loaders 
            loader={{
              loaderType: "text",
              lineHeight: "h-[12px]",
              lineWidth: "w-[70%]"
            }}
          />
          <div
            className="flex flex-col gap-3 items-center
            w-full h-fit"
          >
            {
              new Array(5).fill('').map((item, i) => {
                return (
                  <Loaders key={i}
                    loader={{
                      loaderType: "text",
                      lineHeight: "h-[6px]",
                      lineWidth: "w-[80%]"
                    }}
                  />
                )
              })
            }
          </div>
        </div>
      }
    </div>
  );
}

export default function Episodes() {
  const [episodes, updateEpisodes] = useState<any[]>();
  const [podcastShort, updatePodcastShort] = useState<PodcastShortType>();
  const [currEpisode, setCurrEpisode] = useState<EpisodeType>();

  const searchParams = useSearchParams();

  const fetchEpisodes = async (collectionId: string) => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}${PROXY_EPISODES}?` +
        new URLSearchParams({
          [`${COLLECTION_ID}`]: collectionId,
        }),
      {
        method: "GET",
      }
    );

    const result = await response.json();
    const episodes = result.results as { [key: string]: any }[]; // later replace any with EpisodeType
    if (episodes[0].kind === "podcast") {
      updatePodcastShort(episodes[0] as PodcastShortType);
    }
    updateEpisodes(episodes);
  };

  useEffect(() => {
    const collectionId = searchParams?.get(COLLECTION_ID);

    if (collectionId) {
      fetchEpisodes(collectionId);
    }
  }, [searchParams]);

  return (
    <div
      className="episodes-page-wrapper
      flex max-lg:flex-col
      w-screen"
    >
      <PlayerContainer
        episode={currEpisode}
        podcast={!currEpisode ? podcastShort : undefined}
      >
        {currEpisode ? (
          <AudioPlayer
            trackId={currEpisode.trackId}
            episodeUrl={currEpisode.episodeUrl}
          />
        ) : (
          <></>
        )}
      </PlayerContainer>
      <div
        className="episodes
        relative
        flex flex-col items-center gap-4 lg:gap-[3rem]
        w-screen lg:w-full 
        lg:h-screen lg:overflow-scroll
        overflow-hidden
        max-sm:px-[2rem] max-sm:py-2 sm:px-[4rem] sm:py-8
        bg-rich-black"
      >
        <div
          className="episodes-header
          w-[100vw] sm:w-[80vw] md:w-[72vw] lg:w-[min(50vw,32rem)] xl:w-[min(50vw,48rem)]
          max-sm:px-4 px-3
          text-snow text-xl font-bold"
        >
          Episodes
        </div>
        {episodes?.length
          ? episodes.map((ep, i) => {
              if (ep.kind === "podcast-episode") {
                const episode: EpisodeType = {
                  trackId: ep.trackId,
                  trackName: ep.trackName,
                  trackTimeMillis: ep.trackTimeMillis,
                  episodeUrl: ep.episodeUrl,
                  releaseDate: ep.releaseDate,
                  description: ep.description,
                  thumbnail: ep.thumbnail,
                  kind: ep.kind,
                };
                return (
                  <EpisodeCard
                    key={episode.trackId}
                    episode={episode}
                    isCurrent={
                      currEpisode ? currEpisode.trackId === ep.trackId : false
                    }
                    onPlay={() => {
                      setCurrEpisode(episode);
                    }}
                  />
                );
              }
            })
          : new Array(10).fill("").map((item, i) => {
              return (
                <Loaders key={i}
                  loader={{
                    loaderType: "card",
                    classNames: EPISODE_CARD_OUTER,
                  }}
                />
              );
            })}
      </div>
    </div>
  );
}

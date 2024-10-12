"use client";
import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { useSearchParams } from "next/navigation";
import { dateFormatter } from "@/utils/utility-functions";
import ROUTE_CONSTANTS from "@/constants/routeConstants";
import { EpisodeType } from "@/types";
import API_CONSTANTS from "@/constants/apiConstants";
import { PlayButton } from "@/common-components/cta";

const { QUERY_PARAMS_FRONTEND } = ROUTE_CONSTANTS;
const { COLLECTION_ID } = QUERY_PARAMS_FRONTEND;

const { PROXY_API_ROUTES } = API_CONSTANTS;
const { PROXY_EPISODES } = PROXY_API_ROUTES;

type AudioPlayerPropsType = {
  trackId: Number,
  episodeUrl: string
}

function AudioPlayer({ trackId, episodeUrl }: AudioPlayerPropsType) {
  const audioRef = useRef<HTMLAudioElement>(null);

  return (
    <motion.audio
      controls
      ref={audioRef}
      className="relative z-30
      w-full 
      rounded-full
      bg-transparent"
      onCanPlay={() => audioRef.current?.play()}
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
    >
      <source src={episodeUrl} type="audio/mp3" />
    </motion.audio>
  )
}

type EpisodeCardPropsType = {
  episode: EpisodeType,
  onPlay: () => void,
  children: React.ReactElement,
  isCurrent: boolean
};

function EpisodeCard({ episode, onPlay, isCurrent, children }: EpisodeCardPropsType) {
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
      className="episode-card
      flex flex-col gap-4
      w-[80vw] sm:w-[80vw] md:w-[72vw] lg:w-[32rem] xl:w-[48rem] h-fit
      text-snow"
    >
      <div
        className="episode-data
        flex w-full"
      >
        <div
          className="thumbnail-wrapper relative
          flex-shrink-0
          w-[5rem] sm:w-[7rem] 
          h-[5rem] sm:h-[7rem] 
          "
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
          className="episode-meta-data
          flex flex-col justify-center gap-2 sm:gap-1
          w-full 
          px-2 sm:px-4
          max-sm:text-sm"
        >
          <div className="line-clamp-1 font-bold">{trackName}</div>
          <div className="max-sm:hidden text-snow-low-opacity font-semibold">
            {releaseDateOnly}
          </div>
          <div className="w-full line-clamp-2 text-snow-low-opacity">
            {description}
          </div>
        </div>
        {!isCurrent && (
          <div
            className="play-button-wrapper
            flex items-center justify-center 
            p-2 sm:p-4"
          >
            <PlayButton onPlay={() => {
                onPlay();
              }} 
            />
          </div>
        )}
      </div>
      {isCurrent && (
        <motion.div
          className="player"
          initial={{
            height: "0px",
          }}
          animate={{
            height: "fit-content",
            transition: {
              duration: 0.3,
            },
          }}
        >
          {children}
        </motion.div>
      )}
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
};

/**
 * When not playing any episode, this container shows info on the podcast.
 * When an episode is selected to play, this container shows the detail of the episode
 * and the player feature
 */
function PlayerContainer({ podcast, episode }: PlayerContainerPropsType) {
  // only for screens <=1024px (max-lg:)
  const [isCollapsed, toggleIsCollapsed] = useState<Boolean>(false);

  /**
   * when passed podcast, it shows:
   * thumbnail
   * podcast name
   * artist name (not in episode)
   * episodes count (maybe) (not in episode)
   *
   * When passed episode, it shows:
   * thumbnail
   * episode name
   * date (extra)
   * player (extra)
   * description (extra)
   */
  return (
    <div className="player-container">
      <div className="cover-image"></div>
      <div className="header">
        {/**
         * contains podcast name, artist name and track count for podcast
         * contains episode name and date for episode
         */}
      </div>
      {episode && (
        <>
          <div className="player"></div>
          <div className="episode-description"></div>
        </>
      )}
    </div>
  );
}

export default function Episodes() {
  const [episodes, updateEpisodes] = useState<any[]>();
  const [nowPlaying, setNowPlaying] = useState<Number>();

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

    updateEpisodes(episodes);
  };

  useEffect(() => {
    const collectionId = searchParams?.get(COLLECTION_ID);

    if (collectionId) {
      fetchEpisodes(collectionId);
    }
  }, [searchParams]);

  // fetch data from collectionId whenever it changes and store in episodes
  return (
    <div
      className="episodes
      relative
      flex flex-col items-center gap-[2rem] sm:gap-[3rem]
      w-screen max-sm:px-[2rem] max-sm:py-[2rem] sm:p-[4rem]
      bg-rich-black"
    >
      {/**
       * show the podcase thumbnail, collection name and artist name
       */}
      <div></div>
      <div
        className="episodes-header
        w-[80vw] sm:w-[80vw] md:w-[72vw] lg:w-[32rem] xl:w-[48rem]
        text-snow text-xl font-bold"
      >
        Episodes
      </div>
      {episodes?.length &&
        episodes.map((ep, i) => {
          if (/*ep.kind === "podcast-episode"*/ ep.trackId) {
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
                isCurrent={nowPlaying === ep.trackId}
                onPlay={() => setNowPlaying(ep.trackId)}
              >
                {
                  nowPlaying === ep.trackId ?
                  <AudioPlayer trackId={ep.trackId} episodeUrl={ep.episodeUrl} /> : <></>
                }
              </EpisodeCard>
            );
          }
        })}
    </div>
  );
}

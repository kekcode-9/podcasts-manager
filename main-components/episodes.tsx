import React, { useState } from "react";

type EpisodeType = {
  trackName: string;
  trackTimeMillis: number;
  episodeUrl: string;
  releaseDate: string;
  description: string;
  thumbnail: string;
};

type EpisodeCardPropsType = {
  episode: EpisodeType;
};

function EpisodeCard({ episode }: EpisodeCardPropsType) {
  const {
    trackName,
    trackTimeMillis,
    episodeUrl,
    releaseDate,
    description,
    thumbnail
  } = episode
  return <></>;
}

type EpisodesPropsTypes = {
  collectionId: number;
};

export default function Episodes({ collectionId }: EpisodesPropsTypes) {
    /**
     * show last 4 episodes in a dropdown with a see all option
     * when the "see all" is clicked take to a new page in a different tab
     * this is to make sure that the actual search results stay intact
     * if you open them in the same tab then store the last search string somewhere
     * so if user goes back you can make the search and show them the results they were last on
     * make the episodes page vertical so it's easy to turn it responsive
     */
  const [episodes, updateEpisodes] = useState<any[]>();

  // fetch data from collectionId whenever it changes and store in episodes
  return (
    <div>
      {episodes?.length &&
        episodes.map((ep, i) => {
          if (ep.kind === "podcast-episode") {
            const episode = {
                trackName: ep.trackName,
                trackTimeMillis: ep.trackTimeMillis,
                episodeUrl: ep.episodeUrl,
                releaseDate: ep.releaseDate,
                description: ep.description,
                thumbnail: ep.artworkUrl160
            }
            return <EpisodeCard episode={episode} />;
          }
        })}
    </div>
  );
}

"use client";
import React, { useEffect, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import SearchBar from "@/common-components/search-bar";
import Dropdown from "@/common-components/dropdown";
import Filter from "@/assets/icons/filter-icon";
// to be moved to PodcastCard component file later
import { dateFormatter } from "@/utils/utility-functions";
import { PlayButton } from "@/common-components/cta";
import { PodcastType } from "@/types";
import ROUTE_CONSTANTS from "@/constants/routeConstants";
import API_CONSTANTS from "@/constants/apiConstants";
import STRING_LITERALS from "@/constants/stringLiterals";
import Loaders from "@/common-components/loaders";
import Sort from "@/assets/icons/sort-icon";

const { ROUTES, QUERY_PARAMS_FRONTEND } = ROUTE_CONSTANTS;
const { EPISODES } = ROUTES;
const { SEARCH, COLLECTION_ID } = QUERY_PARAMS_FRONTEND;

const { PROXY_API_ROUTES, QUERY_PARAMS } = API_CONSTANTS;
const { PROXY_SEARCH } = PROXY_API_ROUTES;
const { QUERY, ORDERING, ATTRIBUTES } = QUERY_PARAMS;

const { SORT_ATTRIBUTES, FILTER_ATTRIBUTES } = STRING_LITERALS;

type PodcastCardPropsType = {
  podcast: PodcastType;
};

function PodcastCard({ podcast }: PodcastCardPropsType) {
  const {
    collectionName,
    collectionId,
    artistName,
    primaryGenreName,
    releaseDate,
    thumbnailSmall,
    thumbnailLarge,
  } = podcast;
  const releaseDateOnly = dateFormatter(releaseDate);

  const router = useRouter();

  const thumbRef = useRef<HTMLImageElement>(null);

  return (
    <div
      className="podcast-card
      flex
      w-[20rem] sm:w-[32rem] h-fit
      bg-gradient-to-br  from-[#ab73fa66] from-0% to-[#04133c] to-100%
      bg-opacity-40
      text-snow
      border-[1pxu] border-snowe
      rounded-md overflow-hidden"
    >
      <div
        className="thumbnail-wrapper
        relative flex-shrink-0
        w-[5rem] sm:w-[7rem] 
        h-[5rem] sm:h-[7rem] 
        border-r-2u border-snowe"
      >
        <Image
          ref={thumbRef}
          src={thumbnailLarge}
          alt={collectionName}
          loading="lazy"
          quality={100}
          unoptimized
          layout="fill"
          className="opacity-1"
        />
      </div>
      <div
        className="podcast-meta-data
        flex flex-col justify-center gap-2 sm:gap-1
        w-full 
        px-2 sm:px-4
        max-sm:text-sm"
      >
        <div className="w-[10rem] sm:w-[16rem] truncate">{collectionName}</div>
        <div
          className="artist-genre
          flex gap-2 items-center"
        >
          <div className="max-w-[8rem] truncate">{artistName}</div>
          <div
            className="divider
            max-sm:hidden
            w-2 h-2 
            rounded-full bg-davys-gray"
          />
          <div className="max-sm:hidden min-w-[8rem] max-w-[8rem] truncate">
            {primaryGenreName}
          </div>
        </div>
        <div className="max-sm:hidden">{releaseDateOnly}</div>
      </div>
      <div
        className="play-button-wrapper
        flex items-center justify-center 
        p-2 sm:p-4"
      >
        <PlayButton
          onPlay={() => {
            router.push(`/${EPISODES}?${COLLECTION_ID}=${collectionId}`);
          }}
        />
      </div>
    </div>
  );
}

const queryString: {
  [x: string]: string | String;
} = {};

export default function Home() {
  const [searchResults, updateSearchResults] =
    useState<{ [key: string]: any }[]>();
  const [showLoader, toggleShowLoader] = useState<boolean>(false);
  const [message, setMessage] = useState<String | null>(null);

  const router = useRouter();
  const searchParams = useSearchParams();

  const onSearch = async (
    searchString: string | undefined,
    ordering?: String | undefined,
    filterAttr?: String | undefined
  ) => {
    if (searchString || queryString.query) {
      toggleShowLoader(true);
      setMessage(null);
      // make the api call

      const searchParam =
        searchString || queryString.query
          ? (searchString || queryString.query).replaceAll(" ", "+")
          : "";
      if (searchString) {
        queryString[`${QUERY}`] = searchParam;
      }
      if (ordering) {
        queryString[`${ORDERING.key}`] = ordering;
      }
      if (filterAttr) {
        queryString[`${ATTRIBUTES.key}`] = filterAttr;
      }

      console.log("making api call to backend with: ", queryString);
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}${PROXY_SEARCH}?` +
          new URLSearchParams(queryString as Record<string, string>),
        {
          method: "GET",
        }
      );

      const result = await response.json();
      const collections = result.results as { [key: string]: PodcastType }[];
      toggleShowLoader(false);
      if (!collections.length) {
        setMessage("No results found");
      }

      router.push(`?${SEARCH}=${searchParam}`);
      updateSearchResults(collections);
    }
  };

  useEffect(() => {
    const query = searchParams.get(SEARCH);

    if (query) {
      onSearch(query);
    }
  }, [searchParams]);

  return (
    <div
      className="home-page
        relative
        flex flex-col items-center gap-[2rem] sm:gap-[3rem]
        w-screen max-sm:px-[2rem] max-sm:py-[2rem] sm:p-[4rem]
        bg-rich-black"
    >
      <div
        className="search-bar-container
          sticky top-[2rem] sm:top-[4rem] z-[888] m-auto"
      >
        <SearchBar onSearch={onSearch} />
      </div>
      <div
        className="search-results-container
        flex flex-col items-center gap-6"
      >
        {searchResults?.length ? (
          <div
            className="sort-filter sticky top-[6rem] sm:top-[9rem] z-[999]
            flex items-center justify-end gap-4 
            w-full h-fit
            text-snow"
          >
            <div
              className="
              flex items-center gap-4
              w-fit h-fit
              py-2 px-3 bg-[#000000] rounded-full"
            >
              <Dropdown
                onSelect={(key: keyof typeof ORDERING.values) => {
                  onSearch(undefined, ORDERING.values[key]);
                }}
                dropdownList={SORT_ATTRIBUTES}
              >
                <>
                  <Sort /> <span>Sort</span>
                </>
              </Dropdown>
              {/* <Dropdown 
                onSelect={(key: keyof typeof ATTRIBUTES.values) => {
                  onSearch(undefined, undefined, ATTRIBUTES.values[key]);
                }} 
                dropdownList={FILTER_ATTRIBUTES}
              >
                <>
                  <Filter /> <span>Filter</span>
                </>
              </Dropdown> */}
            </div>
          </div>
        ) : (
          showLoader && (
            <div
              className="sticky top-[6rem] sm:top-[9rem] z-[999]
            flex items-center justify-end gap-4 
            w-full h-[40px]"
            >
              <Loaders
                loader={{
                  loaderType: "text",
                  lineHeight: "h-[32px]",
                  lineWidth: "w-[160px]",
                }}
              />
            </div>
          )
        )}
        {
          // if searchResults is not empty, display them here
          searchResults?.length ? (
            <div
              className="search-results
            flex flex-col gap-4 sm:gap-8"
            >
              {searchResults.map((result, i) => {
                result;
                return (
                  <PodcastCard
                    key={result.collectionId}
                    podcast={result as PodcastType}
                  />
                );
              })}
            </div>
          ) : showLoader ? (
            <div
              className="search-results
              flex flex-col gap-4 sm:gap-8"
            >
              {new Array(10).fill("").map((item, i) => {
                return (
                  <Loaders
                    key={i}
                    loader={{
                      loaderType: "card",
                      classNames:
                        "w-[20rem] sm:w-[32rem] h-[5rem] sm:h-[7rem] rounded-md",
                    }}
                  />
                );
              })}
            </div>
          ) : (
            <div className="text-snow">{message}</div>
          )
        }
      </div>
    </div>
  );
}

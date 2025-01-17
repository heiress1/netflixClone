
import Navbar from '../../components/Navbar'
import { Link } from 'react-router-dom'
import { Play, Info } from 'lucide-react'
import useGetTrendingContent from "../../components/hooks/useGetTrendingContent.jsx";
import { MOVIE_CATEGORIES,TV_CATEGORIES, ORIGINAL_IMG_BASE_URL } from '../../utils/constants.js';
import Slider from '../../components/Slider.jsx';
import { useContentStore } from "../../store/content.js";
import React, { useState, useEffect } from 'react';


const HomeScreen = () => {
  const { trendingContent } = useGetTrendingContent();
  const {contentType} = useContentStore(); 
  const [imgLoading, setImgLoading] = useState(true);

  if (!trendingContent)
    return (
      <div className="shimmer h-screen text-white relative">
        <Navbar />
        <div
          className="absolute top-0 left-0 w-full bg-black/70 flex-center justify-center -z-10 shimmer" />
      </div>
    );

  return (
    <>
      <div className="bg-black relative h-screen text-white ">
        <Navbar />

        {/* create shimmer effect while hero image is loading */}
        {imgLoading && (
          <div className="absolute top-0 left-0 w-full h-full bg-black/70 flex items-center justify-center shimmer -z-10"/>)}

        {/* hero image */}
        <img
          src={`${ORIGINAL_IMG_BASE_URL}${trendingContent?.backdrop_path}`}
          alt="hero image of a movie cover"
          className="absolute top-0 left-0 w-full h-full object-cover -z-0" />
          onLoad={() => setImgLoading(false)}
        {/* aria-hidden is for accessibility practices */}

        {/* gradient purposes */}
        <div className="absolute top-0 left-0 w-full h-full bg-black/50 -z-0" aria-hidden="true" />

        <div className="absolute top-0 left-0 w-full h-full flex flex-col justify-center px-8 md:px-16 lg:px-32">

          {/* -z-10 in tailwidng sets the elements z-index ti -10 pushing it behind elements with higher z index values 
          this can cause clicks to not pass through your disired element if a z-element is too high */}
          <div
            className="bg-gradient-to-b from-black via-transparent to-transparent absolute w-full h-full top-0 left-0 -z-50" />

          {/* descriptions of the show */}
          <div className="max-w-2xl">
            <h1 className="mt-4 text-6xl font-extrabold text-balance">

              {/* when you have a movie, its title, when a tv show its name */}
              {trendingContent?.title || trendingContent?.name}

            </h1>
            <p className="mt-2 text-lg">
              {/* when you have a movie, its release date, when a tv show its first air date */}
              {trendingContent?.release_date?.split("-")[0] || trendingContent?.first_air_date?.split("-")[0]}{" "}
              | {trendingContent?.adult ? "18+" : "PG-13"}
            </p>
            <p className="mt-4 text-lg">
              {trendingContent?.overview.length > 200
                ? trendingContent?.overview.slice(0, 200) + "..."
                : trendingContent?.overview}

            </p>

          </div>

          {/* buttons */}
          <div className="flex mt-8">
            {/* create play button */}
            <Link
              to={`/watch/${trendingContent?.id}`}
              className="bg-white hover:bg-white/80 text-black font-bold py-2 px-4 rounded mr-4 flex items-center transition-colors duration-300">

              <Play className="size-6 mr-2 fill-black" />
              Play
            </Link>


            {/* create more info button */}
            <Link to={`/watch/${trendingContent?.id}`} className="bg-gray-500/70 hover:bg-gray-500 text-white py-2 px-4 rounded flex items-center">

              <Info className="size-6 mr-2" />
              More Info
            </Link>
          </div>

        </div>
      </div>

      {/* movie sliders */}

      <div className="flex flex-col gap-10 bg-black py-10">
        {contentType === "movie" 
          ? MOVIE_CATEGORIES.map((category) => <Slider key={category} contentType="movie" category={category} />)   
           //category={category} is a prop that is passed to the MovieSlider component
           //the passed prop is taken from the map function 
          : TV_CATEGORIES.map((category) => <Slider key={category} contentType="tv" category={category} /> )}
      </div>

    </>

  )
}

export default HomeScreen

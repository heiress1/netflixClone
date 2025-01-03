import { useParams } from 'react-router-dom'
import { React, useEffect, useState, useRef } from 'react'
import axios from 'axios';
import { useContentStore } from '../store/content';
import Navbar from '../components/Navbar';
import { ChevronLeft } from 'lucide-react';
import { ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Play } from 'lucide-react';
import ReactPlayer from 'react-player';
import { ORIGINAL_IMG_BASE_URL, SMALL_IMG_BASE_URL } from '../utils/constants';


function formatReleaseDate(date) {
  return new Date(date).toLocaleDateString("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}
const WatchPage = () => {
  //useParams is a hook that returns an object of key/value pairs of URL parameters
  const { id } = useParams();
  const [trailers, setTrailers] = useState([]);
  const [currentTrailerIdx, setCurrentTrailerIdx] = useState(0);
  const [loading, setLoading] = useState(true);
  const [content, setContent] = useState({});
  const [similarContent, setSimilarContent] = useState([]);
  const { contentType } = useContentStore();

  const sliderRef = useRef(null);

  //get trailers
  useEffect(() => {
    const getTrailers = async () => {
      try {
        const res = await axios.get(`/api/v1/${contentType}/${id}/trailers`);
        setTrailers(res.data.trailers);
      } catch (error) {
        if (error.message.includes("404")) {
          setTrailers([]);
        }
      }
    };
    getTrailers();
  }, [contentType, id]);

  //get similar content
  useEffect(() => {
    const getSimilarContent = async () => {
      try {
        const res = await axios.get(`/api/v1/${contentType}/${id}/similar`);
        setSimilarContent(res.data.similar);
      } catch (error) {
        if (error.message.includes("404")) {
          setSimilarContent([]);
        }
      }
    };
    getSimilarContent();
  }, [contentType, id]);


  //get content details
  useEffect(() => {
    const getContentDetails = async () => {
      try {
        const res = await axios.get(`/api/v1/${contentType}/${id}/details`);
        setContent(res.data.content);
      } catch (error) {
        if (error.message.includes("404")) {
          setContent(null);
        }
        //finally runs after the try or catch blocks
      } finally {
        setLoading(false);
      }
    };
    getContentDetails();
  }, [contentType, id]);


  //function to handle the next button
  const handleNext = () => {
    if (currentTrailerIdx < trailers.length - 1) {
      setCurrentTrailerIdx((prevIdx) => prevIdx + 1);
    }
  };

  //function to handle the previous button
  const handlePrev = () => {
    if (currentTrailerIdx > 0) {
      setCurrentTrailerIdx((prevIdx) => prevIdx - 1);
    }
  };

  const scrollLeft = () => {
    //the .current property will be set to the DOM element once rendered
    //allowing you to use the sliderRef.current to manipuate the DOM element 
    if (sliderRef.current) {
      //this allows you to scroll to the left with the - by the size of the width
      sliderRef.current.scrollBy({ left: -sliderRef.current.offsetWidth, behavior: "smooth" });
    }
  };




  //scroll to the right
  const scrollRight = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({ left: sliderRef.current.offsetWidth, behavior: "smooth" });
    }
  };


  if (loading) return (
    <div className="min-h-screen bg-black p-10">
      <WatchPageSkeleton />
    </div>
  );
  
  return (
    <div className=" bg-black min-h-screen text-white">
      <div className='mx-auto container px-4 py-8 h-full'>
        <Navbar />

        {/* this conditional rendering entures 
          that the enclosed jsx is rendered only if the condition
          before it is true */}
        {trailers.length > 0 && (
          <div className='flex justify-between items-center mb-4'>

            {/* the left button to go to the previous trailer */}
            <button
              className={`
							bg-gray-500/70 hover:bg-gray-500 text-white py-2 px-4 rounded ${currentTrailerIdx === 0 ? "opacity-50 cursor-not-allowed " : ""
                }}
							`}
              disabled={currentTrailerIdx === 0}
              onClick={handlePrev}
            >
              <ChevronLeft size={24} />
            </button>

            {/* the right button to go to next trailer */}
            <button
              className={`
							bg-gray-500/70 hover:bg-gray-500 text-white py-2 px-4 rounded ${currentTrailerIdx === trailers.length - 1 ? "opacity-50 cursor-not-allowed " : ""
                }}
							`}
              disabled={currentTrailerIdx === trailers.length - 1}
              onClick={handleNext}
            >
              <ChevronRight size={24} />
            </button>
          </div>
        )}
        {/*shows youtube trailer video of the selected show  */}
        <div className="aspect-video mb-8 p-2 sm:px-10 md:px-32">
          {trailers.length > 0 && (
            <ReactPlayer
              controls={true}
              width={"100%"}
              height={"70vh"}
              className="mx-auto overflow-hidden rounded-lg"
              url={"https://www.youtube.com/watch?v=" + trailers[currentTrailerIdx].key}
            />
          )}


          {/* incase there are no trailers */}
          {trailers.length === 0 && (
            <h2 className="text-xl text-center mt-5">
              No trailers available for{" "}
              <span className="font-bold text-red-600">{content?.title || content?.name}</span>
            </h2>
          )}

        </div>

        {/* movie details */}
        <div
          className='flex flex-col md:flex-row items-center justify-between gap-20 
				max-w-6xl mx-auto'
        >
          <div className='mb-4 md:mb-0'>

            {/* content title */}
            <h2 className='text-5xl font-bold text-balance'>
              {content?.title || content?.name}

            </h2>


            <p className='mt-2 text-lg'>
              {/* release date */}
              {formatReleaseDate(content?.release_date || content?.first_air_date)} |{" "}

              {/* age rating */}
              {content?.adult ? (
                <span className='text-red-600'>18+</span>
              ) : (
                <span className='text-green-600'>PG-13</span>
              )}{" "}
            </p>

            {/* synoposis */}
            <p className='mt-4 text-lg'>
              {content?.overview}
            </p>

          </div>

          {/* content poster image */}
          <img
            src={ORIGINAL_IMG_BASE_URL + content?.poster_path}
            alt='Poster image'
            className='max-h-[600px] rounded-md'
          />
        </div>

        {/* similar content slider */}
        {/* forces the similarContent to be an array */}
        {Array.isArray(similarContent) && similarContent.length > 0 && (
          <div className="mt-12 max-w-5xl mx-auto relative">

            {/* title */}
            <h3 className="text-3xl font-bold mb-4">Similar Content</h3>

            {/* slider container */}
            <div className="flex overflow-x-scroll scrollbar-hide gap-4 pb-4 group" ref={sliderRef}>

              {/* maps through the similar content and displays them in a slider */}
              {similarContent.map((content) => (

                //makes the image and title clickable
                <Link key={content.id} to={`/watch/${content.id}`} className="w-52 flex-none">
                  <img
                    src={SMALL_IMG_BASE_URL + content.backdrop_path}
                    alt="Poster path"
                    className="w-full h-auto rounded-md"
                  />
                  {/* title name */}
                  <h4 className="mt-2 text-lg font-semibold"> {content.title || content.name}</h4>
                </Link>
              ))}

            </div>

            <button
              className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-gray-500/70 hover:bg-gray-500 text-white py-2 px-4 rounded"
              onClick={scrollLeft}
            >
              <ChevronLeft size={24} />
            </button>
            <button
              className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-gray-500/70 hover:bg-gray-500 text-white py-2 px-4 rounded"
              onClick={scrollRight}
            >
              <ChevronRight size={24} />
            </button>

          </div>
        )}
      </div>
    </div>
  );
};

export default WatchPage;

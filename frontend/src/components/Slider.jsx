import React, { useRef } from 'react'
import { useContentStore } from "../store/content.js";
import { SMALL_IMG_BASE_URL } from '../utils/constants.js';
import { useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const Slider = ({ category }) => {

    const { contentType } = useContentStore();
    const [content, setContent] = React.useState([]);
    const [showArrows, setShowArrows] = React.useState(false);

    //useref is used to reference a dom element that is mutable
    const sliderRef = useRef(null);

    //category name
    const formattedContentName = category.replaceAll("_", " ")[0].toUpperCase() + category.replaceAll("_", " ").slice(1);

    //content type
    const formattedContentType = contentType === "movie" ? "Movies" : "TV Shows";

    //everything time the contentType or category changes, it will make a request to the api
    //and get the content
    //renders the movie/shows in the slider
    useEffect(() => {
        const getContent = async () => {
            try {
                console.log(contentType, category);
                const res = await axios.get(`/api/v1/${contentType}/${category}`);
                setContent(res.data.content);
            } catch (error) {
                console.error("Error fetching content:", error);
                // Optional: set an error state here
                // setError("Failed to fetch content. Please try again later.");
            }
        }
        getContent();
    }, [contentType, category])

    //This function is used for horizontal scrolling of the movie slider
    const scrollLeft = () => {
        //the .current property will be set to the DOM element once rendered
        //allowing you to use the sliderRef.current to manipuate the DOM element 
        if (sliderRef.current){
            //this allows you to scroll to the left with the - by the size of the width
            sliderRef.current.scrollBy({left:-sliderRef.current.offsetWidth, behavior:"smooth"});
           }
    };
    
    
    //scroll to the right
    const scrollRight = () => {
        if (sliderRef.current) {
          sliderRef.current.scrollBy({ left: sliderRef.current.offsetWidth, behavior: "smooth" });
        }
    };

    return (
        <div className="bg-black text-white relative px-5 md:px-20"
            onMouseEnter={() => setShowArrows(true)}
            onMouseLeave={() => setShowArrows(false)}
        >
            

            {/* shows the categoies */}
            <h2 className="mb-4 text-2xl font-bold">
                {formattedContentName} {formattedContentType}
            </h2>

            {/* shows the different shows in the categoriy as a slider */}
            {/* ref={sliderRef is used to attached to reference to this DOM element
            this references allows you to direclty interact with the DOM element } */}
            <div className="flex space-x-4 overflow-x-scroll scrollbar-hide " ref={sliderRef} >
                {content.map((item) => (
                    
                    //relative class is used to position child elements relative to the parent element (Link)
                    //group is used to create a group of elements that share hover and focus states
                    //so all childs of Link will shre the hover and focus states
                    //group-hover is used to apply styles to the child elements when the parent element is hovered over
                    //in this case the image will scale up when the parent element is hovered over
                   
                    //this whole enter link parent is a clickable link
                    //when the user clicks on this block, they will be navigated to the url specified in the atrribute 
                    //link is differnt from href in that it will not cause a full page reload 
                    // only updates the view by rendering the new component by changing the url
                    <Link to={`/watch/${item.id}`} className="min-w-[250px] relative group" key={item.id}>
                        <div className="rounded-lg overflow-hidden">
                            {/* backdrop_path is a property of the item object that reprecents the backdrop image from tmdb */}
                            <img
                                src={SMALL_IMG_BASE_URL + item.backdrop_path}
                                alt={item.title}
                                className="transition-transform duration-300 ease-in-out group-hover:scale-125"
                            />
                        </div>

                        {/* since the p tag is placed after the img tag in the same parent div. the paragraph tag appears below the image 
                    since they are placed in the same parent div, each element takes up the same width, so when you center the p tag, it also appears to be cnetered with the image
                    but its just being cnetered in the middle of its p tag which takes up the same width as teh image tag*/}
                        <p className="mt-2 text-center">
                            {/* if movie:title, if show: name */}
                            {item.title || item.name}

                        </p>
                    </Link>
                ))}
            </div>

            {/* shows arrows to slide to right or left of slider*/}
            {showArrows && (
                <>
                {/* left arrow */}
                    <button
                        className="absolute top-1/2 -translate-y-1/2 left-5 md:left-24 flex items-center justify-center
                        size-12 rounded-full Obg-black bg-opacity-50 hover:bg-opacity-75 text-white z-10"
                        onClick={scrollLeft}
                    >

                        <ChevronLeft size={24} />
                    </button>
                
                {/* right arrow */}
                    <button
                        className="absolute top-1/2 -translate-y-1/2 right-5 md:right-24 flex items-center justify-center
                        size-12 rounded-full Obg-black bg-opacity-50 hover:bg-opacity-75 text-white z-10"
                        onClick={scrollRight}
                    >

                        <ChevronRight size={24} />
                    </button>
                </>
            )}    

        </div>
    )
}

export default Slider

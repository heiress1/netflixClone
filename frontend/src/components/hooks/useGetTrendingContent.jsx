import React from 'react'
import { useContentStore } from "../../store/content.js";
import {useEffect} from "react";
import axios from "axios";
//return a state
const useGetTrendingContent = () => {
  const [trendingContent, setTrendingContent] = React.useState(null);
    const {contentType} = useContentStore();

    //use effect allows you to make changes to the state of the component after the dependencies has changed
    useEffect(() => {
        const getTrendingContent = async () => {
           const response =  await axios.get(`/api/v1/${contentType}/trending`)
           setTrendingContent(response.data.content);
        }
        getTrendingContent();
    }, [contentType]);

    return {trendingContent};
}


export default useGetTrendingContent

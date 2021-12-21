import SearchBar from "../components/SearchBar";
import CategoryTags from "../components/CategoryTags";
import VideoList from "../components/VideoList";
import {useEffect, useState} from "react";
import {functions} from 'bfast'

function HomePage() {
    const [videos, setVideos] = useState([]);
    // const [videosLoading, setVideosLoading] = useState(false);
    useEffect(() => {
        // setVideosLoading(true)
        functions().request('/data.json').get().then(v => {
            setVideos(v)
        }).catch(console.log);
        // .finally(() => setVideosLoading(false))
    }, [])
    return (
        <>
            <SearchBar/>
            <CategoryTags/>
            <VideoList videos={videos}/>
        </>
    )
}

export default HomePage
import SearchBar from "../components/SearchBar";
import CategoryTags from "../components/CategoryTags";
import VideoList from "../components/VideoList";
import {useEffect, useState} from "react";
import {functions} from 'bfast'

function HomePage() {
    const [videos, setVideos] = useState([]);
    const [activeCategory, setActiveCategory] = useState('recently');
    // const [videosLoading, setVideosLoading] = useState(false);
    useEffect(() => {
        // setVideosLoading(true.txt)
        functions().request('/db/home/index.json').get().then(v => {
            setVideos(v)
        }).catch(console.log);
        // .finally(() => setVideosLoading(false))
        document.title = "KeshaTv - Home";
    }, [activeCategory]);
    return (
        <>
            <SearchBar/>
            <CategoryTags active={activeCategory} onChoose={(v)=>setActiveCategory(v)}/>
            <VideoList videos={videos}/>
        </>
    );
}

export default HomePage
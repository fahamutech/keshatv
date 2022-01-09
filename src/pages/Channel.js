import ToolBar from "../components/ToolBar";
import CategoryTags from "../components/CategoryTags";
import VideoList from "../components/VideoList";
import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {categoryMovies, recentlyMovies} from "../services/movies";
import Loading from "../components/Loading";
import NoContents from "../components/NoContents";
import {channelLogo} from "../services/channel";

function ChannelPage() {
    const params = useParams()
    const [videos, setVideos] = useState([]);
    const [logo, setLogo] = useState('');
    const [signal, setSignal] = useState(0);
    const [activeCategory, setActiveCategory] = useState('recently');
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        document.title = "KeshaTV - Channel "+params.id;
        channelLogo(params.id).then(setLogo).catch(console.log)
        setLoading(true)
        if (activeCategory === 'recently') {
            recentlyMovies(params.id).then(setVideos).catch(console.log)
                .finally(() => setLoading(false))
        } else {
            categoryMovies(params.id, activeCategory).then(setVideos).catch(console.log)
                .finally(() => setLoading(false))
        }
    }, [activeCategory, params, signal]);
    return (
        <>
            <ToolBar title={params.id} logo={logo} backUrl={'/'}/>
            <CategoryTags channelId={params.id} active={activeCategory} onChoose={(v) => setActiveCategory(v)}/>
            <Loading loading={loading}/>
            <NoContents loading={loading} contents={videos} reload={() => setSignal(Math.random)}/>
            <VideoList videos={videos} channelId={params.id}/>
        </>
    );
}

export default ChannelPage
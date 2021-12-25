import React, {useEffect, useState} from "react";
import {useQuery} from "../utils/url";
import {useNavigate} from 'react-router-dom'
import VideoPlayer from "../components/VideoPlayer";

function WatchPage() {
    const navigate = useNavigate();
    const query = useQuery();
    const [v, setV] = useState(null);
    const [s, setS] = useState(-1);
    const cid = query.get('v');
    const time = parseInt(query.get('s'));
    const title = query.get('title');
    const type = query.get('type');
    const episodes = query.get('episodes');
    useEffect(() => {
        if (!isNaN(time)) {
            setS(time);
        }
        if (typeof cid === "string" && title && type) {
            setV(cid);
            return;
        }
        navigate("/", {replace: true});
    }, [cid, navigate, time, title, type]);
    return (
        <div className='flex justify-center content-center vh-100'>
            {v ? <VideoPlayer episodes={episodes} title={title} type={type} v={v} s={s}/> : null}
        </div>
    )
}

export default WatchPage
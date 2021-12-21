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
    useEffect(() => {
        if (!isNaN(time)) {
            setS(time);
        }
        if (typeof cid === "string") {
            setV(cid);
            return;
        }
        navigate("/", {replace: true});
    }, [cid, navigate, time])
    return (
        <div className='flex justify-center content-center vh-100'>
            {v ? <VideoPlayer v={v} s={s}/> : null}
        </div>
    )
}

export default WatchPage
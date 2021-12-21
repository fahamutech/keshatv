import ReactHlsPlayer from 'react-hls-player';
import React, {useEffect, useState} from "react";
import {useQuery} from "../utils/url";
import {useNavigate} from 'react-router-dom'
// bafybeihza4u4mibw727nwbj47agzp5wvbmzpyqxfxwedwuuagkte3xz4ta
function HlsPlayer({v, s}) {
    const playerRef = React.useRef();
    useEffect(() => {
        // playerRef.current.play()
    }, [])
    return (
        <>
            <ReactHlsPlayer
                src={'https://infura-ipfs.io/ipfs/'+v+'/master.m3u8'}
                autoPlay={true}
                controls={true}
                width="100%"
                height="auto"
                hlsConfig={{
                    enableWorker: true,
                    progressive: true,
                    startPosition: s,
                }}
                playerRef={playerRef}/>
        </>
    )
}

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
    }, [cid, s])
    return (
        <div className='flex justify-center content-center vh-100'>
            {v ? <HlsPlayer v={v} s={s}/> : null}
        </div>
    )
}

export default WatchPage
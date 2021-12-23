import React, {useEffect, useState} from "react";
import ReactHlsPlayer from "react-hls-player";
import VideoPlayerOverlay from "./VideoPlayerOverlay";
// infura-ipfs.io
// astyanax.io
function VideoPlayer({v, s}) {
    const containerRef = React.useRef();
    const playerRef = React.useRef();
    const [playerTag, setPlayerTag] = useState(null);
    const [t, setT] = useState(s)
    useEffect(() => {
        setPlayerTag(playerRef.current);
        document.title = "KeshaTv - Watch";
    }, [v, s])
    return (
        <>
            <div ref={containerRef}>
                <ReactHlsPlayer
                    src={'https://infura-ipfs.io/ipfs/' + v + '/master.m3u8'}
                    autoPlay={true}
                    controls={false}
                    width="100%"
                    height="100%"
                    hlsConfig={{
                        enableWorker: true,
                        progressive: true,
                        startPosition: t,
                    }}
                    playerRef={playerRef}/>
                {
                    playerTag ?
                        <VideoPlayerOverlay
                            containerRef={containerRef}
                            videoTag={playerTag} second={t}
                            onSeekTo={setT}/>
                        : null
                }
            </div>
        </>
    )
}

export default VideoPlayer
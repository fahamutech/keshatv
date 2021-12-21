import React, {useEffect} from "react";
import ReactHlsPlayer from "react-hls-player";
// infura-ipfs.io
// astyanax.io
function VideoPlayer({v, s}) {
    const playerRef = React.useRef();
    useEffect(() => {
        // playerRef.current.play()
        document.title = "KeshaTv - Watch"
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

export default VideoPlayer
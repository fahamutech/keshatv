import ReactHlsPlayer from 'react-hls-player';
import React, {useEffect} from "react";

function Watch() {
    const playerRef = React.useRef();
    useEffect(() => {
        // playerRef.current.play()
    },["once"])
    return (
        <div className='flex justify-center content-center' style={{height: '100vh'}}>
            <ReactHlsPlayer
                src='https://infura-ipfs.io/ipfs/bafybeihza4u4mibw727nwbj47agzp5wvbmzpyqxfxwedwuuagkte3xz4ta/master.m3u8'
                autoPlay={true}
                controls={true}
                width="100%"
                height="auto"
                hlsConfig={{
                    enableWorker: true,
                    progressive: true,
                    // startPosition: 3600,
                }}
                playerRef={playerRef}/>,
        </div>
    )
}

export default Watch
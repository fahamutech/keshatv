import React, {useEffect, useState} from "react";
import ReactHlsPlayer from "react-hls-player";
import VideoPlayerOverlay from "./VideoPlayerOverlay";

// infura-ipfs.io
// astyanax.io

function ShowOverLay({playerTag, containerRef, episode, episodes, title, setTime, channel, time, setEpisode, type}) {
    function prevEpisode() {
        if (episode > 1) {
            setEpisode(episode - 1)
            setTime(-1)
        }
    }

    function nextEpisode() {
        if (episode < episodes) {
            setEpisode(episode + 1)
            setTime(-1)
        }
    }

    if (playerTag) {
        return (
            <VideoPlayerOverlay
                containerRef={containerRef}
                videoTag={playerTag}
                second={time}
                title={type === 'series' ? title + ' - Episode ' + episode + ' / ' + episodes : title}
                episode={episode}
                episodes={episodes}
                channel={channel}
                type={type}
                onNext={nextEpisode}
                onPrev={prevEpisode}
                onSeekTo={setTime}/>
        )
    } else return null
}

function VideoPlayer({v, s, title, type, episodes, channel}) {
    const containerRef = React.useRef();
    const playerRef = React.useRef();
    const [playerTag, setPlayerTag] = useState(null);
    const [t, setT] = useState(s);
    const [hlsUrl, setHlsUrl] = useState('');
    const [episode, setEpisode] = useState(1);

    useEffect(() => {
        if (type === 'series') {
            setHlsUrl('https://infura-ipfs.io/ipfs/' + v + '/' + episode + '/master.m3u8');
        } else {
            setHlsUrl('https://infura-ipfs.io/ipfs/' + v + '/master.m3u8')
        }
        setPlayerTag(playerRef.current);
        document.title = "KeshaTv - Watch " + title;
    }, [v, s, title, type, episode]);

    return (
        <div className='vh-100 flex'>
            <div className='flex-grow-1' ref={containerRef}>
                <ReactHlsPlayer
                    src={hlsUrl}
                    autoPlay={true}
                    controls={false}
                    width="100%"
                    height="100%"
                    style={{position: 'absolute', left: 0, right: 0}}
                    hlsConfig={{
                        enableWorker: true,
                        progressive: true,
                        startPosition: t,
                    }}
                    playerRef={playerRef}/>
                <ShowOverLay playerTag={playerTag} channel={channel} title={title} setTime={setT} time={t}
                             setEpisode={setEpisode} episode={episode} episodes={episodes}
                             containerRef={containerRef} type={type}/>
            </div>
        </div>
    )
}

export default VideoPlayer
import React, {useEffect, useState} from "react";
import ReactHlsPlayer from "react-hls-player";
import VideoPlayerOverlay from "./VideoPlayerOverlay";

// infura-ipfs.io
// astyanax.io

function VideoPlayer({v, s, title, type, episodes}) {
    const containerRef = React.useRef();
    const playerRef = React.useRef();
    const [playerTag, setPlayerTag] = useState(null);
    const [t, setT] = useState(s);
    const [hlsUrl, setHlsUrl] = useState('');
    const [episode, setEpisode] = useState(1);
    useEffect(() => {
        setT(-1)
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
                            title={type === 'series' ? title + ' - Episode ' + episode + ' / ' + episodes : title}
                            episode={episode}
                            episodes={episodes}
                            type={type}
                            onNext={() => {
                                if (episode < episodes) {
                                    setEpisode(episode + 1)
                                }
                            }
                            }
                            onPrev={() => {
                                if (episode > 1) {
                                    setEpisode(episode - 1)
                                }
                            }
                            }
                            onSeekTo={setT}/>
                        : null
                }
            </div>
        </div>
    )
}

export default VideoPlayer
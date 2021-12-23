import React, {useEffect, useState} from "react";
import {ReactComponent as BackArrow} from '../raw/back_arrow.svg';
import {ReactComponent as PauseIcon} from '../raw/pause_icon.svg';
import {ReactComponent as PlayIcon} from '../raw/play_icon.svg';
import {ReactComponent as FullScreenIcon} from '../raw/fullscreen.svg';
import {ReactComponent as FullScreenExitIcon} from '../raw/fullscreen_exit.svg';
import {useNavigate} from "react-router-dom";
import moment from "moment";

function VideoPlayerOverlay({videoTag, onSeekTo, containerRef}) {
    const [display, setDisplay] = useState(1);
    const [isPlaying, setIsPlaying] = useState(false);
    const [isFullScreen, setIsFullScreen] = useState(false);
    const [isWaiting, setIsWaiting] = useState(false);
    const [nowTime, setNowTime] = useState('0');
    const [progressValue, setProgressValue] = useState(0);
    const [duration, setDuration] = useState('0');
    const navigation = useNavigate();
    useEffect(() => {
        videoTag.volume = 1;
        const timeot = setInterval(() => {
            if (isPlaying) {
                setDisplay(0);
            }
        }, 5000);
        videoTag.onplaying = () => {
            setIsPlaying(true);
            setIsWaiting(false);
        }
        videoTag.ondurationchange = () => {
            const d = isNaN(videoTag.duration) ? 0 : videoTag.duration
            setDuration(moment.utc(d * 1000).format('HH:mm:ss'));
        }
        videoTag.ontimeupdate = () => {
            const t = isNaN(videoTag.currentTime) ? 0 : videoTag.currentTime;
            const d = isNaN(videoTag.duration) ? 0 : videoTag.duration;
            setNowTime(moment.utc(t * 1000).format('HH:mm:ss'));
            const p = (t / d) * 100;
            setProgressValue(isNaN(p) ? 0 : p)
        }
        videoTag.onwaiting = () => {
            setIsWaiting(true);
            setDisplay(1);
        }
        window.onmousemove = () => {
            setDisplay(1)
        }
        window.ontouchstart = () => {
            setDisplay(1)
        }
        return function () {
            videoTag.ontimeupdate = null;
            videoTag.ondurationchange = null;
            videoTag.onplaying = null;
            videoTag.onwaiting = null;
            clearInterval(timeot);
        }
    }, [videoTag, isPlaying]);
    return (
        <div style={{opacity: display}}
             className='vh-100 w-100 absolute--fill absolute bg-black-50 pa2 flex flex-column'>
            <div className='pt2 pl2 pointer mr1 flex flex-row'>
                <BackArrow className='pointer' style={{width: '24px'}} onClick={() => navigation(-1)}/>
                <span className='flex-grow-1'/>
                <div className='white pointer' onClick={() => {
                    if (isFullScreen) {
                        document.exitFullscreen().catch(console.log);
                        setIsFullScreen(false)
                    }
                    if (!isFullScreen) {
                        containerRef.current.requestFullscreen().catch(console.log)
                        setIsFullScreen(true);
                    }
                }}>
                    {isFullScreen ? <FullScreenExitIcon/> : <FullScreenIcon/>}
                </div>
            </div>
            <div className='flex-grow-1 flex justify-center items-center flex-column h-100 w-100'>
                {
                    isWaiting ? <div className='loader'/> : (
                        isPlaying ? <PauseIcon
                            className='pointer'
                            onClick={() => {
                                videoTag.pause();
                                setIsPlaying(false)
                            }}
                        /> : <PlayIcon
                            className='pointer'
                            onClick={() => {
                                videoTag.play();
                                setIsPlaying(true)
                            }}
                        />
                    )
                }
            </div>
            <div className='flex-grow-0 white flex flex-row mb4'>
                <div className='flex-grow-0' style={{width: '64px'}}>{nowTime}</div>
                <div className='flex-grow-1 ph2'>
                    <input type='range' onInput={(e) => {
                        // console.log(e.target.value);
                        const s = Math.round(parseFloat(e.target.value) * videoTag.duration)
                        if (isNaN(s)) {
                            return;
                        }
                        // console.log(s);
                        onSeekTo(s / 100);
                        setProgressValue(s);
                    }} className='w-100' max="100" value={progressValue}/>
                </div>
                <div className='flex-grow-0 pr1' style={{width: '64px'}}>{duration}</div>
            </div>
        </div>
    );
}

export default VideoPlayerOverlay
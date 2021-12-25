import React, {useEffect, useState} from "react";
import {ReactComponent as BackArrow} from '../raw/back_arrow.svg';
import {ReactComponent as PauseIcon} from '../raw/pause_icon.svg';
import {ReactComponent as PlayIcon} from '../raw/play_icon.svg';
import {ReactComponent as FullScreenIcon} from '../raw/fullscreen.svg';
import {ReactComponent as FullScreenExitIcon} from '../raw/fullscreen_exit.svg';
import {ReactComponent as NextIcon} from '../raw/skip_next_white_24dp.svg';
import {ReactComponent as PrevIcon} from '../raw/skip_previous_white_24dp.svg';
import {useNavigate} from "react-router-dom";
import moment from "moment";

function VideoPlayerOverlay({videoTag, onSeekTo, containerRef, title, type, episode, episodes, onNext, onPrev}) {
    const [display, setDisplay] = useState(1);
    const [isPlaying, setIsPlaying] = useState(false);
    const [isFullScreen, setIsFullScreen] = useState(false);
    const [isWaiting, setIsWaiting] = useState(false);
    const [nowTime, setNowTime] = useState('0');
    const [progressValue, setProgressValue] = useState(0);
    const navigation = useNavigate();
    useEffect(() => {
        let mounted = true
        videoTag.volume = 1;
        const timeot = setInterval(() => {
            if (isPlaying && mounted === true) {
                setDisplay(0);
            }
        }, 5000);
        videoTag.onplaying = () => {
            if (mounted){
                setIsPlaying(true);
                setIsWaiting(false);
            }
        }
        videoTag.ontimeupdate = () => {
            if (mounted){
                const t = isNaN(videoTag.currentTime) ? 0 : videoTag.currentTime;
                const d = isNaN(videoTag.duration) ? 0 : videoTag.duration;
                setNowTime(moment.utc(t * 1000).format('HH:mm:ss'));
                const p = (t / d) * 100;
                setProgressValue(isNaN(p) ? 0 : p)
            }
        }
        videoTag.onwaiting = () => {
            if (mounted){
                setIsWaiting(true);
                setDisplay(1);
            }
        }
        window.onmousemove = () => {
            if (mounted){
                setDisplay(1)
            }
        }
        window.ontouchstart = () => {
            if (mounted){
                setDisplay(1)
            }
        }
        return function () {
            mounted = false;
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
            <div className='pt2 pl2 pointer mr1 flex flex-row items-center'>
                <BackArrow className='pointer' style={{width: '24px'}} onClick={() => navigation('/')}/>
                <div className='f4 white ph2'>{title}</div>
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
                        isPlaying ? (
                            <div className='flex flex-row items-center'>
                                <Prev type={type} episode={episode} episodes={episodes} onPrev={onPrev}/>
                                <PauseIcon
                                    className='pointer'
                                    onClick={() => {
                                        videoTag.pause();
                                        setIsPlaying(false)
                                    }}
                                />
                                <Next type={type} episode={episode} episodes={episodes} onNext={onNext}/>
                            </div>
                        ) : (
                            <div className='flex flex-row items-center'>
                                <Prev type={type} episode={episode} episodes={episodes} onPrev={onPrev}/>
                                <PlayIcon
                                    className='pointer'
                                    onClick={() => {
                                        videoTag.play();
                                        setIsPlaying(true)
                                    }}
                                />
                                <Next type={type} episode={episode} episodes={episodes} onNext={onNext}/>
                            </div>
                        )
                    )
                }
            </div>
            <div className='flex-grow-0 white flex flex-row mb4'>
                <div className='flex-grow-1 ph2'>
                    <input type='range' onInput={(e) => {
                        const s = Math.round(parseFloat(e.target.value) * videoTag.duration)
                        if (isNaN(s)) {
                            return;
                        }
                        onSeekTo(s / 100);
                        setProgressValue(s);
                    }} className='w-100 pointer' max="100" value={progressValue}/>
                </div>
                <div className='flex-grow-0' style={{width: '64px'}}>{nowTime}</div>
            </div>
        </div>
    );
}

function Next({episode, episodes, onNext, type}) {
    return (
        <div className='ph2 pointer'>
            {episode < episodes && type === 'series' ? (
                <NextIcon style={{width: '50px', height: '50px'}} onClick={onNext}/>
            ) : null}
        </div>
    )
}

function Prev({episode, onPrev, type}) {
    return (
        <div className='ph2 pointer'>
            {episode > 1 && type === 'series' ? (
                <PrevIcon style={{width: '50px', height: '50px'}} onClick={onPrev}/>
            ) : null}
        </div>
    )
}

export default VideoPlayerOverlay
import React, {useEffect, useState} from "react";
import {ReactComponent as BackArrow} from '../raw/back_arrow.svg';
import {ReactComponent as PauseIcon} from '../raw/pause_icon.svg';
import {ReactComponent as PlayIcon} from '../raw/play_icon.svg';
import {ReactComponent as FullScreenIcon} from '../raw/fullscreen.svg';
import {ReactComponent as FullScreenExitIcon} from '../raw/fullscreen_exit.svg';
import {ReactComponent as NextIcon} from '../raw/skip_next_white_24dp.svg';
import {ReactComponent as PrevIcon} from '../raw/skip_previous_white_24dp.svg';
import {ReactComponent as VolumeIcon} from '../raw/volume_up.svg';
import {useNavigate} from "react-router-dom";
import moment from "moment";

function PlayPauseButtons(
    {isPlaying, episode, episodes, onPrev, onNext, videoTag, setIsPlaying, type}
) {
    if (isPlaying) {
        return (
            <div className='flex flex-row items-center'>
                <Prev type={type} episode={episode} episodes={episodes} onPrev={onPrev}/>
                <PauseIcon
                    className='pointer'
                    style={{width: '26px', height: '26px'}}
                    onClick={() => {
                        videoTag.pause();
                        setIsPlaying(false)
                    }}
                />
                <Next type={type} episode={episode} episodes={episodes} onNext={onNext}/>
            </div>
        )
    } else {
        return (
            <div className='flex flex-row items-center'>
                <Prev type={type} episode={episode} episodes={episodes} onPrev={onPrev}/>
                <PlayIcon
                    className='pointer'
                    style={{width: '26px', height: '26px'}}
                    onClick={() => {
                        videoTag.play();
                        setIsPlaying(true)
                    }}
                />
                <Next type={type} episode={episode} episodes={episodes} onNext={onNext}/>
            </div>
        )
    }
}

function Waiting({isWaiting}) {
    if (isWaiting) {
        return (
            <div className='loader'/>
        )
    } else return null
}

function VideoPlayerOverlay(
    {videoTag, onSeekTo, containerRef, title, type, episode, episodes, onNext, onPrev, channel}
) {
    const [display, setDisplay] = useState(1);
    const [volume, setVolume] = useState(videoTag.volume);
    const [isPlaying, setIsPlaying] = useState(false);
    const [isFullScreen, setIsFullScreen] = useState(false);
    const [isWaiting, setIsWaiting] = useState(false);
    const [nowTime, setNowTime] = useState('0');
    const [progressValue, setProgressValue] = useState(0);
    const navigation = useNavigate();
    useEffect(() => {
        let mounted = true
        const timeot = setInterval(() => {
            if (isPlaying && mounted === true) {
                setDisplay(0);
            }
        }, 5000);
        videoTag.onplaying = () => {
            if (mounted) {
                setIsPlaying(true);
                setIsWaiting(false);
            }
        }
        videoTag.ontimeupdate = () => {
            if (mounted) {
                const t = isNaN(videoTag.currentTime) ? 0 : videoTag.currentTime;
                const d = isNaN(videoTag.duration) ? 0 : videoTag.duration;
                setNowTime(moment.utc(t * 1000).format('HH:mm:ss'));
                const p = (t / d) * 100;
                setProgressValue(isNaN(p) ? 0 : p)
            }
        }
        videoTag.onwaiting = () => {
            if (mounted) {
                setIsWaiting(true);
                setDisplay(1);
            }
        }
        window.onmousemove = () => {
            if (mounted) {
                setDisplay(1)
            }
        }
        window.ontouchstart = () => {
            if (mounted) {
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

    // function togglePlaying() {
    //     if (isPlaying) {
    //         videoTag.pause()
    //         setIsPlaying(false)
    //         setDisplay(1)
    //     }
    //     if (!isPlaying) {
    //         videoTag.play()
    //         setIsPlaying(true)
    //     }
    // }

    return (
        <div style={{opacity: display}}
             className='vh-100 w-100 absolute--fill absolute bg-black-20 pa2 flex flex-column'>
            <div className='pt2 pl2 pointer mr1 flex flex-row items-center'>
                <BackArrow className='pointer' style={{width: '24px'}}
                           onClick={() => navigation('/channel/' + channel)}/>
                <div className='f4 white ph2'>{title}</div>
            </div>
            <div className='flex-grow-1 flex justify-center items-center w-100 h-100'>
                <Waiting isWaiting={isWaiting}/>
            </div>
            <div className='flex-grow-0'>
                <div className='white flex flex-row items-center'>
                    <div className='flex-grow-1 ph2'>
                        <input type='range' onInput={(e) => {
                            const seekTime = Math.round(parseFloat(e.target.value) * videoTag.duration)
                            if (isNaN(seekTime)) {
                                return;
                            }
                            onSeekTo(seekTime / 100);
                            setProgressValue(e.target.value);
                        }} className='w-100 pointer seek' min='0' max="100" value={progressValue}/>
                    </div>
                    <div className='flex-grow-0' style={{width: '64px'}}>{nowTime}</div>
                </div>
                <div className='pa2 flex flex-row items-center'>
                    <PlayPauseButtons episodes={episodes} onPrev={onPrev} episode={episode} onNext={onNext}
                                      videoTag={videoTag} isWaiting={isWaiting} isPlaying={isPlaying}
                                      setIsPlaying={setIsPlaying} type={type}/>
                    <VolumeIcon className='pl1'/>
                    <div style={{width: '70px'}}>
                        <input type='range' onInput={(e) => {
                            const volume = parseFloat(e.target.value)
                            if (isNaN(volume)) {
                                return;
                            }
                            videoTag.volume = volume
                            setVolume(volume);
                        }} className='w-100 pointer volume' min='0' step='0.1' max="1" value={volume}/>
                    </div>
                    <span className='flex-grow-1'/>
                    <div className='white pointer' onClick={() => {
                        if (isFullScreen) {
                            document.exitFullscreen().catch(console.log).then(_ => {
                                setIsFullScreen(false)
                            });
                        }
                        if (!isFullScreen) {
                            containerRef.current.requestFullscreen().catch(console.log).then(_ => {
                                setIsFullScreen(true);
                            });
                        }
                    }}>
                        {isFullScreen ? <FullScreenExitIcon/> : <FullScreenIcon/>}
                    </div>
                </div>
            </div>
        </div>
    );
}

function Next({episode, episodes, onNext, type}) {
    if (episode < episodes && type === 'series') {
        return (
            <div className='ph2 pointer'>
                <NextIcon style={{width: '30px', height: '30px'}} onClick={onNext}/>
            </div>
        )
    } else return null
}

function Prev({episode, onPrev, type}) {
    if (episode > 1 && type === 'series') {
        return (
            <div className='ph2 pointer'>
                <PrevIcon style={{width: '30px', height: '30px'}} onClick={onPrev}/>
            </div>
        )
    } else return null
}

export default VideoPlayerOverlay
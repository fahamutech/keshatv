import VideoCard from "./VideoCard";

function VideoList({videos = [], channelId}){
    return (
        <div className='ph4-l ph2 flex flex-row flex-wrap w-100'>
            {videos.map(x=><VideoCard channelId={channelId} key={x.cid} video={x}/>)}
        </div>
    )
}

export default VideoList
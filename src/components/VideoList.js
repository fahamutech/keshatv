import VideoCard from "./VideoCard";

function VideoList({videos = []}){
    return (
        <div className='ph4-l ph2 flex flex-row flex-wrap w-100'>
            {videos.map(x=><VideoCard key={x.id} video={x}/>)}
        </div>
    )
}

export default VideoList
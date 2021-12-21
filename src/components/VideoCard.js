import {Link} from "react-router-dom";

function imgStyle() {
    return {
        objectFit: 'cover'
    }
}

function VideoCard({video}) {
    return (
        <Link to={'/watch?v=' + video.id} className='w-25-l pa2 w-third-m w-50 flex flex-column link db'>
            <div className='flex-grow-1'>
                <img className='h-100 w-100 br2' style={imgStyle()} src={video.cover} alt={video.name}/>
            </div>
            <p className='light-gray nowrap ws-normal truncate f5'>{video.name}</p>
            {/*<p className='light-gray nowrap ws-normal truncate f5'>{video.year}</p>*/}
        </Link>
    )
}


export default VideoCard

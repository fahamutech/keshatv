import {Link} from "react-router-dom";
import {useEffect, useState} from "react";
import {getVideoCover} from "../utils";

function imgStyle() {
    return {
        objectFit: 'cover'
    }
}

function VideoCard({video}) {
    const [imgUrl, setImgUrl] = useState('');
    useEffect(() => {
        const url = getVideoCover(video)
        setImgUrl(url);
    }, [video]);
    return (
        <Link to={`/watch?v=${video.cid}&title=${video.title}&type=${video.type}&episodes=${video.episodes}`}
              className='w-25-l pa2 w-third-m w-50 flex flex-column link db'>
            <div className='flex-grow-1 w-100'>
                <img className='h-100 w-100 br2' style={imgStyle()} src={imgUrl} alt={video.title}/>
            </div>
            <p className='light-gray nowrap ws-normal truncate f5'>{video.title}</p>
        </Link>
    )
}


export default VideoCard

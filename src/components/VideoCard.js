import {Link} from "react-router-dom";
import {useEffect, useState} from "react";

const nCid = 'bafybeihxnmxpahmgiesnkqkq3fl4y7atboqsxcj3555c64ceyq5v3esasq';
const cCid = 'bafybeihza4u4mibw727nwbj47agzp5wvbmzpyqxfxwedwuuagkte3xz4ta';

function imgStyle() {
    return {
        objectFit: 'cover'
    }
}

function VideoCard({video}) {
    const [imgUrl, setImgUrl] = useState('');
    useEffect(() => {
        let cover;
        if (video.cover) {
            if (video.cover.toString().includes('/')) {
                cover = 'https://astyanax.io/ipfs/' + video.cover
            } else {
                cover = 'https://astyanax.io/ipfs/' + video.cid + '/' + video.cover
            }
        } else if (video.cid === nCid) {
            cover = './ni-noma-cut.jpeg'
        } else if (video.cid === cCid) {
            cover = './cops_shop.jpg'
        } else {
            cover = 'https://astyanax.io/ipfs/' + video.cid + '/cover.jpeg'
        }
        setImgUrl(cover)
    }, [video.cid, video.cover])
    return (
        <Link to={'/watch?v=' + video.cid} className='w-25-l pa2 w-third-m w-50 flex flex-column link db'>
            <div className='flex-grow-1'>
                <img className='h-100 w-100 br2' style={imgStyle()} src={imgUrl} alt={video.title}/>
            </div>
            <p className='light-gray nowrap ws-normal truncate f5'>{video.title}</p>
            {/*<p className='light-gray nowrap ws-normal truncate f5'>{video.year}</p>*/}
        </Link>
    )
}


export default VideoCard

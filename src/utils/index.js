/**
 *
 * @param video
 * @return string
 */
export function getVideoCover(video){
    const nCid = 'bafybeihxnmxpahmgiesnkqkq3fl4y7atboqsxcj3555c64ceyq5v3esasq';
    const cCid = 'bafybeihza4u4mibw727nwbj47agzp5wvbmzpyqxfxwedwuuagkte3xz4ta';
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
    return cover;
}
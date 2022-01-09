function getPreCover(video) {
    if (video.cid === 'bafybeif6m35onngpwav7twapmrd5pce2mxxqcc625qojy7ox2hsyp6ngde') {
        return 'https://astyanax.io/ipfs/' + video.cid + '/cover.jpg'
    }
    if (video.cid === 'bafybeie2j5awwtxyf2wm2uj3h6unryllpw3apybm46c7vqayfv4szd27cy') {
        return 'https://astyanax.io/ipfs/' + video.cid + '/cover.png'
    }
    if (video.cid === 'bafybeig6dfzp5wgipwdj7ypxm3bnjdnkqgcrhajq5yyk2ut46aw4mwgi74') {
        return 'https://astyanax.io/ipfs/' + video.cid + '/cover.jpg'
    }
    if (video.cid === 'bafybeihxnmxpahmgiesnkqkq3fl4y7atboqsxcj3555c64ceyq5v3esasq') {
        return 'https://bafybeih7vp6hslgr25xdma44kvyc4mr4736nx4igqxexicsuy3xccq22ym.ipfs.astyanax.io/ni-noma-cut.jpeg'
    }
    if (video.cid === 'bafybeibtjycpgsvp4gm3uzt53rhoxm7w67orv6hgjyp2yzxqzci4qnly2u') {
        return 'https://bafybeibtjycpgsvp4gm3uzt53rhoxm7w67orv6hgjyp2yzxqzci4qnly2u.ipfs.astyanax.io/cover.jpeg'
    }
    if (video.cid === 'bafybeihza4u4mibw727nwbj47agzp5wvbmzpyqxfxwedwuuagkte3xz4ta') {
        return 'https://bafybeih7vp6hslgr25xdma44kvyc4mr4736nx4igqxexicsuy3xccq22ym.ipfs.astyanax.io/cops_shop.jpg'
    }
}

/**
 *
 * @param video
 * @return string
 */
export function getVideoCover(video) {
    let cover = getPreCover(video);
    if (cover) return cover;
    if (video.cover) {
        if (video.cover.toString().includes('/')) {
            cover = 'https://astyanax.io/ipfs/' + video.cover
        } else {
            cover = 'https://astyanax.io/ipfs/' + video.cid + '/' + video.cover
        }
    } else {
        cover = 'https://astyanax.io/ipfs/' + video.cid + '/cover.jpeg'
    }
    return cover;
}
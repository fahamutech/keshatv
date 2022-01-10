import {IPFS_BASE_URL} from "./url";

function getPreCover(video) {
    if (video.cid === 'bafybeif6m35onngpwav7twapmrd5pce2mxxqcc625qojy7ox2hsyp6ngde') {
        return `https://${IPFS_BASE_URL}/ipfs/` + video.cid + '/cover.jpg'
    }
    if (video.cid === 'bafybeie2j5awwtxyf2wm2uj3h6unryllpw3apybm46c7vqayfv4szd27cy') {
        return `https://${IPFS_BASE_URL}/ipfs/` + video.cid + '/cover.png'
    }
    if (video.cid === 'bafybeig6dfzp5wgipwdj7ypxm3bnjdnkqgcrhajq5yyk2ut46aw4mwgi74') {
        return `https://${IPFS_BASE_URL}/ipfs/` + video.cid + '/cover.jpg'
    }
    if (video.cid === 'bafybeihxnmxpahmgiesnkqkq3fl4y7atboqsxcj3555c64ceyq5v3esasq') {
        return `https://bafybeih7vp6hslgr25xdma44kvyc4mr4736nx4igqxexicsuy3xccq22ym.ipfs.${IPFS_BASE_URL}/ni-noma-cut.jpeg`
    }
    if (video.cid === 'bafybeibtjycpgsvp4gm3uzt53rhoxm7w67orv6hgjyp2yzxqzci4qnly2u') {
        return `https://bafybeibtjycpgsvp4gm3uzt53rhoxm7w67orv6hgjyp2yzxqzci4qnly2u.ipfs.${IPFS_BASE_URL}/cover.jpeg`
    }
    if (video.cid === 'bafybeihza4u4mibw727nwbj47agzp5wvbmzpyqxfxwedwuuagkte3xz4ta') {
        return `https://bafybeih7vp6hslgr25xdma44kvyc4mr4736nx4igqxexicsuy3xccq22ym.ipfs.${IPFS_BASE_URL}/cops_shop.jpg`
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
            cover = `https://${IPFS_BASE_URL}/ipfs/` + video.cover
        } else {
            cover = `https://${IPFS_BASE_URL}/ipfs/` + video.cid + '/' + video.cover
        }
    } else {
        cover = `https://${IPFS_BASE_URL}/ipfs/` + video.cid + '/cover.jpeg'
    }
    return cover;
}
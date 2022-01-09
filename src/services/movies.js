import {cache, database, functions} from "bfast";
import {channelsCache} from "./channel";

const moviesCache = {database: 'keshatv', collection: 'movies'}

/**
 *
 * @param movies {Array<string>}
 * @return {Promise<Array<*>>}
 */
async function moviesContents(movies) {
    if (!movies) return [];
    const mCache = cache(moviesCache);
    const ap = movies.reverse().map(async x => {
        const dc = await mCache.get(x)
        if (dc) return dc
        const d = await functions().request(`https://${x}.ipfs.astyanax.io`).get()
        mCache.set(x, d).catch(console.log)
        return d
    })
    return await Promise.all(ap);
}

export async function recentlyMovies(channelId) {
    const c = await cache(channelsCache)
    const channel = await c.get(channelId)
    if (channel) {
        return moviesContents(channel.movies)
    }
    const remoteChanel = await database().table('channels').get(channelId)
    c.set(channelId, remoteChanel).catch(console.log)
    return moviesContents(remoteChanel.movies)
}

export async function categoryMovies(channelId, category) {
    const c = await cache(channelsCache)
    const channel = await c.get(channelId)
    if (channel) {
        return moviesContents(channel?.categories[category])
    }
    const remoteChanel = await database().table('channels').get(channelId)
    c.set(channelId, remoteChanel).catch(console.log)
    return moviesContents(remoteChanel?.categories[category])
}
import {cache, database} from "bfast";

export const channelsCache = {database: 'keshatv', collection: 'channels'}

export async function getChannels() {
    const c = await cache(channelsCache)

    async function updateLocalCache() {
        const remoteChannels = await database().table('channels')
            .query().orderBy('updatedAt', "desc").find();
        await c.setBulk(remoteChannels.map(x => x.id), remoteChannels.filter(z => z !== null));
        return remoteChannels.filter(z => z !== null);
    }

    return c.getAll().then(localChannels => {
        if (Array.isArray(localChannels) && localChannels.length > 0) {
            updateLocalCache().catch(console.log)
            return localChannels.filter(z => z !== null).sort((a, b) => {
                if (a.updatedAt > b.updatedAt) {
                    return -1
                } else if (a.updatedAt < b.updatedAt) {
                    return 1
                } else return 0
            });
        }
        return updateLocalCache();
    }).catch(_ => {
        return []
    });
}

export async function channelLogo(channelId) {
    const c = await cache(channelsCache)
    const channel = await c.get(channelId)
    if (channel) return channel.logo
    const a = await database().table('channels').get(channelId, {returnFields: ['logo']})
    return a.logo
}

// export async function channelCategories(id) {
//     const c = await cache(channelsCache)
//     const channel = await c.get(id)
//     if (channel) return channel.categories
//     const a = await database().table('channels').get(id, {returnFields: ['categories']})
//     return a.categories
// }

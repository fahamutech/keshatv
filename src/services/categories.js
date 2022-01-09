import {cache, database} from "bfast";
import {channelsCache} from "./channel";

export async function channelCategories(channelId) {
    const c = await cache(channelsCache)
    const channel = await c.get(channelId)
    if (channel) {
        return channel?.categories?.index ? channel.categories.index : []
    }
    const remoteChanel = await database().table('channels').get(channelId)
    c.set(channelId, remoteChanel).catch(console.log)
    return remoteChanel?.categories?.index ? remoteChanel.categories.index : []
}
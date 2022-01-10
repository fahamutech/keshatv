import ToolBar from "../components/ToolBar";
import ChannelList from "../components/ChannelList";
import {useEffect, useState} from "react";
import {getChannels} from "../services/channel";
import Loading from "../components/Loading";
import NoContents from "../components/NoContents";

function ChannelsPage() {
    const [channels, setChannels] = useState([]);
    const [sig, setSig] = useState(0);
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        document.title = 'KeshaTV - Channels'
        setLoading(true)
        getChannels().then(setChannels).catch(console.log).finally(() => {
            setLoading(false)
        });
    }, [sig])
    return (
        <>
            <ToolBar title={'Home'} backUrl={null} logo={'./logo192.png'}/>
            <Loading loading={loading}/>
            <NoContents loading={loading} contents={channels} reload={() => setSig(Math.random)}/>
            <ChannelList channels={channels}/>
        </>
    )
}

export default ChannelsPage
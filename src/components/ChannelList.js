import ChannelItem from "./ChannelItem";


function Heading({channels}) {
    if (channels && Array.isArray(channels) && channels.length > 0) {
        return (
            <>
                <div className='w-100 flex justify-center items-center ph3'>
                <span className='light-gray'>
                    Choose channel to watch or search a content you want to watch.
                </span>
                </div>
            </>
        )
    } else return null
}

function ChannelList({channels}) {
    return (
        <>
            <Heading channels={channels} />
            <div className='flex flex-column justify-center items-center'>
                {channels.map(x => ChannelItem({item: x}))}
            </div>
        </>
    );
}

export default ChannelList
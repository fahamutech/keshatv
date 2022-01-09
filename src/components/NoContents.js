function NoContents({loading, contents, reload}) {
    if (loading === false && Array.isArray(contents) && contents.length === 0) {
        return (
            <div className='flex flex-column justify-center items-center mt4 pa2'>
                <p className='light-gray'>No contents</p>
                <button className="f6 link dim br1 ph3 pv2 mb2 dib black bg-white pointer b--none"
                        onClick={reload}>Reload</button>
            </div>
        )
    } else return null
}

export default NoContents
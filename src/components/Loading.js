function Loading({loading}) {
    if (loading) {
        return (
            <div className='loader w-100 center mt4 justify-center items-center flex'/>
        )
    } else return null
}

export default Loading
function searchContainer() {
    return {
        maxWidth: '500px',
        height: '48px',
        background: '#363636'
    }
}

function searchContainerButton() {
    return {
        width: '48px',
        height: '48px',
        background: '#202020'
    }
}

function SearchBar() {
    return (
        <div className='w-100 pv3 ph2 flex justify-center content-center'>
            <div className='w-100 flex flex-row' style={searchContainer()}>
                <input
                    placeholder='Search...'
                    className='h-100 w-100 outline-0 bg-transparent b--none pl2 pr1 white'/>
                <a href="#0"
                   className='b--none link dim flex justify-center content-center white h-100 w-100 center'
                   style={searchContainerButton()}>
                    <p>Go</p>
                </a>
            </div>
        </div>
    )
}

export default SearchBar
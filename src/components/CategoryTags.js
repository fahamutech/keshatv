const activeLink = 'link br-pill pv2 ph4 white ma1 b--solid bw1';
const inactiveLink = 'link br-pill pv2 ph4 white ma1';

function link() {
    return {
        background: '#202020'
    }
}

function CategoryTags({onChoose = () => {}}) {
    return (
        <div className='ph4-l ph2 pb4 pt2 flex flex-row flex-nowrap overflow-y-scroll'>
            <a href="#0" onClick={() => onChoose('recently')} className={activeLink} style={link()}>
                Recently
            </a>
            {/*<a href="#0" onClick={() => onChoose('bongo')} className={inactiveLink} style={link()}>*/}
            {/*    Bongo*/}
            {/*</a>*/}
        </div>
    )
}

export default CategoryTags
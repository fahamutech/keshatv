import {useEffect, useState} from "react";
import {functions} from "bfast";
import {channelCategories} from "../services/categories";

const activeLink = 'link br-pill pv2 ph4 white ma1 bw1 pointer';
const inactiveLink = 'link br-pill pv2 ph4 white ma1 pointer';

function linkActive() {
    return {
        background: '#202020'
    }
}

function CategoryTags({active, onChoose, channelId}) {
    const [categories, setCategories] = useState([]);
    useEffect(() => {
        channelCategories(channelId).then(setCategories).catch(console.log)
    }, [channelId]);
    return (
        <div className='ph4-l ph2 pb2 pt2 flex flex-row flex-nowrap overflow-y-scroll'>
            <span onClick={() => onChoose('recently')}
                  className={active === 'recently' ? activeLink : inactiveLink}
                  style={active === 'recently' ? linkActive() : null}>
                Recently
            </span>
            {categories.map(y => {
                return (
                    <span key={y} onClick={() => onChoose(y)}
                          className={active === y ? activeLink : inactiveLink}
                          style={active === y ? linkActive() : null}>
                        {y}
                    </span>
                )
            })}
        </div>
    )
}

export default CategoryTags







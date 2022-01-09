import {Link} from "react-router-dom";

function ChannelItem({item}) {
    return (
        <Link key={item.id} className='w-100 pa3 flex flex-row flex-nowrap center pointer link'
              to={'/channel/'+item.id}
              style={{maxWidth: '750px'}}>
            <div style={{width: '150px', height: '150px', minWidth: '150px'}}>
                <img className='' style={{objectFit: 'cover', height: '100%', width: '100%'}}
                     alt={item.id} src={item.logo}/>
            </div>
            <div className='flex flex-column'>
                <div className='pv2 light-gray'>{item.id}</div>
                <div className='gray w-100 lh-title'>{item.description}</div>
            </div>
        </Link>
    )
}

export default ChannelItem;

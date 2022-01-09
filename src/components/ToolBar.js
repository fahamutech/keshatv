import {ReactComponent as BackArrow} from "../raw/back_arrow.svg";
import React from "react";
import {useNavigate} from "react-router-dom";

function searchContainer() {
    return {
        maxWidth: '800px',
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

function ShowBackArrow(backUrl) {
    const navigation = useNavigate();
    if (backUrl){
        return (
            <BackArrow className='pointer ph2' style={{width: '24px'}} onClick={() => navigation(backUrl)}/>
        )
    }
    else return null
}

function ToolBar({logo, title, backUrl}) {
    return (
        <div className='w-100 pv3 ph2 flex justify-center items-center'>
            {ShowBackArrow(backUrl)}
            <img style={{objectFit: 'cover'}}
                 className='ph2' width={49} height={49} src={logo} alt={title}/>
            <div className='white pa2 db-l db-m dn'>{title}</div>
            <div className='w-100 flex flex-row' style={searchContainer()}>
                <input
                    placeholder='Search...'
                    className='h-100 w-100 outline-0 bg-transparent b--none pl2 pr1 white'/>
                <button
                   className='b--none link dim flex justify-center content-center white h-100 w-100 center'
                   style={searchContainerButton()}>
                    <p>Go</p>
                </button>
            </div>
        </div>
    )
}

export default ToolBar
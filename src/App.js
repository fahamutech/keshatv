import {useState, useEffect} from 'react';
// import useIpfsFactory from './hooks/use-ipfs-factory.js'
// import useIpfs from './hooks/use-ipfs.js'
import './App.css';
import Watch from "./pages/watch";

function App() {
    // const {ipfs, ipfsInitError} = useIpfsFactory({commands: ['id']})
    // const id = useIpfs(ipfs, 'id')
    // const [version, setVersion] = useState(null)

    // useEffect(() => {
    //     if (!ipfs) return;
    //     const getVersion = async () => {
    //         const nodeId = await ipfs.version();
    //         setVersion(nodeId);
    //     }
    //     getVersion().catch(console.log);
    // }, [ipfs])

    return (
        <>
            <Watch/>
        </>
    );
}

// const Title = ({children}) => {
//     return (
//         <h2 className='f5 ma0 pb2 aqua fw4 montserrat'>{children}</h2>
//     )
// }
//
// const IpfsId = ({keys, obj}) => {
//     if (!obj || !keys || keys.length === 0) return null
//     return (
//         <>
//             {keys?.map((key) => (
//                 <div className='mb4' key={key}>
//                     <Title>{key}</Title>
//                     <div className='bg-white pa2 br2 truncate monospace' data-test={key}>{obj[key]}</div>
//                 </div>
//             ))}
//         </>
//     )
// }

export default App;

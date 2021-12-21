import './App.css';
import WatchPage from "./pages/WatchPage";
import {Route, Routes, HashRouter} from "react-router-dom";
import HomePage from "./pages/HomePage";
import {init} from "bfast";
const host = window.location.protocol + "//" + window.location.host;
init({
    applicationId: 'keshatv',
    projectId: 'keshatv',
    functionsURL: host,
    databaseURL: host
});
function App() {
    return (
        <HashRouter>
            <Routes>
                <Route path={"/"} element={<HomePage/>}/>
                <Route path={"/watch"} element={<WatchPage/>}/>
            </Routes>
        </HashRouter>
    );
}

export default App;

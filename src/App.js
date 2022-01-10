import './App.css';
import WatchPage from "./pages/Watch";
import {Route, Routes, HashRouter} from "react-router-dom";
import HomePage from "./pages/Channel";
import {init} from "bfast";
import ChannelsPage from "./pages/Channels";
import {initializeApp} from "firebase/app";
import {getAnalytics} from "firebase/analytics";
// const host = window.location.protocol + "//" + window.location.host;
init({
    applicationId: 'keshatv',
    projectId: 'keshatv',
    // functionsURL: host,
    // databaseURL: host
});

const firebaseConfig = {
    apiKey: "AIzaSyDGPoTFg3_HTm5c9Uk6cbJkrLEF-PMGupw",
    authDomain: "keshatelevision.firebaseapp.com",
    projectId: "keshatelevision",
    storageBucket: "keshatelevision.appspot.com",
    messagingSenderId: "436149896280",
    appId: "1:436149896280:web:5db43d1e632b193674f62d",
    measurementId: "G-GTV7YZ93FD"
};

const app = initializeApp(firebaseConfig);
// const analytics =
getAnalytics(app);

function App() {
    return (
        <HashRouter>
            <Routes>
                <Route path={"/"} element={<ChannelsPage/>}/>
                <Route path={"/channel/:id"} element={<HomePage/>}/>
                <Route path={"/channel/:id/watch"} element={<WatchPage/>}/>
            </Routes>
        </HashRouter>
    );
}

export default App;

import './App.css';
import WatchPage from "./pages/WatchPage";
import {Route, Routes, BrowserRouter} from "react-router-dom";
import HomePage from "./pages/HomePage";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path={"/"} element={<HomePage/>}/>
                <Route path={"/watch"} element={<WatchPage/>}/>
            </Routes>
        </BrowserRouter>
    );
}

export default App;

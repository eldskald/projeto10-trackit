import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import UserContext from "../shared/UserContext"

import ServerDataLoader from "./ServerDataLoader";
import Home from "./Home";
import SignUp from "./SignUp";
import Habits from "./Habits";
import Today from "./Today";
import History from "./History";

export default function App () {

    const [user, setUser] = useState({});
    const [habits, setHabits] = useState([]);
    const [today, setToday] = useState([]);
    const [history, setHistory] = useState([]);
    const [reloader, setReloader] = useState(0);

    function reloadServerData () {
        setReloader(reloader === 0 ? 1 : 0);
    }

    return (
        <UserContext.Provider value={{
            user, setUser, habits, setHabits, today, setToday, history, setHistory, reloadServerData
        }}>
            <BrowserRouter>
                <ServerDataLoader reloader={reloader} />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/cadastro" element={<SignUp />} />
                    <Route path="/habitos" element={<Habits />} />
                    <Route path="/hoje" element={<Today />} />
                    <Route path="/historico" element={<History />} />
                </Routes>
            </BrowserRouter>
        </UserContext.Provider>
    );
}



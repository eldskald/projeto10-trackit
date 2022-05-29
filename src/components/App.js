import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import UserContext from "../shared/UserContext"

import StorageReader from "./StorageReader";
import Home from "./Home";
import SignUp from "./SignUp";
import Habits from "./Habits";

export default function App () {

    const [user, setUser] = useState({});
    const [habits, setHabits] = useState([]);
    const [today, setToday] = useState([]);

    return (
        <UserContext.Provider value={{ user, setUser, habits, setHabits, today, setToday }}>
            <BrowserRouter>
                <StorageReader />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/cadastro" element={<SignUp />} />
                    <Route path="/habitos" element={<Habits />} />
                </Routes>
            </BrowserRouter>
        </UserContext.Provider>
    );
}



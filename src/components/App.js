import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import UserContext from "../shared/UserContext"

import Home from "./Home";
import SignUp from "./SignUp";

export default function App () {

    const [user, setUser] = useState({});

    return (
        <UserContext.Provider value={{ user, setUser }}>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/cadastro" element={<SignUp />} />
                </Routes>
            </BrowserRouter>
        </UserContext.Provider>
    );
}

import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./Home";
import SignUp from "./SignUp";

export default function App () {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/cadastro" element={<SignUp />} />
            </Routes>
        </BrowserRouter>
    );
}

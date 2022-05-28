import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";
import { ThreeDots } from "react-loader-spinner";

import UserContext from "../shared/UserContext";

import Header from "./Header";
import Menu from "./Menu";

export default function Habits () {

    const { user } = useContext(UserContext);

    return (
        <>
            <Header />
            <Menu />
        </>
    );
}

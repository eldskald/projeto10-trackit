import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";
import { TailSpin } from "react-loader-spinner";

import UserContext from "../shared/UserContext";

export default function StorageReader () {

    const [loadingHabits, setLoadingHabits] = useState("loading");
    const [loadingToday, setLoadingToday] = useState("loading");

    const navigate = useNavigate();
    const { setUser, setHabits, setToday } = useContext(UserContext);
    const storageData = localStorage.getItem("user");

    useEffect(() => {
        if (storageData) {
            const data = JSON.parse(storageData);
            axios.post("https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/auth/login", data)
                .then(response => {
                    setUser({...response.data});
                    requestHabits(response.data.token);
                    requestToday(response.data.token);
                })
                .catch(() => {
                    localStorage.clear();
                    setLoadingHabits("");
                    setLoadingToday("");
                    navigate("/", {replace: true});
                });
        } else {
            setLoadingHabits("");
            setLoadingToday("");
            navigate("/", {replace: true});
        }
    }, []);

    function requestHabits (token) {
        axios.get(
            "https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits",
            {headers: {
                Authorization: `Bearer ${token}`
            }}
        )
            .then(response => {
                setHabits([...response.data]);
                setLoadingHabits("");
            })
            .catch(() => {
                localStorage.clear();
                setUser({});
                setLoadingHabits("");
                setLoadingToday("");
                navigate("/", {replace: true});
            });
    }

    function requestToday (token) {
        axios.get(
            "https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/today",
            {headers: {
                Authorization: `Bearer ${token}`
            }}
        )
            .then(response => {
                setToday([...response.data]);
                setLoadingToday("");
            })
            .catch(() => {
                localStorage.clear();
                setUser({});
                setLoadingHabits("");
                setLoadingToday("");
                navigate("/", {replace: true});
            });
    }
    
    if (loadingHabits || loadingToday) {
        return (
            <SpinnerContainer>
                <TailSpin color="var(--maincolor)" height="200" width="200" />
            </SpinnerContainer>
        );
    }

    return <></>;
}

const SpinnerContainer = styled.div`
    position: absolute;
    top: 0px;
    bottom: 0px;
    left: 0px;
    right: 0px;
    z-index: 3;

    display: flex;
    justify-content: center;
    align-items: center;

    background-color: var(--divcolor);
`;

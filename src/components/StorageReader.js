import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";
import { TailSpin } from "react-loader-spinner";

import UserContext from "../shared/UserContext";

export default function StorageReader () {

    const [loadingStorage, setLoadingStorage] = useState("loading");
    const [loginError, setLoginError] = useState("");

    const navigate = useNavigate();
    const { setUser } = useContext(UserContext);

    useEffect(() => {
        const storageData = localStorage.getItem("user");
        if (storageData) {
            const data = JSON.parse(storageData);
            axios.post("https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/auth/login", data)
                .then(response => {
                    setUser({...response.data});
                    setLoadingStorage("");
                })
                .catch(() => {
                    storageData.clear();
                    setLoadingStorage("");
                    navigate("/", {replace: true});
                });
        } else {
            setLoadingStorage("");
            navigate("/", {replace: true});
        }
    }, []);
    
    if (loadingStorage) {
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

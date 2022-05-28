import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";
import { ThreeDots } from "react-loader-spinner";
import { CircularProgressbarWithChildren, buildStyles } from "react-circular-progressbar";

import UserContext from "../shared/UserContext";
import ErrorMessage from "../shared/ErrorMessage";

export default function Menu () {

    const [daily, setDaily] = useState([]);
    const [loadingDaily, setLoadingDaily] = useState("loading");
    const [errorMessage, setErrorMessage] = useState("");

    const navigate = useNavigate();
    const { user } = useContext(UserContext);

    useEffect(() => {
        if (Object.keys(user).length > 0) {
            axios.get(
                "https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/today",
                { headers: {
                    Authorization: `Bearer ${user.token}`
                }}
            )
                .then(response => {
                    setDaily(response.data);
                    setLoadingDaily("");
                })
                .catch(() => {
                    setErrorMessage("Erro!");
                    setLoadingDaily("");
                });
        }
    }, [user]);

    function getPercent () {
        let done = 0;
        let total = 0;
        daily.forEach(habit => {
            total++;
            done += habit.done ? 1 : 0;
        });
        return Math.round(done * 100 / total);
    }

    function MidCircle () {
        if (loadingDaily) {
            return (
                <CircContainer>
                    <div>
                        <ThreeDots
                            color="var(--divcolor)"
                            width="64px"
                        />
                    </div>
                </CircContainer>
            );
        } else {
            return (
                <CircContainer>
                    <div>
                        {errorMessage ? (
                            <ErrorMessage error={errorMessage} />
                        ) : (
                            <CircularProgressbarWithChildren
                                value={getPercent()}
                                background
                                backgroundPadding={6}
                                styles={buildStyles({
                                    backgroundColor: "var(--maincolor)",
                                    textColor: "var(--divcolor)",
                                    pathColor: "var(--divcolor)",
                                    strokeLinecap: "round",
                                    trailColor: "transparent"
                                })}
                            >
                                <p>Hoje</p>
                            </CircularProgressbarWithChildren>
                        )}
                    </div>
                </CircContainer>
            );
        }
    }

    return (
        <>
            <MidCircle />
            <Container>
                <p onClick={() => navigate("/habitos")}>
                    Hábitos
                </p>
                <p>
                    Histórico
                </p>
            </Container>
        </>
    );
}

const Container = styled.div`
    position: absolute;
    bottom: 0px;
    left: 0px;
    width: 100%;
    height: 72px;
    z-index: 1;

    padding: 0px 32px;
    display: flex;
    justify-content: space-between;
    align-items: center;

    background-color: var(--divcolor);

    p {
        color: var(--maincolor);
        font-family: var(--scriptfont);
        font-size: 20px;
        cursor: pointer;
    }
`;

const CircContainer = styled.div`
    position: absolute;
    bottom: 0px;
    left: 0px;
    width: 100%;

    display: flex;
    justify-content: center;
    align-items: center;

    div {
        width: 92px;
        height: 92px;
        margin-bottom: 16px;
        z-index: 2;

        background-color: var(--maincolor);
        border: 1px solid transparent;
        border-radius: 50%;
    }

    p {
        margin-bottom: 8px;

        color: var(--divcolor);
        font-family: var(--scriptfont);
        font-size: 20px;
        cursor: pointer;
    }
`;

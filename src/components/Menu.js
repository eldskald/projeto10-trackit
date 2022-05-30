import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { CircularProgressbarWithChildren } from "react-circular-progressbar";

import UserContext from "../shared/UserContext";

export default function Menu () {

    const navigate = useNavigate();
    const { today } = useContext(UserContext);

    function getPercent () {
        let done = 0;
        let total = 0;
        today.forEach(habit => {
            total++;
            done += habit.done ? 1 : 0;
        });
        return Math.round(done * 100 / total);
    }

    return (
        <>
            <Container>
                <p onClick={() => navigate("/habitos")}>
                    Hábitos
                </p>
                <p>
                    Histórico
                </p>
            </Container>
            <CircContainer>
                <CircDiv>
                    <CircularProgressbarWithChildren
                        value={getPercent()}
                        background
                        backgroundPadding={6}

                        styles={{
                            root: {
                                width: "92px"
                            },
                            path: {
                                stroke: "var(--divcolor)",
                                strokeLinecap: "round"
                            },
                            trail: {
                                stroke: "transparent"
                            },
                            background: {
                                fill: "var(--maincolor)"
                            }
                        }}
                    >
                        <p onClick={() => navigate("/hoje")}>Hoje</p>
                    </CircularProgressbarWithChildren>
                </CircDiv>
            </CircContainer>
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
    bottom: 16px;
    left: 0px;
    width: 100%;

    display: flex;
    justify-content: center;
    align-items: center;

    p {
        margin-bottom: 8px;

        color: var(--divcolor);
        font-family: var(--scriptfont);
        font-size: 20px;
        cursor: pointer;
    }
`;

const CircDiv = styled.div`
    z-index: 1;
`;

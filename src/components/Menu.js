import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { CircularProgressbarWithChildren, buildStyles } from "react-circular-progressbar";

export default function Menu ({ habits }) {

    const navigate = useNavigate();

    function getPercent () {
        let done = 0;
        let total = 0;
        habits.forEach(habit => {
            total++;
            done += habit.done ? 1 : 0;
        });
        return Math.round(done * 100 / total);
    }

    return (
        <>
            <CircContainer>
                <div>
                    <CircularProgressbarWithChildren
                        value={70}
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
                </div>
            </CircContainer>
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
    }

    p {
        margin-bottom: 8px;

        color: var(--divcolor);
        font-family: var(--scriptfont);
        font-size: 20px;
        cursor: pointer;
    }
`;
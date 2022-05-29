import { useState, useContext } from "react";
import axios from "axios";
import styled from "styled-components";

import UserContext from "../shared/UserContext";
import ErrorMessage from "../shared/ErrorMessage";

export default function HabitToday (
    { id, name, done, currentSequence, highestSequence }
) {

    const [toggling, setToggling] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    
    const { user, reloadServerData } = useContext(UserContext);

    function CurrentSequence () {
        const numColor = done ? "var(--donecolor)" : "var(--scriptcolor)";
        return (
            <Sequence>
                {"Sequência atual: "}
                <span style={{color: numColor}}>
                    {currentSequence} {currentSequence === 1 ? "dia" : "dias"}
                </span>
            </Sequence>
        );
    }

    function HighestSequence () {
        const numColor = done && highestSequence === currentSequence ? "var(--donecolor)" : "var(--scriptcolor)";
        return (
            <Sequence>
                {"Seu recorde: "}
                <span style={{color: numColor}}>
                    {highestSequence} {highestSequence === 1 ? "dia" : "dias"}
                </span>
            </Sequence>
        );
    }

    function handleToggle () {
        if (!done) {
            setToggling("toggling");
            axios.post(
                `https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/${id}/check`,
                null,
                {headers: {
                    Authorization: `Bearer ${user.token}`
                }}
            )
                .then(() => {
                    reloadServerData();
                    setToggling("");
                })
                .catch(() => {
                    setErrorMessage("Houve um erro!");
                    setToggling("");
                })
        } else {
            setToggling("toggling");
            axios.post(
                `https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/${id}/uncheck`,
                null,
                {headers: {
                    Authorization: `Bearer ${user.token}`
                }}
            )
                .then(() => {
                    reloadServerData();
                    setToggling("");
                })
                .catch(() => {
                    setErrorMessage("Houve um erro!");
                    setToggling("");
                })
        }
    }

    return (
        <Container>
            <HabitData>
                <HabitName>{name}</HabitName>
                <div>
                    <CurrentSequence />
                    <HighestSequence />
                    <ErrorMessage error={errorMessage} />
                </div>
            </HabitData>
            <Button done={done} onClick={handleToggle} toggling={toggling} disabled={toggling}>
                <ion-icon name="checkmark"></ion-icon>
            </Button>
        </Container>
    );
}

const Container = styled.div`
    width: 100%;
    margin: 8px 0px;

    padding: 16px;
    display: flex;
    justify-content: space-between;
    align-items: center;

    background-color: var(--divcolor);
    border: 1px solid transparent;
    border-radius: 8px;
`;

const HabitData = styled.div`
    height: 100%;

    display: flex;
    flex-direction: column;
    justify-content: space-between;
`;

const HabitName = styled.h1`
    font-family: var(--scriptfont);
    color: var(--scriptcolor);
    font-size: 20px;
`;

const Sequence = styled.p`
    font-family: var(--scriptfont);
    color: var(--scriptcolor);
    font-size: 14px;
`;

const Button = styled.button`
    width: 64px;
    height: 64px;

    display: flex;
    justify-content: center;
    align-items: center;

    background-color: ${props => props.done ? "var(--donecolor)" : "var(--sec2color)"};
    border: 1px solid transparent;
    border-radius: 8px;
    opacity: ${props => props.toggling ? 0.4 : 1};
    cursor: ${props => props.toggling ? "default" : "pointer"};

    ion-icon {
        color: var(--divcolor);
        font-size: 64px;
        --ionicon-stroke-width: 72px;
    }
`;

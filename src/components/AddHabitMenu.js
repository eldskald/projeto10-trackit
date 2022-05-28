import { useState } from "react";
import axios from "axios";
import styled from "styled-components";

import { TextInput, Button } from "../shared/InputTypes";
import ErrorMessage from "../shared/ErrorMessage";

export default function AddHabitMenu ({ close }) {

    const [name, setName] = useState("");
    const [pressedWeekdays, setPressedWeekdays] = useState([
        false, false, false, false, false, false, false
    ]);
    
    const [submitting, setSubmitting] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    function handleWeekdayPress (num) {
        let aux = pressedWeekdays.map((value, index) => {
            return index === num ? !value : value;
        });
        setPressedWeekdays([...aux]);
    }

    return (
        <Container>
            <TextInput
                type="text"
                placeholder="nome do hábito"
                value={name}
                onChange={e => setName(e.target.value)}
                disabled={submitting}
                loading={submitting}
            />
            <WeekdaysContainer>
                <Weekday pressed={pressedWeekdays[0]} onClick={() => handleWeekdayPress(0)}>D</Weekday>
                <Weekday pressed={pressedWeekdays[1]} onClick={() => handleWeekdayPress(1)}>S</Weekday>
                <Weekday pressed={pressedWeekdays[2]} onClick={() => handleWeekdayPress(2)}>T</Weekday>
                <Weekday pressed={pressedWeekdays[3]} onClick={() => handleWeekdayPress(3)}>Q</Weekday>
                <Weekday pressed={pressedWeekdays[4]} onClick={() => handleWeekdayPress(4)}>Q</Weekday>
                <Weekday pressed={pressedWeekdays[5]} onClick={() => handleWeekdayPress(5)}>S</Weekday>
                <Weekday pressed={pressedWeekdays[6]} onClick={() => handleWeekdayPress(6)}>S</Weekday>
            </WeekdaysContainer>
            <ErrorMessage error={errorMessage} />
            <div>
                <CancelButton onClick={close}>Cancelar</CancelButton>
                <Button text="Salvar" loading={submitting} />
            </div>
        </Container>
    );
}

const Container = styled.div`
    width: 100%;
    margin: 16px 0px;

    padding: 16px;

    background-color: var(--divcolor);
    border: 1px solid transparent;
    border-radius: 8px;

    > div:last-child {
        margin-top: 32px;

        display: flex;
        justify-content: end;
        align-items: center;
    }
`;

const WeekdaysContainer = styled.div`
    margin-top: 4px;

    display: flex;
`;

const Weekday = styled.button`
    width: 32px;
    height: 32px;
    margin-right: 4px;

    display: flex;
    justify-content: center;
    align-items: center;

    border: 2px solid var(--sec2color);
    border-radius: 4px;
    background-color: ${props => props.pressed ? "var(--sec2color)" : "var(--divcolor)"};
    cursor: pointer;

    font-family: var(--scriptfont);
    font-size: 20px;
    color: ${props => props.pressed ? "var(--divcolor)" : "var(--sec2color)"};
`;

const CancelButton = styled.div`
    margin: 0px 16px;

    cursor: pointer;

    font-size: 16px;
    font-family: var(--scriptfont);
    color: var(--maincolor);
`;

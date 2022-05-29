import { useState, useContext } from "react";
import axios from "axios";
import styled from "styled-components";
import { ThreeDots } from "react-loader-spinner";

import UserContext from "../shared/UserContext";
import { TextInput } from "../shared/InputTypes";
import { WeekdaysContainer, Weekday } from "../shared/HabitStyles";
import ErrorMessage from "../shared/ErrorMessage";

export default function AddHabitMenu ({
    name, setName, pressedWeekdays, setPressedWeekdays, close
}) {

    const [submitting, setSubmitting] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const { user, reloadServerData } = useContext(UserContext);

    function getDays () {
        let aux = pressedWeekdays.map((value, index) => value ? index : -1);
        return aux.filter(value => value === -1 ? false : true);
    }

    function handleWeekdayPress (num) {
        let aux = pressedWeekdays.map((value, index) => {
            return index === num ? !value : value;
        });
        setPressedWeekdays([...aux]);
    }

    function handleSubmit () {
        const data = {
            name: name,
            days: getDays()
        }
        if (data.name === "" || data.days.length === 0) {
            setErrorMessage("Escreva um nome e escolha dias!");
            return;
        }

        setSubmitting("submitting");
        axios.post(
            "https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits",
            data,
            {headers: {
                Authorization: `Bearer ${user.token}`
            }}
        )
            .then(() => {
                reloadServerData();
                setSubmitting("");
                setName("");
                setPressedWeekdays([false, false, false, false, false, false, false]);
            })
            .catch(error => {
                setErrorMessage(error.response.data.message);
                setSubmitting("");
            });
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
                <Weekday
                    pressed={pressedWeekdays[0]}
                    onClick={() => handleWeekdayPress(0)}
                    disabled={submitting}
                >D</Weekday>
                <Weekday
                    pressed={pressedWeekdays[1]}
                    onClick={() => handleWeekdayPress(1)}
                    disabled={submitting}
                >S</Weekday>
                <Weekday
                    pressed={pressedWeekdays[2]}
                    onClick={() => handleWeekdayPress(2)}
                    disabled={submitting}
                >T</Weekday>
                <Weekday
                    pressed={pressedWeekdays[3]}
                    onClick={() => handleWeekdayPress(3)}
                    disabled={submitting}
                >Q</Weekday>
                <Weekday
                    pressed={pressedWeekdays[4]}
                    onClick={() => handleWeekdayPress(4)}
                    disabled={submitting}
                >Q</Weekday>
                <Weekday
                    pressed={pressedWeekdays[5]}
                    onClick={() => handleWeekdayPress(5)}
                    disabled={submitting}
                >S</Weekday>
                <Weekday
                    pressed={pressedWeekdays[6]}
                    onClick={() => handleWeekdayPress(6)}
                    disabled={submitting}
                >S</Weekday>
            </WeekdaysContainer>
            <ErrorMessage error={errorMessage} />
            <div>
                <CancelButton onClick={close}>Cancelar</CancelButton>
                <Button loading={submitting} disabled={submitting} onClick={handleSubmit}>
                    {submitting ? (
                        <ThreeDots color="var(--divcolor)" width="80px" />
                    ) : (
                        "Salvar"
                    )}
                </Button>
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

const Button = styled.button`
    height: 36px;
    margin: 4px;

    padding: 0px 16px;
    display: flex;
    justify-content: center;
    align-items: center;

    border: 1px solid transparent;
    border-radius: 4px;
    background-color: var(--maincolor);
    cursor: ${props => props.loading ? "default" : "pointer"};
    opacity: ${props => props.loading ? 0.4 : 1};

    font-size: 16px;
    color: var(--divcolor);
    text-align: center;
`;

const CancelButton = styled.div`
    margin: 0px 16px;

    cursor: pointer;

    font-size: 16px;
    font-family: var(--scriptfont);
    color: var(--maincolor);
`;

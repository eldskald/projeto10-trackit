import { useState, useContext } from "react";
import Calendar from "react-calendar";
import styled from "styled-components";
import 'react-calendar/dist/Calendar.css';

import UserContext from "../shared/UserContext";

import Header from "./Header";
import Menu from "./Menu";

export default function History () {

    const [dayHabits, setDayHabits] = useState([]);

    const { history } = useContext(UserContext);

    function stringDate (date) {
        let aux = date.getDate().toString() + "/";
        aux += (date.getMonth() + 1).toString().padStart(2, "0") + "/";
        aux += date.getFullYear();
        return aux;
    }

    function getDayOnHistory (date) {
        const str = stringDate(date);
        for (let i = 0; i < history.length; i++) {
            if (str === history[i].day) {
                return history[i];
            }
        }
        return null;
    }

    function isCompleted ({ habits }) {
        for (let i = 0; i < habits.length; i++) {
            if (!habits[i].done) {
                return false;
            }
        }
        return true;
    }

    function getTileClass (date) {
        let classes = [];
        const today = new Date();
        const str = stringDate(date);
        const day = getDayOnHistory(date);

        if (today.getMonth() !== date.getMonth()) {
            classes.push("otherMonth");
        }

        if (day && str !== stringDate(today)) {
            if (isCompleted(day)) {
                classes.push("completed");
            } else {
                classes.push("failed");
            }
        }

        return classes.join(" ");
    }

    function handleClickDay (date) {
        const day = getDayOnHistory(date)
        if (day) {
            setDayHabits([...day.habits]);
        }
    }

    function Habit ({ name, done }) {
        return (
            <HabitContainer done={done}>
                <h1>{name}</h1>
                <h2>{done ? "Concluído" : "Não concluído"}</h2>
            </HabitContainer>
        );
    }

    return (
        <>
            <Header />
            <Container>
                <h1>Histórico</h1>
                <Calendar
                    value={new Date()}
                    locale="pt-br"
                    onClickDay={value => handleClickDay(value)}
                    tileClassName={({ date }) => getTileClass(date)}
                    tileDisabled={({ date, view }) => !getDayOnHistory(date) && view === "month"}
                />
            </Container>
            <Menu />
            {dayHabits.length > 0 ? (
                <PopupBackground onClick={() => setDayHabits([])}>
                    <Popup>
                        {dayHabits.map(habit => <Habit key={habit.id} name={habit.name} done={habit.done} />)}
                    </Popup>
                </PopupBackground>
            ) : (
                <></>
            )}
        </>
    );
}

const Container = styled.div`
    position: absolute;
    top: 72px;
    bottom: 72px;
    left: 0px;
    right: 0px;

    padding: 32px;
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow-y: scroll;

    h1 {
        width: 100%;
        margin-bottom: 32px;

        color: var(--sec1color);
        font-family: var(--scriptfont);
        font-size: 24px;
    }

    /* Styles for the calendar */
    .react-calendar {
        padding: 8px;
        border: 1px solid transparent;
        border-radius: 8px;
        background: var(--divcolor);
    }

    .react-calendar__tile:disabled,
    .react-calendar__tile:enabled:hover,
    .react-calendar__tile:enabled:focus,
    .react-calendar__tile--range {
        background-color: transparent;
    }

    .react-calendar__tile--now {
        background-color: #ffff76 !important;
    }

    .completed {
        box-sizing: border-box;
        border: 4px solid var(--divcolor);
        border-radius: 50%;
        background-color: var(--donecolor) !important;
    }

    .failed {
        box-sizing: border-box;
        border: 4px solid var(--divcolor);
        border-radius: 50%;
        background-color: var(--errorcolor) !important;
    }

    .otherMonth {
        opacity: 0.4;
    }
`;

const PopupBackground = styled.div`
    position: absolute;
    top: 0px;
    bottom: 0px;
    left: 0px;
    right: 0px;
    z-index: 3;

    display: flex;
    justify-content: center;
    align-items: center;

    background-color: rgba(0, 0, 0, 0.5);
`;

const Popup = styled.div`
    width: 300px;
    max-height: 50%;

    padding: 0px 16px;

    background-color: var(--divcolor);
    border: 1px solid transparent;
    border-radius: 8px;
    overflow-y: scroll;
`;

const HabitContainer = styled.div`
    width: 100%;
    margin: 16px 0px;

    h1 {
        font-family: var(--scriptfont);
        font-size: 20px;
        color: var(--scriptcolor);
    }

    h2 {
        font-family: var(--scriptfont);
        font-size: 16px;
        color: ${props => props.done ? "var(--donecolor)" : "var(--errorcolor)"};
    }
`;

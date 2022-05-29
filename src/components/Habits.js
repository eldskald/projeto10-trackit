import { useState, useContext } from "react";
import styled from "styled-components";

import UserContext from "../shared/UserContext";

import Header from "./Header";
import Menu from "./Menu";
import AddHabitMenu from "./AddHabitMenu";
import Habit from "./Habit";

export default function Habits () {

    const [addingHabit, setAddingHabit] = useState("");
    const [newHabitName, setNewHabitName] = useState("");
    const [pressedWeekdays, setPressedWeekdays] = useState([
        false, false, false, false, false, false, false
    ]);

    const { habits } = useContext(UserContext);

    return (
        <>
            <Header />
            <Container>
                <HabitsTop>
                    <TitleAndAddButton>
                        <h1>Meus hábitos</h1>
                        <button onClick={() => setAddingHabit("true")}>
                            <ion-icon name="add-outline"></ion-icon>
                        </button>
                    </TitleAndAddButton>
                    {addingHabit ? (
                        <AddHabitMenu
                            name={newHabitName}
                            setName={setNewHabitName}
                            pressedWeekdays={pressedWeekdays}
                            setPressedWeekdays={setPressedWeekdays}
                            close={() => setAddingHabit("")}
                        />
                    ) : (
                        <></>
                    )}
                    {habits.length === 0 ? (
                        <NoHabitsText>
                            Você não tem nenhum hábito cadastrado ainda. Adicione um hábito para começar a trackear!
                        </NoHabitsText>
                    ) : (
                        <>
                            {habits.map(habit => <Habit
                                key={habit.id}
                                id={habit.id}
                                name={habit.name}
                                days={habit.days}
                            />)}
                        </>
                    )}
                </HabitsTop>
            </Container>
            <Menu />
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
    overflow-y: scroll;
`;

const HabitsTop = styled.div`
    width: 100%;
`;

const TitleAndAddButton = styled.div`
    width: 100%;
    height: 36px;
    margin-bottom: 16px;

    display: flex;
    justify-content: space-between;
    align-items: center;

    h1 {
        color: var(--sec1color);
        font-family: var(--scriptfont);
        font-size: 24px;
    }

    button {
        width: 36px;
        height: 36px;

        display: flex;
        align-items: center;
        justify-content: center;

        background-color: var(--maincolor);
        border: 1px solid transparent;
        border-radius: 4px;
        cursor: pointer;

        ion-icon {
            color: var(--divcolor);
            font-size: 28px;
            --ionicon-stroke-width: 64px;
        }
    }
`;

const NoHabitsText = styled.p`
    margin-top: 32px;

    font-family: var(--scriptfont);
    font-size: 18px;
`;

const SpinnerContainer = styled.div`
    width: 100%;
    height: 100%;

    display: flex;
    align-items: center;
    justify-content: center;
`;

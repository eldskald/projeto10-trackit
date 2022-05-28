import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";
import { RotatingLines } from "react-loader-spinner";

import UserContext from "../shared/UserContext";
import ErrorMessage from "../shared/ErrorMessage";

import Header from "./Header";
import Menu from "./Menu";
import AddHabitMenu from "./AddHabitMenu";

export default function Habits () {

    const [habits, setHabits] = useState([]);
    const [errorMessage, setErrorMessage] = useState("");
    const [loadingHabits, setLoadingHabits] = useState("loading");
    const [addingHabit, setAddingHabit] = useState("");

    const navigate = useNavigate();
    const { user } = useContext(UserContext);

    useEffect(() => {
        if (Object.keys(user).length > 0) {
            axios.get(
                "https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits",
                { headers: {
                    Authorization: `Bearer ${user.token}`
                }}
            )
                .then(response => {
                    setHabits(response.data);
                    setLoadingHabits("");
                })
                .catch(error => {
                    setErrorMessage(error.response.data.message);
                    setLoadingHabits("");
                });
        }
    }, [user]);

    if (loadingHabits) {
        return (
            <>
                <Header />
                <SpinnerContainer>
                    <RotatingLines width="200" strokeColor="var(--maincolor)" />
                </SpinnerContainer>
            </>
        );
    }

    return (
        <>
            <Header />
            <Container>
                <ErrorMessage error={errorMessage} />
                <HabitsTop>
                    <TitleAndAddButton>
                        <h1>Meus hábitos</h1>
                        <button onClick={() => setAddingHabit("true")}>
                            <ion-icon name="add-outline"></ion-icon>
                        </button>
                    </TitleAndAddButton>
                    {addingHabit ? (
                        <AddHabitMenu close={() => setAddingHabit("")} />
                    ) : (
                        <></>
                    )}
                    {habits.length === 0 ? (
                        <NoHabitsText>
                            Você não tem nenhum hábito cadastrado ainda. Adicione um hábito para começar a trackear!
                        </NoHabitsText>
                    ) : (
                        <></>
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
`;

const HabitsTop = styled.div`
    width: 100%;
`;

const TitleAndAddButton = styled.div`
    width: 100%;
    height: 36px;

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

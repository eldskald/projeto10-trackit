import { useState, useContext } from "react";
import axios from "axios";
import styled from "styled-components";
import { ThreeDots } from "react-loader-spinner";

import UserContext from "../shared/UserContext";
import { WeekdaysContainer, Weekday } from "../shared/HabitStyles";
import { CancelButton } from "../shared/InputTypes";
import ErrorMessage from "../shared/ErrorMessage";

export default function Habit ({ id, name, days }) {

    const [deleteMenu, setDeleteMenu] = useState("");
    const [deleting, setDeleting] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const { user, reloadServerData } = useContext(UserContext);
    const weekdayNames = ["D", "S", "T", "Q", "Q", "S", "S"];

    function getWeekdaysArray () {
        let aux = [false, false, false, false, false, false, false];
        return aux.map((value, index) => days.includes(index) ? !value : value);
    }

    function toggleDeleteMenu () {
        if (!deleting) {
            setDeleteMenu(deleteMenu ? "" : "delete");
        }
    }

    function handleDelete () {
        setDeleting("deleting");
        axios.delete(
            `https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/${id}`,
            {headers: {
                Authorization: `Bearer ${user.token}`
            }}
        )
            .then(() => {
                reloadServerData();
            })
            .catch(() => {
                setErrorMessage("Houve um erro!");
                setDeleting("");
            });
    }

    return (
        <Container>
            <h1>{name}</h1>
            <ion-icon name="trash-outline" onClick={toggleDeleteMenu}></ion-icon>
            <WeekdaysContainer>
                {getWeekdaysArray().map((value, index) => (
                    <Weekday key={index} pressed={value} style={{cursor: "default"}}>
                        {weekdayNames[index]}
                    </Weekday>
                ))}
            </WeekdaysContainer>
            {deleteMenu ? (
                <DeleteMenuContainer>
                    <p>Deletar mesmo esse hábito?</p>
                    <ErrorMessage error={errorMessage} />
                    <DeleteMenu>
                        <CancelButton onClick={toggleDeleteMenu}>Cancelar</CancelButton>
                        <DeleteButton loading={deleting} disabled={deleting} onClick={handleDelete}>
                            {deleting ? (
                                <ThreeDots color="var(--divcolor)" width="80px" />
                            ) : (
                                "Deletar"
                            )}
                        </DeleteButton>
                    </DeleteMenu>
                </DeleteMenuContainer>
            ) : (
                <></>
            )}
        </Container>
    );
} 

const Container = styled.div`
    position: relative;
    width: 100%;
    margin: 10px 0px;

    padding: 16px;

    background-color: var(--divcolor);
    border: 1px solid transparent;
    border-radius: 8px;

    ion-icon {
        position: absolute;
        top: 8px;
        right: 8px;

        color: var(--scriptcolor);
        font-size: 32px;
        cursor: pointer;
    }

    h1 {
        margin-bottom: 16px;

        font-family: var(--scriptfont);
        font-size: 20px;
        color: var(--scriptcolor);
    }
`;

const DeleteMenuContainer = styled.div`
    width: 100%;
    margin-top: 16px;

    p {
        font-family: var(--scriptfont);
        font-size: 16px;
        color: var(--scriptcolor);
    }
`;

const DeleteMenu = styled.div`
    width: 100%;
    margin-top: 16px;

    display: flex;
    justify-content: space-around;
    align-items: center;
`;

const DeleteButton = styled.button`
    height: 36px;
    margin: 4px;

    padding: 0px 16px;
    display: flex;
    justify-content: center;
    align-items: center;

    border: 1px solid transparent;
    border-radius: 4px;
    background-color: var(--errorcolor);
    cursor: ${props => props.loading ? "default" : "pointer"};
    opacity: ${props => props.loading ? 0.4 : 1};

    font-size: 16px;
    color: var(--divcolor);
    text-align: center;
`;

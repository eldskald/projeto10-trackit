import { useContext } from "react";
import styled from "styled-components";
import dayjs from "dayjs";
import "dayjs/locale/pt-br";

import UserContext from "../shared/UserContext";

import Header from "./Header";
import Menu from "./Menu";
import HabitToday from "./HabitToday";

export default function Today () {

    const { today } = useContext(UserContext);

    function getTitle () {
        let weekday = dayjs().locale("pt-br").format("dddd");
        weekday = weekday[0].toUpperCase() + weekday.slice(1);
        return `${weekday}, ${dayjs().format("DD/MM")}`;
    }

    function getPercent () {
        let done = 0;
        let total = 0;
        today.forEach(habit => {
            total++;
            done += habit.done ? 1 : 0;
        });
        return Math.round(done * 100 / total);
    }

    function getSubtitle () {
        const percent = getPercent();
        if (percent === 0 || isNaN(percent)) {
            return "Nenhum hábito concluído ainda";
        } else {
            return `${percent}% dos hábitos concluídos`;
        }
    }

    return (
        <>
            <Header />
            <Container>
                <Title>{getTitle()}</Title>
                <Subtitle done={getPercent() > 0}>{getSubtitle()}</Subtitle>
                {today.map(habit => <HabitToday
                    key={habit.id}
                    id={habit.id}
                    name={habit.name}
                    done={habit.done}
                    currentSequence={habit.currentSequence}
                    highestSequence={habit.highestSequence}
                />)}
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

const Title = styled.h1`
    color: var(--sec1color);
    font-family: var(--scriptfont);
    font-size: 24px;
`;

const Subtitle = styled.p`
        margin-top: 6px;
        margin-bottom: 32px;

        color: ${props => props.done ? "var(--donecolor)" : "var(--sec2color)"};
        font-family: var(--scriptfont);
        font-size: 18px;
`;

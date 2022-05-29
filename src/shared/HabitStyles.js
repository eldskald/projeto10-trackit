import styled from "styled-components";

export const WeekdaysContainer = styled.div`
    margin-top: 4px;

    display: flex;
`;

export const Weekday = styled.button`
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

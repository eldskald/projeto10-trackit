import styled from "styled-components";

export const TextInput = styled.input`
    width: 300px;
    height: 42px;
    margin: 4px;

    padding-left: 16px;

    border: 2px solid var(--sec2color);
    border-radius: 4px;
    outline: none;
    opacity: ${props => props.loading ? 0.4 : 1};

    font-size: 20px;

    :placeholder {
        color: var(--sec2color);
    }
`;

export const LongButton = styled.button`
    width: 300px;
    height: 42px;
    margin: 4px;

    display: flex;
    justify-content: center;
    align-items: center;

    border: 1px solid transparent;
    border-radius: 4px;
    background-color: var(--maincolor);
    cursor: ${props => props.loading ? "default" : "pointer"};
    opacity: ${props => props.loading ? 0.4 : 1};

    font-size: 20px;
    color: var(--divcolor);
    text-align: center;
`;

export const LinkButton = styled.div`
    margin-top: 32px;

    cursor: pointer;

    font-size: 16px;
    color: var(--maincolor);
    text-decoration: underline;
`;

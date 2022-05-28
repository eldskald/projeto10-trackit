import React from "react";
import styled from "styled-components";
import { ThreeDots } from "react-loader-spinner";

export const TextInput = styled.input`
    width: 300px;
    height: 42px;
    margin: 4px 0px;

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

export function Button ({ text, loading }) {
    return (
        <ButtonStyle loading={loading} disabled={loading}>
            {loading ? (
                <ThreeDots color="var(--divcolor)" width="80px" />
            ) : (
                text
            )}
        </ButtonStyle>
    );
}

const ButtonStyle = styled.button`
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

export function LongButton ({ text, loading }) {
    return (
        <LongButtonStyle loading={loading} disabled={loading}>
            {loading ? (
                <ThreeDots color="var(--divcolor)" />
            ) : (
                text
            )}
        </LongButtonStyle>
    );
}

const LongButtonStyle = styled.button`
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

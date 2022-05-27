import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";
import { ThreeDots } from "react-loader-spinner";

import logo from "../assets/logo.png";

export default function Home () {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState("");
    const [message, setMessage] = useState("");

    function signIn () {
        if (loading) {
            return;
        }

        setLoading("loading");
        const data = {
            email: email,
            password: password
        }
        axios.post("https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/auth/login", data)
            .then(response => {
                console.log(response.data);
                setLoading("");
            })
            .catch(error => {
                console.log(error.response);
                setMessage(error.response.data.message);
                setLoading("");
            });
    }

    return (
        <Container>
            <Spacer length="10%" />
            <img src={logo} alt="TrackIt Logo" />
            <Spacer length="4%" />
            <Input
                type="email"
                placeholder="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                disabled={loading}
                loading={loading}
            />
            <Input
                type="password"
                placeholder="senha"
                value={password}
                onChange={e => setPassword(e.target.value)}
                disabled={loading}
                loading={loading}
            />
            <Button loading={loading} onClick={() => signIn()}>
                {loading ? <ThreeDots color="var(--divcolor)" /> : "Entra"}
            </Button>
            {message ? <ErrorMessage>{message}</ErrorMessage> : <></>}
            <LinkButton>
                Não tem uma conta? Cadastre-se!
            </LinkButton>
        </Container>
    );
}

const Container = styled.div`
    width: 100%;
    height: 100%;

    display: flex;
    flex-direction: column;
    align-items: center;

    background-color: var(--divcolor);
`;

const Spacer = styled.div`
    height: ${props => props.length};
`;

const Input = styled.input`
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

const Button = styled.button`
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

const ErrorMessage = styled.div`
    margin: 4px;

    font-size: 16px;
    color: var(--errorcolor);
`;

const LinkButton = styled.div`
    margin-top: 32px;

    cursor: pointer;

    font-size: 16px;
    color: var(--maincolor);
    text-decoration: underline;
`;

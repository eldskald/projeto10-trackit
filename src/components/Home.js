import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";
import { ThreeDots } from "react-loader-spinner";

import logo from "../assets/logo.png";

import UserContext from "../shared/UserContext";
import { TextInput, LongButton, LinkButton } from "../shared/InputTypes";
import ErrorMessage from "../shared/ErrorMessage";

export default function Home () {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [loading, setLoading] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const navigate = useNavigate();
    const { setUser } = useContext(UserContext);

    function signIn (event) {
        event.preventDefault();

        setLoading("loading");
        const data = {
            email: email,
            password: password
        };
        axios.post("https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/auth/login", data)
            .then(response => {
                setUser({...response.data});
                setErrorMessage("Foi!");
                setLoading("");
            })
            .catch(error => {
                setErrorMessage(error.response.data.message);
                setLoading("");
            });
    }

    return (
        <Container>
            <Spacer length="10%" />
            <img src={logo} alt="TrackIt Logo" />
            <Spacer length="4%" />
            <Form onSubmit={signIn}>
                <TextInput
                    type="email"
                    placeholder="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    disabled={loading}
                    loading={loading}
                />
                <TextInput
                    type="password"
                    placeholder="senha"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    disabled={loading}
                    loading={loading}
                />
                <LongButton loading={loading} disabled={loading} type="submit">
                    {loading ? <ThreeDots color="var(--divcolor)" /> : "Entra"}
                </LongButton>
            </Form>
            <ErrorMessage error={errorMessage} />
            <LinkButton onClick={() => {navigate("/cadastro")}}>
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

const Form = styled.form`
    display: flex;
    flex-direction: column;
    align-items: center;
`;

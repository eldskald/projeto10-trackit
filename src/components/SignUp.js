import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";

import logo from "../assets/logo.png";

import { TextInput, LongButton, LinkButton } from "../shared/InputTypes";
import ErrorMessage from "../shared/ErrorMessage";

export default function SignUp () {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [pictureURL, setPictureURL] = useState("");

    const [submitting, setSubmitting] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const navigate = useNavigate();

    function handleSubmit (event) {
        event.preventDefault();

        setSubmitting("loading");
        const data = {
            email: email,
            name: name,
            image: pictureURL,
            password: password
        };
        axios.post("https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/auth/sign-up", data)
            .then(() => {navigate("/")})
            .catch(error => {
                setErrorMessage(error.response.data.message);
                setSubmitting("");
            });
    }

    return (
        <Container>
            <Spacer length="10%" />
            <img src={logo} alt="TrackIt Logo" />
            <Spacer length="4%" />
            <Form onSubmit={handleSubmit}>
                <TextInput
                    type="email"
                    placeholder="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    disabled={submitting}
                    loading={submitting}
                />
                <TextInput
                    type="password"
                    placeholder="senha"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    disabled={submitting}
                    loading={submitting}
                />
                <TextInput
                    type="text"
                    placeholder="nome"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    disabled={submitting}
                    loading={submitting}
                />
                <TextInput
                    type="url"
                    placeholder="foto"
                    value={pictureURL}
                    onChange={e => setPictureURL(e.target.value)}
                    disabled={submitting}
                    loading={submitting}
                />
                <LongButton text="Cadastrar" loading={submitting} type="submit" />
            </Form>
            <ErrorMessage error={errorMessage} />
            <LinkButton onClick={() => navigate("/")}>
                Já tem uma conta? Faça login!
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

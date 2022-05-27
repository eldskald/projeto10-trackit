import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";
import { ThreeDots, TailSpin } from "react-loader-spinner";

import logo from "../assets/logo.png";

import UserContext from "../shared/UserContext";
import { TextInput, LongButton, LinkButton } from "../shared/InputTypes";
import ErrorMessage from "../shared/ErrorMessage";

export default function Home () {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [loadingStorage, setLoadingStorage] = useState("");
    const [submitting, setSubmitting] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const navigate = useNavigate();
    const { setUser } = useContext(UserContext);

    function handleSubmit (event) {
        event.preventDefault();

        const data = {
            email: email,
            password: password
        };
        setSubmitting("submitting");
        axios.post("https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/auth/login", data)
            .then(response => {
                localStorage.setItem("user", JSON.stringify(data));
                setUser({...response.data});
                navigate("/habitos");
            })
            .catch(error => {
                setErrorMessage(error.response.data.message);
                setSubmitting("");
            });
    }

    useEffect(() => {
        const storageData = localStorage.getItem("user");
        if (storageData) {
            setLoadingStorage("loading")
            const data = JSON.parse(storageData);
            axios.post("https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/auth/login", data)
                .then(response => {
                    setUser({...response.data});
                    navigate("/habitos");
                })
                .catch(() => {
                    storageData.clear();
                    setLoadingStorage("");
                });
        }
    }, [])

    return (
        <Container>
            {loadingStorage ? (
                <SpinnerContainer>
                    <TailSpin color="var(--maincolor)" height="200" width="200" />
                </SpinnerContainer>
            ) : (
                <>
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
                        <LongButton loading={submitting} disabled={submitting} type="submit">
                            {submitting ? <ThreeDots color="var(--divcolor)" /> : "Entra"}
                        </LongButton>
                    </Form>
                    <ErrorMessage error={errorMessage} />
                    <LinkButton onClick={() => {navigate("/cadastro")}}>
                        Não tem uma conta? Cadastre-se!
                    </LinkButton>
                </>    
            )}
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

const SpinnerContainer = styled.div`
    width: 100%;
    height: 100%;

    display: flex;
    justify-content: center;
    align-items: center;

    background-color: var(--divcolor);
`;

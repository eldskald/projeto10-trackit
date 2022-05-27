import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import UserContext from "../shared/UserContext";

export default function Header () {

    const [menu, setMenu] = useState("");

    const navigate = useNavigate();
    const { user } = useContext(UserContext);

    function toggleMenu () {
        setMenu(menu ? "" : "menu");
    }

    function logout () {
        localStorage.clear();
        navigate("/");
    }

    return (
        <Container>
            <h1>TrackIt</h1>
            <img src={user.image} alt="Foto do usuário" onClick={toggleMenu} />
            {menu ? (
                <DropdownMenu onMouseLeave={toggleMenu}>
                    <p onClick={logout}>Sair</p>
                </DropdownMenu>
            ) : (
                <></>
            )}
        </Container>
    );
}

const Container = styled.div`
    position: absolute;
    top: 0px;
    left: 0px;
    width: 100%;
    height: 72px;
    z-index: 1;

    padding: 0px 16px;
    display: flex;
    justify-content: space-between;
    align-items: center;

    background-color: var(--sec1color);
    box-shadow: 0px 4px 4px #a2a2a2;

    h1 {
        font-family: var(--displayfont);
        font-size: 50px;
        color: var(--divcolor);
    }

    img {
        width: 52px;
        height: 52px;

        border: 1px solid transparent;
        border-radius: 50%;
        object-fit: cover;
        cursor: pointer;
    }
`;

const DropdownMenu = styled.div`
    position: absolute;
    top: 28px;
    right: 28px;
    width: 96px;
    height: 32px;
    z-index: 2;

    padding: 8px 12px;

    background-color: var(--divcolor);
    border: 1px solid transparent;
    border-radius: 4px;

    p {
        font-family: var(--scriptfont);
        font-size: 16px;
        color: var(--scriptcolor);
        cursor: pointer;

        :hover {
            color: var(--maincolor);
        }
    }
`;

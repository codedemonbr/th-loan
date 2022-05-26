import { Link } from "react-router-dom";
import styled from "styled-components";

export const Container = styled.nav`
    background: var(--blue);

    padding: 2rem 8rem;
`;

export const Navigate = styled(Link)`
    font-size: 1rem;
    color: #fff;
    background: var(--blue-light);
    border: 0;
    padding: 1rem 2rem;
    margin: 1rem;
    border-radius: 0.25rem;
    height: 3rem;
    text-decoration: none;

    transition: 0.2s;

    &:hover {
        filter: brightness(0.9);
    }
`;

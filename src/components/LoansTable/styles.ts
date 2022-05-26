import { Link } from "react-router-dom";
import styled from "styled-components";

export const Container = styled.div`
    margin-top: 0.1rem;

    table {
        width: 100%;
        border-spacing: 0 0.5rem;

        th {
            color: var(--text-body);
            font-weight: 400;
            padding: 1rem 2rem;
            text-align: left;
            line-height: 1.5rem;
        }

        td {
            padding: 1rem 2rem;
            border: 0;
            background: var(--shape);
            color: var(--text-body);
            border-radius: 0.25rem;

            &:first-child {
                color: var(--text-title);
            }

            &.deposit {
                color: var(--green);
            }

            &.withdraw {
                color: var(--red);
            }
        }
    }
`;

export const Navigate = styled(Link)`
    font-size: 1rem;
    color: #fff;
    background: var(--green);
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

export const UnsuccessContainer = styled.div`
    align-items: center;
    text-align: center;
    color: #777;
`;

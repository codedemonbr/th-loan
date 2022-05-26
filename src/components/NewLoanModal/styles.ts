import { darken, transparentize } from "polished";
import styled from "styled-components";

export const Container = styled.form`
    h2 {
        color: var(--text-title);
        font-size: 1.5rem;
        margin-top: 2rem;
        margin-bottom: 2rem;
    }

    input {
        width: 100%;
        padding: 0 1.5rem;
        height: 4rem;
        border-radius: 0.25rem;

        border: 1px solid #d7d7d7;
        background: #e7e9ee;

        font-weight: 400;
        font-size: 1rem;

        &::placeholder {
            color: var(--text-body);
        }

        & + input {
            margin-top: 1rem;
        }
    }

    button[type="submit"] {
        width: 100%;
        padding: 0 1.5rem;
        height: 4rem;
        background: var(--green);
        color: #fff;
        border-radius: 0.25rem;
        border: 0;
        font-size: 1rem;
        margin-top: 1.5rem;
        font-weight: 600;

        transition: filter 0.2s;

        &:hover {
            filter: brightness(0.9);
        }
    }
`;

export const LabelContainer = styled.div`
    h3 {
        color: var(--text-title);
        font-size: 1.2rem;
        margin-top: 2rem;
        margin-bottom: 1rem;
    }
`;

export const LoanSelectorContainer = styled.div`
    overflow: auto;
    max-height: 500px;
`;

export const LoanSelector = styled.button`
    height: 4rem;
    width: 100%;
    border: 1px solid #d7d7d7;
    border-radius: 0.25rem;
    margin: 0.5rem 0;

    background: transparentize(0.1, "#5429CC");

    &:hover {
        border-color: ${darken(0.1, "#d7d7d7")};
    }

    span {
        display: inline-block;
        margin-left: 1rem;
        font-size: 1rem;
        color: var(--text-title);
    }
`;

export const BestDateContainer = styled.div`
    margin: 1rem 0;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
    gap: 0.5rem;
`;

interface RadioBoxProps {
    isActive: boolean;
}

export const RadioBox = styled.button<RadioBoxProps>`
    height: 4rem;
    width: 4rem;
    border-radius: 2rem;

    background: ${({ isActive }) =>
        isActive ? transparentize(0.1, "#5429CC") : "transparent"};
`;

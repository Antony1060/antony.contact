import styled from "styled-components"

export const JsonFormat = styled.div`
    display: flex;
    flex-direction: column;
    font-size: 1.4rem;
    color: white;
    transition: 200ms linear;

    & * {
        font-family: monospace;
    }

    @media (max-width: 900px) {
        font-size: 1rem;
        transition: 200ms linear;
    }

`

export const JsonContent = styled.div`
    margin-left: 2rem;
    display: flex;
    flex-direction: column;
    color: white;
    word-wrap: break-word;
`
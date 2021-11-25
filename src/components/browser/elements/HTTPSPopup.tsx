import styled from "styled-components";

const HTTPSPopup = styled.div<{ $active: boolean }>`
    position: absolute;
    cursor: auto;
    top: 2rem;
    left: 0;
    width: 300px;
    height: fit-content;
    background-color: #423f3f;
    padding: 1rem;
    display: ${p => p.$active ? 'flex' : 'none'};
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    gap: 0.4rem;
    font-size: 1rem;
    z-index: 4;

    span {
        padding: 0 0.4rem;
    }

    span:first-child {
        font-size: 1.1rem;
        color: rgba(103, 185, 137, 0.8);
    }
`

export default HTTPSPopup;
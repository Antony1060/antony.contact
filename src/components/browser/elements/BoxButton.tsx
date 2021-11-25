import styled from "styled-components";

const BoxButton = styled.button`
    width: 2rem;
    height: 2rem;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #292727;
    cursor: pointer;
    border: none;
    font-size: 1rem;

    &[disabled] svg {
        opacity: 0.6;
        transform: rotateZ(360deg);
        transition: transform 200ms linear;
    }

    @media print {
        display: none;
    }
`

export default BoxButton;
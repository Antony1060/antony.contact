import { faLock, faRedo, faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components";

const BrowserContainer = styled.div`
    width: 100%;
    background-color: #3a3838;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: stretch;
`

const SearchContainer = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-around;
    align-items: center;
    padding: 6px;
    gap: 6px;
`

const BoxButton = styled.div`
    width: 2rem;
    height: 2rem;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #292727;
    cursor: pointer;
`

const BarContainer = styled.div`
    flex-grow: 1;
    height: 2rem;
    background-color: #292727;
    display: flex;
    justify-content: flex-start;
    align-items: center;
`

const UrlBadge = styled.div`
    width: 2rem;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
`

const Url = styled.div`
    flex-grow: 1;
    span:first-child {
        color: rgb(255, 255, 255, 0.6)
    }
`

const BrowserEmulator = () => {
    return (
        <BrowserContainer>
            <SearchContainer>
                <BoxButton>
                    <FontAwesomeIcon icon={faRedo} size="sm" style={{ color: "rgba(255, 255, 255, 0.8)" }} />
                </BoxButton>
                <BarContainer>
                    <UrlBadge>
                        <FontAwesomeIcon icon={faLock} size="sm" style={{ color: "rgba(103, 185, 137, 0.8)" }} />
                    </UrlBadge>
                    <Url>
                        <span>https://</span>
                        <span>antony.contact</span>
                    </Url>
                    <UrlBadge>
                        <FontAwesomeIcon icon={faStar} />
                    </UrlBadge>
                </BarContainer>
            </SearchContainer>
        </BrowserContainer>
    )
}

export default BrowserEmulator;
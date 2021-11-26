import { faLock, faRedo, faStar as solidStar } from "@fortawesome/free-solid-svg-icons"
import { faStar as regularStar } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import styled from "styled-components"
import BoxButton from "./BoxButton"
import Divider from "./Divider"
import HTTPSPopup from "./HTTPSPopup"
import UrlBadge from "./UrlBadge"
import pgpKey from "url:/assets/antony.asc"
import sshKey from "url:/assets/antony.pub"
import { ContactInfo } from "../../../types/ContactInfo"
import { FC, useEffect, useState } from "react"

const SearchContainer = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-around;
    align-items: center;
    gap: 6px;
`

const BarContainer = styled.div`
    flex-grow: 1;
    height: 2rem;
    background-color: #292727;
    display: flex;
    justify-content: flex-start;
    align-items: center;

    @media print {
        display: none;
    }
`

const Url = styled.div`
    flex-grow: 1;
    span:first-child {
        color: rgb(255, 255, 255, 0.6)
    }
`

const PublicKey = styled.a`
    color: rgba(255, 255, 255, 0.8);
    margin-left: 1rem;
    cursor: pointer;
    text-decoration: none;

    &:hover {
        color: rgba(255, 255, 255, 0.9);
        text-decoration: underline;
    }
`

type SearchBarProps = {
    contact: ContactInfo | null,
    onRefresh: () => void
}

const SearchBar: FC<SearchBarProps> = ({ contact, onRefresh }: SearchBarProps) => {
    const [ httpsPopupActive, setHttpsPopupActive ] = useState(false);
    const [ favorite, setFavorite ] = useState(true);
    
    useEffect(() => {
        const closePopup = () => setHttpsPopupActive(false);

        document.body.addEventListener("click", closePopup)
        return () => {
            document.body.removeEventListener("click", closePopup);
        }
    }, [])

    useEffect(() => {
        const pageFavorited = localStorage.getItem("pageFavorited");
        setFavorite(!pageFavorited ? true : pageFavorited === "true"); // default to true
    }, []);


    useEffect(() => {
        localStorage.setItem("pageFavorited", `${favorite}`)
    }, [favorite])

    return (
        <SearchContainer>
            <BoxButton disabled={!contact} onClick={onRefresh}>
                <FontAwesomeIcon icon={faRedo} size="sm" style={{ color: "rgba(255, 255, 255, 0.8)" }} />
            </BoxButton>
            <BarContainer>
                <UrlBadge onClick={(e) =>{
                    e.stopPropagation();
                    setHttpsPopupActive(a => !a)
                }}>
                    <FontAwesomeIcon icon={faLock} size="sm" style={{ color: "rgba(103, 185, 137, 0.8)" }} />
                    <HTTPSPopup $active={httpsPopupActive} onClick={(e) => e.stopPropagation()}>
                        <span>Connection is secure</span>
                        <Divider />
                        <span>PGP Key:</span>
                        <PublicKey href={pgpKey}>
                            6610 E043 1CCB 318A 5DCC <br />
                            38C2 0A44 433B DEEB 62D8
                        </PublicKey>

                        <span>SSH Key:</span>
                        <PublicKey href={sshKey}>
                            SHA256: <br />
                            CdyFKxQHvYw0y/l5uq4FFU <br />
                            ipIPDLdKzGy/PV6Jv99sM
                        </PublicKey>
                    </HTTPSPopup>
                </UrlBadge>
                <Url>
                    <span>https://</span>
                    <span>antony.contact</span>
                </Url>
                <UrlBadge>
                    <FontAwesomeIcon icon={favorite ? solidStar : regularStar} onClick={() => setFavorite(f => !f)}/>
                </UrlBadge>
            </BarContainer>
        </SearchContainer>
    )
}

export default SearchBar;
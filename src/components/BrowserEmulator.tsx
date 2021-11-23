import { faLock, faRedo, faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { useEffect, useState } from "react";
import styled from "styled-components";

type ContactInfo = {
    discord: string,
    mail: string,
    twitter: string,
    github: string,
    linkedIn: string
}


const BrowserContainer = styled.div`
    width: 100%;
    background-color: #3a3838;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: stretch;
    padding: 6px;
    gap: 6px;
`

const SearchContainer = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-around;
    align-items: center;
    gap: 6px;
`

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

const BrowserContentContainer = styled.div`
    background-color: #292727;
    min-height: 400px;
    padding: 1rem;
`

const JsonFormat = styled.div`
    display: flex;
    flex-direction: column;
    font-size: 1.6rem;
    color: white;

    & * {
        font-family: monospace;
    }

    @media (max-width: 900px) {
        font-size: 1rem;
    }
`

const JsonContent = styled.div`
    margin-left: 2rem;
    display: flex;
    flex-direction: column;
    color: white;
    word-wrap: break-word;
`

const ContactLineContainer = styled.div`
    span:first-child {
        color: #93d0f0;
    }
`

const ContactLineLink = styled.a`
    text-decoration: none;
    color: #cb8f76;

    &:hover {
        text-decoration: underline;
    }
`

const ContactLine = ({ data, value, href }: { data: string, value: string, href: string }) => {
    return (
        <ContactLineContainer>
            <span>"{ data }"</span>
            <span>: </span>
            <ContactLineLink href={data === "mail" ? `mailto:${href}` : href.startsWith("http") ? href : "#"} target="_blank">"{ value }"</ContactLineLink>
        </ContactLineContainer>
    )
}

const BrowserEmulator = () => {
    const [ contact, setContact ] = useState<ContactInfo | null>(null);

    const fetchContacts = () => {
        setContact(null);
        axios.get("https://antony.contact", {
            headers: {
                "Accept": "application/json",
            }
        }).then(({ data }: { data: ContactInfo }) => setContact(data))
    }

    useEffect(() => {
        fetchContacts();
    }, []);

    return (
        <BrowserContainer>
            <SearchContainer>
                <BoxButton disabled={!contact} onClick={fetchContacts}>
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
            <BrowserContentContainer>
                {contact &&
                    <JsonFormat>
                        <span>&#123;</span>
                        <JsonContent>
                            {Object.entries(contact)
                                .filter(([ k ]) => k !== "status")
                                .map(([ k, v ]) => <ContactLine key={k} data={k} value={v} href={v} />)}
                        </JsonContent>
                        <span>&#125;</span>
                    </JsonFormat>
                }
            </BrowserContentContainer>
        </BrowserContainer>
    )
}

export default BrowserEmulator;
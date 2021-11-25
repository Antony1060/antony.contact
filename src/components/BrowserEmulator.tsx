import { faLock, faRedo, faStar as solidStar } from "@fortawesome/free-solid-svg-icons";
import { faStar as regularStar } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { useEffect, useState } from "react";
import styled from "styled-components";
import pgpKey from "url:/assets/antony.asc"
import sshKey from "url:/assets/antony.pub"

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

    @media print {
        display: none;
    }
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

const UrlBadge = styled.div`
    position: relative;
    width: 2rem;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    user-select: none;
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
    transition: 200ms linear;

    @media (max-width: 900px) {
        min-height: 360px;
        transition: 200ms linear;
    }
`

const JsonFormat = styled.div`
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

    span:nth-child(3) {
        color: #cb8f76;
    }
`

const ContactLineLink = styled.a`
    text-decoration: none;
    color: #cb8f76;

    &:hover {
        text-decoration: underline;
    }
`

const ContactLine = ({ keyName, value, href }: { keyName: string, value: string, href: string }) => {
    const overwriteHref: { [k: string]: string } = {
        mail: `mailto:${href}`,
        discord: "https://discord.gg/tgHWHWtNeD"
    }

    return (
        <ContactLineContainer>
            <span>&quot;{ keyName }&quot;</span>
            <span>&#58; </span>
            <span>
                &quot;
                <ContactLineLink href={overwriteHref[keyName] ?? (href.startsWith("http") ? href : "#")} target="_blank">{ value }</ContactLineLink>
                &quot;
            </span>
        </ContactLineContainer>
    )
}

const LandspaceWarning = styled.div`
    display: none;

    @media(max-width: 640px) {
        display: unset;
    }
`

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

    span {
        padding: 0 0.4rem;
    }

    span:first-child {
        font-size: 1.1rem;
        color: rgba(103, 185, 137, 0.8);
    }
`

const DividerContainer = styled.div`
    display: flex;
    width: 100%;
    justify-content: stretch;
    align-items: center;
`

const DividerLine = styled.div`
    height: 1px;
    background-color: #575454;
    flex-grow: 1;
`

const Divider = () => {
    return <DividerContainer><DividerLine /></DividerContainer>
}

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

const BrowserEmulator = () => {
    const [ contact, setContact ] = useState<ContactInfo | null>(null);
    const [ favorite, setFavorite ] = useState(true);
    const [ httpsPopupActive, setHttpsPopupActive ] = useState(false);

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
        const pageFavorited = localStorage.getItem("pageFavorited");
        setFavorite(!pageFavorited ? true : pageFavorited === "true"); // default to true
    }, []);

    useEffect(() => {
        const closePopup = () => setHttpsPopupActive(false);

        document.body.addEventListener("click", closePopup)
        return () => {
            document.body.removeEventListener("click", closePopup);
        }
    }, [])

    useEffect(() => {
        localStorage.setItem("pageFavorited", `${favorite}`)
    }, [favorite])

    return (
        <BrowserContainer>
            <SearchContainer>
                <BoxButton disabled={!contact} onClick={fetchContacts}>
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
            <BrowserContentContainer>
                {contact &&
                    <JsonFormat>
                        <span>&#123;</span>
                        <JsonContent>
                            {Object.entries(contact)
                                .filter(([ k ]) => k !== "status")
                                .map(([ k, v ]) => <ContactLine key={k} keyName={k} value={v} href={v} />)}
                        </JsonContent>
                        <span>&#125;</span>
                    </JsonFormat>
                }
            </BrowserContentContainer>
            <LandspaceWarning style={{ color: "#de5959" }}>Switch to landscape mode for a better view</LandspaceWarning>
        </BrowserContainer>
    )
}

export default BrowserEmulator;
import axios from "axios";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { ContactInfo } from "../../types/ContactInfo";
import ContactLine from "./elements/ContactLine";
import { JsonContent, JsonFormat } from "./elements/JsonFormat";
import SearchBar from "./elements/SearchBar";

const BrowserContainer = styled.div`
    width: 100%;
    background-color: #282C32;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: stretch;
    padding: 6px;
    gap: 6px;
`

const BrowserContentContainer = styled.div`
    background-color: #171b20;
    min-height: 400px;
    padding: 1rem;
    transition: 200ms linear;

    @media (max-width: 900px) {
        min-height: 360px;
        transition: 200ms linear;
    }
`

const LandspaceWarning = styled.div`
    display: none;

    @media(max-width: 640px) {
        display: unset;
    }
`

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

    useEffect(() => fetchContacts(), []);

    return (
        <BrowserContainer>
            <SearchBar contact={contact} onRefresh={fetchContacts} />
            <BrowserContentContainer>
                {contact &&
                    <JsonFormat>
                        <span>&#123;</span>
                        <JsonContent>
                            {Object.entries(contact)
                                .filter(([ k ]) => k !== "status" && !k.startsWith("_"))
                                .map(([ k, v ]) => <ContactLine key={k} keyName={k as keyof ContactInfo} value={v as string} href={v as string} _metadata={contact._metadata} />)}
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
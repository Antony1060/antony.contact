import { FC } from "react"
import styled from "styled-components"
import { ContactInfo } from "../../../types/ContactInfo.type"

const ContactLineContainer = styled.div`
    span:first-child {
        color: #93d0f0;
    }

    span:nth-child(3) {
        color: #cb8f76;
    }
`

const ContactLineLink = styled.a`
    position: relative;
    text-decoration: none;
    color: #cb8f76;

    &:hover {
        text-decoration: underline;
    }

    @media (min-width: 900px) {
        &:hover div {
            display: flex;
        }
    }
`

type ContactLineDetailsProps = {
    imageUrl?: string,
    title: string,
    description: string
}

const ContactLineDetailsContainer = styled.div`
    position: absolute;
    left: 0;
    top: 1.6rem;
    display: none;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    padding: 1rem;
    background-color: #423f3f;
    color: white;
    z-index: 2;
    cursor: default;
    gap: 0.2rem;
    width: 360px;
    font-size: 1rem;

    &:hover {
        display: none !important;
    }

    span:first-child {
        font-size: 1.2rem;
        color: #93d0f0;
        text-decoration: none;

        &:hover {
            text-decoration: underline;
            cursor: pointer;
        }
    }
`

const ContactLineDetails: FC<ContactLineDetailsProps> = ({ title, description }) => {
    // if we're not in development, don't show this element
    // this is not yet ready for the public since the data is hard-coded
    if(process.env.COMMIT_REF) return (<div></div>)

    return (
        <ContactLineDetailsContainer>
            <span>{title}</span>
            <span>{description}</span>
        </ContactLineDetailsContainer>
    )
}

const ContactLine = ({ keyName, value, href }: { keyName: keyof ContactInfo, value: string, href: string }) => {
    const overwriteHref: { [k in keyof ContactInfo]?: string } = {
        mail: `mailto:${href}`,
        discord: "https://discord.gg/tgHWHWtNeD"
    }

    const linkDetails: { [key in keyof ContactInfo]?: ContactLineDetailsProps } = {
        linkedIn: {
            title: "LinkedIn",
            description: "12 connection"
        },
        twitter: {
            imageUrl: "https://pbs.twimg.com/profile_images/1462878256613494788/_PpROI0E_400x400.jpg",
            title: "Twitter",
            description: "20 followers"
        },
        github: {
            imageUrl: "https://avatars.githubusercontent.com/u/38852274",
            title: "GitHub",
            description: "577 contributions in the last year"
        },
        discord: {
            imageUrl: "https://cdn.discordapp.com/avatars/136724729011634176/d53dd32949d8aa1eaae32dbb2f4f5f07.webp",
            title: "Discord",
            description: "Life is a stack"
        }
    }

    return (
        <ContactLineContainer>
            <span>&quot;{ keyName }&quot;</span>
            <span>&#58; </span>
            <span>
                &quot;
                <ContactLineLink href={overwriteHref[keyName] ?? (href.startsWith("http") ? href : "#")} target="_blank">
                    { value }
                    {linkDetails[keyName] && <ContactLineDetails {...linkDetails[keyName]!} />}
                </ContactLineLink>
                &quot;
            </span>
        </ContactLineContainer>
    )
}

export default ContactLine;
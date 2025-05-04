import { FC } from "react"
import styled from "styled-components"
import { ContactInfo, ContactInfoMetadata } from "../../../types/ContactInfo"

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
    title: string,
    descriptionImage?: string,
    description: string
}

const ContactLineDetailsContainer = styled.div`
    position: absolute;
    left: 0;
    top: calc(100% - 2px);
    display: none;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    padding: 1rem;
    background-color: #2f343b;
    color: white;
    z-index: 2;
    cursor: default;
    gap: 0.2rem;
    min-width: 360px;
    font-size: 1rem;

    &:hover {
        display: none !important;
    }

    span {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        gap: 0.4rem;
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

const ContactLineDetails: FC<ContactLineDetailsProps> = ({ title, description, descriptionImage }) => {
    return (
        <ContactLineDetailsContainer>
            <span>{title}</span>
            <span>
                {descriptionImage && <img src={descriptionImage} style={{ width: "1.4rem" }} />}
                {description}
            </span>
        </ContactLineDetailsContainer>
    )
}

const ContactLine = ({ keyName, value, href, _metadata }: { keyName: keyof ContactInfo, value: string, href: string, _metadata: Partial<ContactInfoMetadata> }) => {
    const overwriteHref: { [k in keyof ContactInfo]?: string } = {
        mail: `mailto:${href}`,
        discord: "https://discord.gg/tgHWHWtNeD"
    }

    const linkDetails: { [key in keyof ContactInfo]?: ContactLineDetailsProps } = {
        linkedIn: _metadata.linkedIn ? {
            title: "LinkedIn",
            description: `${_metadata.linkedIn.title}`
        } : undefined,
        twitter: _metadata?.twitter?.followers ? {
            title: "Twitter",
            description: `${_metadata.twitter.followers} followers`
        } : undefined,
        github: _metadata?.github ? {
            title: "GitHub",
            description: `${_metadata.github.contributions} contributions in the last year`
        } : undefined,
        discord: _metadata?.discord ? {
            title: "Discord",
            descriptionImage: _metadata.discord.statusIcon,
            description: _metadata.discord.status
        } : undefined
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

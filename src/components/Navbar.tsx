import styled from "styled-components"
import logo from "url:/assets/logo.png"

const NavbarContainer = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 1rem;

    @media print {
        display: none;
    }
`

const NavbarContent = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    padding: 0 1rem;
    gap: 1rem;
`

const Logo = styled.div`
    font-size: 1.4rem;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 1.2rem;
`

const LogoImage = styled.img`
    width: 2rem;
`

const Links = styled.div`
    display: flex;
    justify-content: flex-start;
    align-items: center;
    gap: 2rem;
    flex-wrap: wrap;

    @media (max-width: 500px) {
        gap: 1rem;
    }
`

const LinkContainer = styled.a<{ $hideOnPortrait: boolean }>`
    text-decoration: none;
    color: gray;

    span:nth-child(2) {
        color: rgba(255, 255, 255, 0.8);    
    }

    &:hover {
        text-decoration: underline;
    }

    &:hover span:nth-child(2) {
        color: white;
    }

    ${p => p.$hideOnPortrait ? `
        @media (max-width: 550px) {
            display: none;
        }
    ` : ""}
`

const Divider = styled.div`
    width: 100%;
    height: 2px;
    background: linear-gradient(0.25turn, #0A0D13, #f0f0f0 10%, #f0f0f0 90%, #0A0D13);
`

const Link = ({ text, href, hideOnPortrait = false }: { text: string, href: string, hideOnPortrait?: boolean }) => {
    return (
        <LinkContainer href={href} $hideOnPortrait={hideOnPortrait}>
            <span>./</span>
            <span>{text}</span>
        </LinkContainer>
    )
}

const Navbar = () => {
    return (
        <NavbarContainer>
            <NavbarContent>
                <Logo>
                    <LogoImage src={logo} />
                    ~/contact
                </Logo>
                <Links>
                    <Link text="Resume" href="https://antony.wiki" />
                    <Link text="Blog" href="https://antony.cloud" />
                    <Link text="Contact" href="https://antony.contact" hideOnPortrait />
                </Links>
            </NavbarContent>
            <Divider />
        </NavbarContainer>
    )
}

export default Navbar;

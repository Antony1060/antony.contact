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
    gap: 2rem;
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
`

const LinkContainer = styled.a`
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
`

const Divider = styled.div`
    width: 100%;
    height: 2px;
    background: linear-gradient(0.25turn, #464646, #f0f0f0 10%, #f0f0f0 90%, #464646);
`

const Link = ({ text, href }: { text: string, href: string }) => {
    return (
        <LinkContainer href={href}>
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
                    <Link text="Home" href="https://antony.red" />
                    <Link text="Wiki" href="https://antony.wiki" />
                    <Link text="Contact" href="https://antony.contact" />
                    <Link text="Domains" href="https://antony.domains" />
                    <Link text="Donate" href="https://antony.cash" />
                </Links>
            </NavbarContent>
            <Divider />
        </NavbarContainer>
    )
}

export default Navbar;
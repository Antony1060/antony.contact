import styled from "styled-components"
import BrowserEmulator from "./browser/BrowserContainer"
import Navbar from "./Navbar"

const PageContainer = styled.div`
    display: flex;
    width: 100%;
    height: 100%;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
`

const ContentContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    width: 1000px;
    max-width: 100vw;
    gap: 2rem;
    padding: 2rem;
    text-align: start;
`

const Version = styled.a`
    text-decoration: none;
    color: rgba(255, 255, 255, 0.8);
    cursor: pointer;
    
    &:hover {
        color: white;
        text-decoration: underline;
    }

    @media print {
        display: none;
    }
`

const App = () => {
    return (
        <PageContainer>
            <ContentContainer>
                <Navbar />
                <BrowserEmulator />
                <Version href="https://github.com/Antony1060/antony.contact" target="_blank">Version {process.env.COMMIT_REF?.substring(0, 7) ?? 'development'}</Version>
            </ContentContainer>
        </PageContainer>
    )
}

export default App;

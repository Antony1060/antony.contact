import styled from "styled-components"
import BrowserEmulator from "./BrowserEmulator"

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
    padding: 4rem 2rem;
    text-align: center;
    text-align: start;
`

const App = () => {
    return (
        <PageContainer>
            <ContentContainer>
                <BrowserEmulator />
            </ContentContainer>
        </PageContainer>
    )
}

export default App;
import styled from "styled-components";
import { Outlet, Link } from "react-router-dom";
import { ThemeToggleButton } from "../components/ThemeToggleButton";

const Container = styled.div`
  max-width: 50rem;
  margin: 0 auto;
  padding: 0 2rem;
`;

const Header = styled.header`
  display: flex;
  height: 4rem;
  justify-content: center;
  align-items: center;
  margin: 3rem 0;
`;

const TitleLink = styled(Link)`
  color: ${(props) => props.theme.accentColor};
  font-size: 3rem;
  font-weight: 500;
`;

function Home() {
  return (
    <Container>
      <Header>
        <ThemeToggleButton />
        <TitleLink to="/crypto-tracker">Coins</TitleLink>
      </Header>
      <Outlet />
    </Container>
  );
}

export default Home;

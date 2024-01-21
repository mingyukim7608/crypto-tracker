import styled from "styled-components";

export const CoinContentBox = styled.div`
  background-color: ${(props) => props.theme.contentBoxColor};
  width: 100%;
  height: 5rem;
  border-radius: 2rem;
  margin: 2rem 0;
  font-size: 1.2rem;
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 0 2rem;
  & div {
    display: flex;
    flex-direction: column;
  }
  & div span {
    text-align: center;
  }
  & div span:nth-child(1) {
    color: ${(props) => props.theme.accentColor};
    margin-bottom: 1rem;
  }
`;

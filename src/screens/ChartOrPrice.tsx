import { styled } from "styled-components";

const Container = styled.div`
  width: 100%;
  text-align: center;
  color: ${(props) => props.theme.textColor};
  font-size: 1.5rem;
`;

export default function ChartOrPrice() {
  return (
    <Container>
      <span>Choose "Chart" or "Price" for more info.</span>
    </Container>
  );
}

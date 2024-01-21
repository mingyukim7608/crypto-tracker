import { styled } from "styled-components";
import { isDarkState } from "../recoilState";
import { useRecoilState } from "recoil";

export const StyledToggleButton = styled.button`
  background-color: ${(props) => props.theme.bgColor};
  color: ${(props) => props.theme.textColor};
  font-size: 1rem;
  border: ${(props) => props.theme.textColor} 1px solid;
  cursor: pointer;
  margin: 1rem 0 0 1rem;
  border-radius: 1rem;
`;

export const ThemeToggleButton = () => {
  const [isDark, setIsDark] = useRecoilState(isDarkState);
  const onToggle = () => {
    setIsDark(!isDark);
  };
  return (
    <StyledToggleButton onClick={onToggle}>
      {isDark ? "Dark Mode" : "Light Mode"}
    </StyledToggleButton>
  );
};

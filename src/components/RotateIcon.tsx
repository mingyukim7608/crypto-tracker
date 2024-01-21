import { TbRefresh } from "react-icons/tb";
import { styled, keyframes } from "styled-components";

const rotateKeyframes = keyframes`
    from {
        transform: rotate(0deg);
    }
    to {
        transform:  rotate(360deg);
    }
`;

const RotateIcon = styled(TbRefresh)<{ $refreshing?: boolean }>`
  animation: ${(props) => {
      return props.$refreshing ? rotateKeyframes : null;
    }}
    1s linear infinite;

  font-size: 1.5rem;
  cursor: pointer;
`;

export default RotateIcon;

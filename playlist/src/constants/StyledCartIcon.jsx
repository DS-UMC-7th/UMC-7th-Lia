import styled from "styled-components";
import { CartIcon as RawCartIcon } from "../constants/icons"; // 원본 CartIcon 가져오기

const StyledCartIcon = styled(RawCartIcon)`
  width: 24px; /* 크기 설정 */
  height: 24px;
  color: white; /* 기본 색상 */
  cursor: pointer;

  &:hover {
    color: #ff6b6b; /* 호버 시 색상 변경 */
    transform: scale(1.1); /* 약간 확대 */
    transition: transform 0.2s ease-in-out, color 0.2s ease-in-out;
  }
`;

export default StyledCartIcon;

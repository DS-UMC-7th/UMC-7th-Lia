import styled from "styled-components";

// 스타일 컴포넌트 정의
const FooterContainer = styled.footer`
  background-color: #2f3542;
  padding: 20px 0;
  text-align: center;
  color: white;
`;

const FooterText = styled.h3`
  font-size: 18px;
  font-weight: bold;
  color: #ffffff;
  margin: 0;
`;

const Footer = () => {
  return (
    <FooterContainer>
      <FooterText>University MakeUs Challenge</FooterText>
    </FooterContainer>
  );
};

export default Footer;

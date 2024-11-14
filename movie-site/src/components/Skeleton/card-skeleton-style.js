import styled, { keyframes } from "styled-components";

const skeleton=keyframes`
    0%{
    opacity:1;
    }
    30%{
    opacity:0.2;
    }
    50%{
    opacity:0.4;
    }
    80%{
    opacity:0.8;
    }
    100%{
    opacity:1;
    }
`

const Container = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
    gap: 10px; 
    justify-content: center; 
    padding: 20px;
`;

const CardMain=styled.div`
    width: 140px;
  height: 210px; 
  object-fit: cover;
  border-radius: 8px;
  overflow:hidden;
  background:rgb(230,230,230);
  animation : ${skeleton} 3s 1s infinte linear alternate;
`

const TextWrapper=styled.div`
 width: 140px;
  height: 30px; 
   display:flex;
    flex-direction:column;
    gap:2px;
    margin-top:5px;
`
const TitleBox=styled.div`
    background:rgb(230,230,230);
     height: 13px; 
     border-radius:5px;
     animation : ${skeleton} 3s 1s infinte linear alternate;
`

const DescriptionBox=styled.div`
  background:rgb(230,230,230);
   height: 10px; 
   border-radius:5px;
   animation : ${skeleton} 3s 1s infinte linear alternate;
`

export {Container,CardMain,TextWrapper,TitleBox,DescriptionBox,skeleton}
import styled from "styled-components";

export const Header = () => {
  return (
    <StyledHeader>
      <StyledH1Container>
        <StyledServiceName>Service Name</StyledServiceName>
      </StyledH1Container>
      <StyledRightContainer></StyledRightContainer>
    </StyledHeader>
  );
};

const StyledHeader = styled.header`
  height: auto;
  display: flex;
  background-color: rgba(255, 255, 255, 0.6);
  justify-content: space-between;
  align-items: center;
  /* 수직 수평 */
  padding: 0 10%;
`;

const StyledH1Container = styled.div`
  width: 60%;
  display: flex;
  margin-left: 30px;
  background-color: transparent;
  justify-content: left;
  align-items: center;
`;

const StyledServiceName = styled.h1`
  font-size: 25px;
  font-weight: 100;
  font-family: "Potta One", cursive;
  color: #0a6ebd;
`;

const StyledRightContainer = styled.div`
  width: 20%;
`;

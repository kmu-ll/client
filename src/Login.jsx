import { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(email);
    console.log(password);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  return (
    <RootContainer>
      <StyledH1>Login</StyledH1>
      <StyledForm onSubmit={handleSubmit}>
        <StyledBranchLabel htmlFor="email">email</StyledBranchLabel>
        <StyledInput
          placeholder="example@naver.com"
          value={email}
          onChange={handleEmailChange}
          type="email"
          name="email"
          id="email"
          required
        />
        <StyledBranchLabel htmlFor="password">password</StyledBranchLabel>
        <StyledInput
          placeholder="passwords"
          value={password}
          onChange={handlePasswordChange}
          type="password"
          name="password"
          id="password"
          required
        />
        <StyledButton type="submit" style={{ marginBottom: "7px" }}>
          Login
        </StyledButton>
        <Link to="/register" style={{ width: "100%" }}>
          <StyledRegisterButton type="submit">
            Register here
          </StyledRegisterButton>
        </Link>
      </StyledForm>
    </RootContainer>
  );
};

const RootContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: none;
  border: 2px solid #ffffff;
  border-radius: 10px;
  width: 70%;
  /* 수직 수평 */
  padding: 5rem 0;
`;

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: inherit;
`;

const StyledH1 = styled.h1`
  font-family: "Alfa Slab One", cursive;
  margin-bottom: 5rem;
`;

const StyledParentLabel = styled.label`
  text-align: center;
  margin-bottom: 7px;
  font-family: "Alfa Slab One", cursive;
  cursor: pointer;
`;
const StyledBranchLabel = styled(StyledParentLabel)`
  font-size: 18px;
`;
// const StyledMainLabel = styled(StyledParentLabel)`
//   font-size: 45px;
//   margin-bottom: 20px;
// `;

const StyledInput = styled.input`
  width: 100%;
  /* 수직 수평 */
  margin: 0.5rem 0;
  border: none;
  border-radius: 10px;
  font-family: "Alfa Slab One", cursive;
  font-size: 0.2rem;
  font-weight: lighter;
  padding: 0.8rem;
  cursor: pointer;

  :focus {
    outline: none;
  }
`;

const StyledButton = styled.button`
  font-family: "Alfa Slab One", cursive;
  /* text-decoration: underline; */
  background: #ffffff;
  border: none;
  border-radius: 10px;
  padding: 0.8rem;
  width: 100%;
  cursor: pointer;
`;

const StyledRegisterButton = styled(StyledButton)`
  background: none;
  text-decoration: underline;
`;

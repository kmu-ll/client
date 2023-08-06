import { useState } from "react";
// import GoogleLoginBtn from "./components/GoogleLoginBtn";
import { Button, Container, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import styled from "styled-components";

export const Login = () => {
  const errorMsg = {
    empty: "메일 주소를 입력해주세요",
    exist_email: "이미 등록된 메일입니다. 다른 메일을 입력해주세요",
  };

  const [validated, setValidated] = useState(false);
  const [user, setUser] = useState({ name: "", email: "", password: "" });
  const [isValid, setIsValid] = useState(false);
  const [errorMail, setErrorMail] = useState(errorMsg.empty);

  function handleName(e) {
    console.log(e.target.value);
    setUser({ ...user, name: e.target.value });
  }

  function handleEmail(e) {
    console.log(e.target.value);
    setIsValid(false);
    setErrorMail(errorMsg.empty);
    setUser({ ...user, email: e.target.value });
  }
  function handlePassword(e) {
    setUser({ ...user, password: e.target.value });
  }

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    // 제대로 정보 기입을 했는지 확인하는 if문
    if (form.checkValidity === false) {
      event.preventDefault();
      event.stopPropagation();
    } else {
      // 옳게 작성되었다면, isValid를 true로 설정
      setIsValid(true);
    }

    setValidated(true);
    event.preventDefault();
    event.stopPropagation();
  };

  return (
    <StyledContainer className={"text-center"} fluid>
      <Form
        noValidate
        validated={validated}
        className="form-signup"
        onSubmit={handleSubmit}
      >
        <h1
          className="h1 mb-3 text-uppercase fw-normal"
          style={{ fontFamily: "Alfa Slab One", letterSpacing: "3px" }}
        >
          sign in
        </h1>
        <Form.Group controlId={"formBasicName"}>
          <Form.Label
            className="sr-only"
            style={{ fontWeight: "bold", letterSpacing: "1.5px" }}
          >
            Name
          </Form.Label>
          <Form.Control
            className={"form-signup-input"}
            onChange={handleName}
            type={"text"}
            placeholder={"홍길동"}
            minLength={"3"}
            required
          />
          <Form.Control.Feedback type="invalid" className={"float-left"}>
            이름을 입력해주세요(3글자 이상입력)
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group controlId={"formBasicPassword"}>
          <Form.Label
            className="sr-only"
            style={{ fontWeight: "bold", letterSpacing: "1.5px" }}
          >
            Password
          </Form.Label>
          <Form.Control
            className={"form-signup-input"}
            onChange={handlePassword}
            type={"password"}
            placeholder={"비밀번호"}
            required
          />
          <Form.Control.Feedback type="invalid" className={"float-left"}>
            비밀번호를 입력해주세요
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group controlId={"formBasicEmail"}>
          <Form.Label
            className="sr-only"
            style={{ fontWeight: "bold", letterSpacing: "1.5px" }}
          >
            Email address
          </Form.Label>
          <Form.Control
            className={`form-signup-email ${isValid ? "is-invalid" : ""}`}
            onChange={handleEmail}
            type={"email"}
            placeholder={"example@naver.com"}
            required
          />
          <Form.Control.Feedback type="invalid" className={"float-left"}>
            {errorMail}
          </Form.Control.Feedback>
        </Form.Group>
        <div className="d-grid">
          <Button
            className="btn btn-lg btn-primary btn-block my-3"
            variant={"primary"}
            type={"submit"}
            style={{ fontWeight: "bold", letterSpacing: "1.5px" }}
          >
            Login
          </Button>
        </div>
        <StyledLink to="/register">
          <StyledRegisterBtn
            type="submit"
            style={{ fontWeight: "bold", letterSpacing: "1.5px" }}
          >
            Register here
          </StyledRegisterBtn>
        </StyledLink>
        {/* <p className={"float-left"}>
          <a href={"/signin"}>Sign in</a>
        </p> */}
      </Form>
    </StyledContainer>
  );
};

const StyledContainer = styled(Container)`
  width: 50%;
  height: 100vh;
  /* 수직 수평 */
  padding: 5rem 0;
`;

const StyledLink = styled(Link)`
  display: block;
`;

const StyledRegisterBtn = styled.button`
  background: none;
  text-decoration: underline;
  border: none;
`;

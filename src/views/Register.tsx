import { useState } from "react";
// import GoogleLoginBtn from "./components/GoogleLoginBtn";
import { Button, Container, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import styled from "styled-components";

export const Register = () => {
  const errorMsg = {
    empty: "메일 주소를 입력해주세요",
    exist_email: "이미 등록된 메일입니다. 다른 메일을 입력해주세요",
  };

  const [validated, setValidated] = useState(false);
  // user데이터 변수
  const [user, setUser] = useState({ name: "", email: "", password: "" });
  const [email, setEmail] = useState("");
  const [errorMail, setErrorMail] = useState(errorMsg.empty);

  function handleName(e: any) {
    console.log(e.target.value);
    setUser({ ...user, name: e.target.value });
  }

  function handleEmail(e: any) {
    console.log(e.target.value);
    setEmail(e.target.value);
    setErrorMail(errorMsg.empty);
    console.log(email);
  }

  function handlePassword(e: any) {
    setUser({ ...user, password: e.target.value });
  }

  // form validation 제출 함수
  const handleSubmit = (event: any) => {
    const form = event.currentTarget;
    // 제대로 정보 기입을 했는지 확인하는 if문 - 만약 잘 작성이 안 되어있다면,
    if (form.checkValidity === false) {
      event.preventDefault();
      event.stopPropagation();
    } else {
      // 옳게 작성되었다면, isValid를 true로 설정
      setValidated(true);
    }

    setValidated(true);
    event.preventDefault();
    event.stopPropagation();
  };

  return (
    <StyledDiv className="rootContainerDiv">
      <Container className={"text-center"} fluid>
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
            sign up
          </h1>
          <Form.Group controlId={"formBasicName"}>
            <Form.Label
              className="sr-only my-3"
              style={{ fontWeight: "bold", letterSpacing: "1.5px" }}
            >
              Name
            </Form.Label>
            <Form.Control
              className={"form-signup-input"}
              onChange={handleName}
              type={"text"}
              placeholder={"홍길동"}
              minLength={4}
              required
            />
            <Form.Control.Feedback type="invalid" className={"float-left"}>
              이름을 입력해주세요(3글자 이상입력)
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group controlId={"formBasicPassword"}>
            <Form.Label
              className="sr-only my-3"
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
              className="sr-only my-3"
              style={{ fontWeight: "bold", letterSpacing: "1.5px" }}
            >
              Email address
            </Form.Label>
            <Form.Control
              className={"form-signup-email"}
              onChange={handleEmail}
              type={"email"}
              placeholder={"example@naver.com"}
              required
            />
            <Form.Control.Feedback type="invalid" className={"float-left"}>
              {errorMail}
            </Form.Control.Feedback>
          </Form.Group>
          <div className="d-grid my-3">
            <Button
              className="btn btn-lg btn-primary btn-block my-3"
              variant={"primary"}
              type={"submit"}
              style={{ fontWeight: "bold", letterSpacing: "1.5px" }}
            >
              Register
            </Button>
          </div>
        </Form>
        <StyledLink to="/">
          <StyledLoginBtn
            type="submit"
            style={{ fontWeight: "bold", letterSpacing: "1.5px" }}
          >
            Login here
          </StyledLoginBtn>
        </StyledLink>
      </Container>
    </StyledDiv>
  );
};

const StyledDiv = styled.div`
  width: 60%;
  height: 100vh;
  padding: 5rem 0;
  display: flex;
  align-items: center;
`;

const StyledLink = styled(Link)`
  display: block;
`;

const StyledLoginBtn = styled.button`
  background: none;
  text-decoration: underline;
  border: none;
  /* 수직 수평 */
  margin: 1rem 0;
`;

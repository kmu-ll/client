import { useState } from "react";
// import GoogleLoginBtn from "./components/GoogleLoginBtn";
import { Button, Container, Form } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";

export const Login = () => {
  let navigate = useNavigate();

  const errorMsg = {
    empty: "메일 주소를 입력해주세요",
    // 이미 회원가입된 정보면 handleEamil에서 이 string으로 set
    exist_email: "이미 등록된 메일입니다. 다른 메일을 입력해주세요",
  };

  const [validated, setValidated] = useState(false);
  // 유저api 정보가 잘 넘어왔는지에 대한 여부 상태관리
  const [isValid, setIsValid] = useState(false);

  // user데이터 변수
  const [user, setUser] = useState({ email: "", password: "" });
  const [errorMail, setErrorMail] = useState(errorMsg.empty);

  function handleEmail(e: any) {
    // password 정보는 그냥 풀어서 넘기고, email은 입력된 데이터로 덮어씌우기
    setUser({ ...user, email: e.target.value });
    // 추후 변경
    setErrorMail(errorMsg.empty);
  }

  function handlePassword(e: any) {
    //email정보는 풀어서 그냥 넘기고, password는 들어온 데이터로 덮어쓰기
    setUser({ ...user, password: e.target.value });
  }

  // form validation 제출 함수
  const handleSubmit = (event: any) => {
    const form = event.currentTarget;

    // 정보 기입이 제대로 이뤄져 있다면,
    if (form.checkValidity()) {
      // submitForm
      console.log("성공");
      /////////////////////////////////////////////////////////////////////////////////
      // 만약 유저 정보가 넘어오면 화면 전환하는 방식 채택
      // 우선, 그냥 라우팅
      setIsValid(true);
      navigate("/main");
    } else {
      console.log("실패");
      event.preventDefault();
      event.stopPropagation();
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
            sign in
          </h1>
          <Form.Group controlId={"formBasicEmail"}>
            <Form.Label
              className="sr-only my-3"
              style={{ fontWeight: "bold", letterSpacing: "1.5px" }}
            >
              Email address
            </Form.Label>
            {/* 이메일 중복 체크 : is-valid -> is-invalid주입시 feedback 내용 보여줌*/}
            <Form.Control
              className={`form-signup-email ${isValid ? "is-invalid" : ""}`}
              onChange={handleEmail}
              type={"email"}
              placeholder={"example@naver.com"}
              required
            />
            <Form.Control.Feedback type="invalid" className={"float-left"}>
              {/* 2가지 종류의 errorMail : 처음 로그인, 이미 회원가입 한 유저 */}
              {errorMail}
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
          <div className="d-grid my-3">
            <Button
              className="btn btn-lg btn-primary btn-block my-3"
              variant={"primary"}
              type={"submit"}
              style={{ fontWeight: "bold", letterSpacing: "1.5px" }}
            >
              Login
            </Button>
          </div>
        </Form>
        <StyledLink to="/register">
          <StyledRegisterBtn
            type="submit"
            style={{ fontWeight: "bold", letterSpacing: "1.5px" }}
          >
            Register here
          </StyledRegisterBtn>
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

const StyledRegisterBtn = styled.button`
  background: none;
  text-decoration: underline;
  border: none;
  /* 수직 수평 */
  margin: 1rem 0;
`;

import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "bootstrap/dist/css/bootstrap.css";

// window객체 안의 naver의 타입을 any로 설정 : 오류가 안나게끔
declare global {
  interface Window {
    naver: any;
  }
}

const root = ReactDOM.createRoot(document.getElementById("root") as Element);
root.render(<App />);

import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Login } from "./views/Login";
import { Register } from "./views/Register";
import { Main } from "./views/Main";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route element={<Login />} path="/"></Route>
          <Route element={<Register />} path="/register"></Route>
          <Route element={<Main />} path="/main"></Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;

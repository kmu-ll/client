import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Login } from "./Login";
import { Register } from "./Register";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route element={<Login />} path="/"></Route>
          <Route element={<Register />} path="/register"></Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;

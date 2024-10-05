import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import PageLogin from "./pages/signin";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<>home</>} />
        <Route path="/login" element={<PageLogin />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

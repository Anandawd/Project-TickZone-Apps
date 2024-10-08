import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import CategoriesPage from "./pages/categories";
import DashboardPage from "./pages/dashboard";
import LoginPage from "./pages/login";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<DashboardPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/categories" element={<CategoriesPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

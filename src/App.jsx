import { useState } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import LoginPage from "./pages/LoginPage";
import DashboardPage from "./pages/DashboardPage";
import TeachersPage from "./pages/TeachersPage";
import StudentsaPage from "./pages/StudentsaPage";
import NotFoundPage from "./pages/NotFoundPage";
import { TOKEN } from "./constants/Token";
import AdminLayout from "./components/layout/AdminLayout";

function App() {
  const [isLogin, setIsLogin] = useState(
    localStorage.getItem(TOKEN) ? true : false
  );
  return (
    <BrowserRouter>
      <Routes>
        <Route path="" element={<Navigate to="/login" />} />

        <Route path="/login" element={<LoginPage setIsLogin={setIsLogin} />} />
        {isLogin ? (
          <Route path="/" element={<AdminLayout />}>
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/teachers" element={<TeachersPage />} />
            <Route path="/students" element={<StudentsaPage />} />
          </Route>
        ) : null}

        <Route path="/*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

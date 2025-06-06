import React from "react";
import { BrowserRouter, Routes, Route } from "react-router";
import RegisterPage from "./pages/auth/RegisterPage";
import GlobalProvider from "./context/GlobalContext";
import DashboardPage from "./pages/admin/DashboardPage";
import ProtectedRoutes from "../src/ProtectedRoutes";
import UserProfile from "./pages/users/UserProfile";
import LoginPage from "./pages/auth/LoginPage";
import { AuthProvider } from "./context/AuthContext";

function App() {
  return (
    <GlobalProvider>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route element={<ProtectedRoutes />}>
              <Route path="/dashboard" element={<DashboardPage />} />
              <Route path="/perfil" element={<UserProfile />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </GlobalProvider>
  );
}

export default App;

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router";
import "./App.css";
import { HomePage } from "./pages/home/page.tsx";
import { AuthenticationProvider } from "./context/Authentication.tsx";
import LoginPage from "./pages/auth/Login.tsx";
import Registration from "./pages/auth/Registration.tsx";
import { Navigation } from "./components/Navigation.tsx";
import ProtectedRoute from "./pages/common/ProtectedRoute.tsx";
import ForgotPasswordPage from "./pages/auth/ForgotPasswordPage.tsx";
import RecoverAccountPage from "./pages/auth/RecoverAccountPage.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <AuthenticationProvider>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<Registration />} />
          <Route path="/forgot_password" element={<ForgotPasswordPage />} />
          <Route path="/recover_account" element={<RecoverAccountPage />} />
          <Route path="/" element={<ProtectedRoute />}>
            <Route element={<Navigation />}>
              <Route index element={<HomePage />} />
              {/* <Route path="nested_route" element={<HomePage />} /> */}
            </Route>
          </Route>
        </Routes>
      </AuthenticationProvider>
    </BrowserRouter>
  </StrictMode>
);

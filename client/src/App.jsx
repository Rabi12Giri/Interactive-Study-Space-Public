import { Route, Routes } from 'react-router-dom';
import './App.css';
import { DashboardLayout } from './layouts';
import SignIn from './pages/auth/SignIn';
import SignUp from './pages/auth/SignUp';
import LandingPage from './pages/LandingPage';
import MyProfile from './pages/dashboard/MyProfile';
import ForgotPassword from './pages/auth/ForgotPassword';
import ChangePassword from './pages/auth/ChangePassword';
import ResetPasswordPage from './pages/ResetPasswordPage';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<SignIn />} />
      <Route path="/sign-up" element={<SignUp />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/change-password" element={<ChangePassword />} />
      <Route path="/reset-password" element={<ResetPasswordPage />} />
      <Route path="/dashboard" element={<DashboardLayout />}>
        <Route index element={<div>Dashboard</div>} />
        <Route path="my-profile" element={<MyProfile />} />
      </Route>
    </Routes>
  );
};

export default App;

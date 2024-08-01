import { Route, Routes } from 'react-router-dom';
import './App.css';
import { DashboardLayout } from './layouts';
import SignIn from './pages/auth/SignIn';
import SignUp from './pages/auth/SignUp';
import { useAuth } from './utils';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<div>Hello World</div>} />
      <Route path="/login" element={<SignIn />} />
      <Route path="/sign-up" element={<SignUp />} />
      <Route path="/dashboard" element={<DashboardLayout />}>
        <Route index element={<div>Dashboard</div>} />
      </Route>
    </Routes>
  );
};

export default App;

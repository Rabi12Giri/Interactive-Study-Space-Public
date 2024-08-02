import { Route, Routes } from 'react-router-dom';
import './App.css';
import { DashboardLayout } from './layouts';
import ChangePassword from './pages/auth/ChangePassword';
import ForgotPassword from './pages/auth/ForgotPassword';
import SignIn from './pages/auth/SignIn';
import SignUp from './pages/auth/SignUp';
import MyProfile from './pages/dashboard/MyProfile';
import Notebooks from './pages/dashboard/notebook/Notebooks';
import LandingPage from './pages/LandingPage';
import ResetPasswordPage from './pages/ResetPasswordPage';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SharedNotebooksList from './pages/dashboard/notebook/SharedNotebookList';
import Notes from './pages/dashboard/notes/Notes';
import SessionHistoryTable from './pages/dashboard/study-session/SessionHistoryTable';
import StudySpace from './pages/dashboard/study-session/StudySpace';
import Resource from './pages/dashboard/resource-sharing/Resource';
import ViewResources from './pages/dashboard/resource-sharing/ViewResources';
import PublicResource from './pages/PublicResource';

const App = () => {
  return (
    <>
      <ToastContainer />

      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/change-password" element={<ChangePassword />} />
        <Route path="/reset-password" element={<ResetPasswordPage />} />
        <Route path="/resources" element={<PublicResource />} />
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route index element={<Notebooks />} />

          <Route path="my-profile" element={<MyProfile />} />
          <Route path="shared-notebooks" element={<SharedNotebooksList />} />
          <Route path="resource-sharing" element={<Resource />} />
          <Route path="view-resources" element={<ViewResources />} />
          <Route
            path="shared-notebooks/notes/:notebookId"
            element={<Notes />}
          />

          <Route path="notes/:notebookId" element={<Notes />} />

          <Route path="study-session" element={<SessionHistoryTable />} />
        </Route>

        <Route path="/study-session/:studySessionId" element={<StudySpace />} />
      </Routes>
    </>
  );
};

export default App;

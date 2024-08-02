import { useContext } from 'react';
import { UserAuthContext } from '../../contexts/authContext';
import { useNavigate } from 'react-router-dom';
import { removeCookie } from '../handleCookies';

const useAuth = () => {
  const { currentUser, setCurrentUser } = useContext(UserAuthContext);

  const navigate = useNavigate();

  const logout = () => {
    setCurrentUser(null);
    navigate('/login');
    removeCookie();
  };

  return { currentUser, setCurrentUser, logout };
};

export default useAuth;

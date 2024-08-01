import { useContext } from 'react';
import { UserAuthContext } from '../../contexts/authContext';

const useAuth = () => {
  const { currentUser, setCurrentUser } = useContext(UserAuthContext);

  return { currentUser, setCurrentUser };
};

export default useAuth;

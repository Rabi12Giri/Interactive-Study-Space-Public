import { Button, Input } from '@material-tailwind/react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { showNotification } from '../../utils/alerts';
import { LandingHeader } from '../../ui/Headings';
import { postRequest } from '../../utils';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [token, setToken] = useState('');
  const [isTokenSent, setIsTokenSent] = useState(false);

  const navigate = useNavigate();

  const sendResetLink = async () => {
    if (!email) {
      showNotification({
        icon: 'error',
        title: 'Error!',
        message: 'Please enter your email address.',
      });
      return;
    }

    const res = await postRequest({
      endpoint: '/auth/send-pw-reset-email',
      data: { email },
    });

    if (res.ok) {
      setIsTokenSent(true);
      showNotification({
        icon: 'success',
        title: 'Success!',
        message: 'A password reset link has been sent to your email.',
      });
      return;
    }

    showNotification({
      icon: 'error',
      title: 'Error!',
      message: res.message,
    });
  };

  const resetPassword = async () => {
    if (!email || !password || !token) {
      showNotification({
        icon: 'error',
        title: 'Error!',
        message: 'Please fill out all fields.',
      });
      return;
    }

    const res = await postRequest({
      endpoint: '/auth/reset-password',

      data: { email, newPassword: password, token },
    });

    if (res.ok) {
      showNotification({
        icon: 'success',
        title: 'Success!',
        message: 'Your password has been changed successfully.',
      });

      setEmail('');
      setPassword('');
      setToken('');
      setIsTokenSent(false);
      navigate('/authentication');
      return;
    }

    showNotification({
      icon: 'error',
      title: 'Error!',
      message: res.message,
    });
  };

  return (
    <div className="bg-gray-400 h-[100vh] flex items-center justify-center">
      <div className="bg-white w-[90%] md:w-[60%] lg:w-[40%] border-gray-400 rounded px-5 py-8">
        <LandingHeader className="text-center">Forgot Password</LandingHeader>

        {isTokenSent ? (
          <p className="text-center text-gray-600 text-sm mt-4">
            Please check your email for the password reset link. The link will
            expire in 10 minutes.
          </p>
        ) : (
          <p className="text-center text-gray-600 text-sm mt-4">
            Enter your email to receive a password reset link.
          </p>
        )}

        <div className="w-full md:w-[80%] m-auto mt-8 flex flex-col justify-center items-center gap-y-5">
          <Input
            type="email"
            label="Email"
            name="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            required
          />

          {isTokenSent && (
            <>
              <Input
                type="text"
                label="Reset Token"
                name="token"
                onChange={(e) => setToken(e.target.value)}
                value={token}
                required
              />

              <Input
                type="password"
                label="New Password"
                name="password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                autoComplete="off"
                required
              />
            </>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-y-3 md:grid-y-0 md:gap-x-8 w-full text-sm lg:text-base">
            {isTokenSent ? (
              <>
                <Button
                  type="button"
                  onClick={() => {
                    setIsTokenSent(false);
                    setToken('');
                    setPassword('');
                  }}
                >
                  Go Back
                </Button>

                <Button type="button" className="m-0" onClick={resetPassword}>
                  Reset Password
                </Button>
              </>
            ) : (
              <>
                <Button
                  type="button"
                  onClick={() => navigate('/authentication')}
                >
                  Cancel
                </Button>

                <Button
                  type="button"
                  className="m-0 bg-black"
                  onClick={sendResetLink}
                >
                  Send Reset Link
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;

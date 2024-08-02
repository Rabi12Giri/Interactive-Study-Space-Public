import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Input, Button } from '@material-tailwind/react';
import { showNotification } from '../utils/alerts';

const ResetPasswordPage = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const token = queryParams.get('token');
  const [newPassword, setNewPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const navigate = useNavigate();

  const handleResetPassword = async () => {
    if (!newPassword) {
      showNotification({
        icon: 'error',
        title: 'Error!',
        message: 'Please enter a new password.',
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const res = await fetch('http://localhost:8000/auth/reset-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`, // Include token in headers
        },
        body: JSON.stringify({ newPassword }), // Send only the new password in the body
      });

      const result = await res.json();

      if (res.ok) {
        showNotification({
          icon: 'success',
          title: 'Success!',
          message: 'Your password has been changed successfully.',
        });
        navigate('/login');
      } else {
        showNotification({
          icon: 'error',
          title: 'Error!',
          message:
            result.message || 'An error occurred while resetting the password.',
        });
      }
    } catch (error) {
      showNotification({
        icon: 'error',
        title: 'Error!',
        message: 'An error occurred while resetting the password.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-gray-400 h-[100vh] flex items-center justify-center">
      <div className="bg-white w-[90%] md:w-[60%] lg:w-[40%] border-gray-400 rounded px-5 py-8">
        <h2 className="text-center text-2xl font-bold mb-4">Reset Password</h2>
        <p className="text-center text-gray-600 text-sm mt-4">
          Enter your new password below.
        </p>

        <div className="w-full md:w-[80%] m-auto mt-8 flex flex-col justify-center items-center gap-y-5">
          <Input
            type="password"
            label="New Password"
            name="newPassword"
            onChange={(e) => setNewPassword(e.target.value)}
            value={newPassword}
            autoComplete="off"
            required
          />

          <Button
            type="button"
            className="m-0 bg-black"
            onClick={handleResetPassword}
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Resetting...' : 'Reset Password'}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ResetPasswordPage;

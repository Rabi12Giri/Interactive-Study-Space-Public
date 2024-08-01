import { Input } from '@material-tailwind/react';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { showNotification } from '../../utils/alerts';
import { patchRequest, useAuth } from '../../utils';

const ChangePassword = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const defaultPasswordInfo = {
    newPassword: '',
    oldPassword: '',
    confirmNewPassword: '',
  };

  const [passwordInfo, setPasswordInfo] = useState(defaultPasswordInfo);

  const { newPassword, confirmNewPassword, oldPassword } = passwordInfo;

  const [displayLoader, setDisplayLoader] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPasswordInfo({ ...passwordInfo, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmNewPassword) {
      showNotification({
        title: 'Error',
        message: 'New Passwords do not match',
        icon: 'error',
      });
      return;
    }

    setDisplayLoader(true);

    const res = await patchRequest({
      endpoint: `/auth/change-password`,
      data: {
        oldPassword,
        newPassword,
        email: currentUser.email,
      },
    });

    setDisplayLoader(false);

    if (!res.ok) {
      showNotification({
        title: 'Error',
        message: res.message,
        icon: 'error',
      });
      return;
    }

    showNotification({
      title: 'Success',
      message: res.message,
      icon: 'success',
    });

    navigate('/');

    setPasswordInfo(defaultPasswordInfo);
  };

  return (
    <>
      <div className="flex h-screen items-center justify-center">
        <div className="w-[30%] mx-auto">
          <h1 className="text-center text-2xl font-semibold">
            Change Password
          </h1>
          <div className="my-4">
            <form onSubmit={handleSubmit}>
              <div className="space-y-4">
                <Input
                  size="md"
                  label="Old Password"
                  name="oldPassword"
                  className="w-full"
                  onChange={handleChange}
                  value={passwordInfo.oldPassword}
                  required
                />

                <Input
                  size="md"
                  label="New Password"
                  name="newPassword"
                  onChange={handleChange}
                  value={passwordInfo.newPassword}
                  required
                />

                <Input
                  size="md"
                  label="Confirm New Password"
                  name="confirmNewPassword"
                  onChange={handleChange}
                  value={passwordInfo.confirmNewPassword}
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full text-center py-3 bg-primaryRed text-white rounded mt-4"
              >
                Change Password
              </button>
              <div className="text-right pt-4 text-blue-600 underline underline-offset-2">
                <Link to="/">
                  <p>Go back</p>
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default ChangePassword;

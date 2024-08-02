import { Button, Input } from '@material-tailwind/react';
import React, { useState, useEffect } from 'react';
import { LandingSemiHeader } from '../../ui/Headings';
import { patchRequest } from '../../utils/apiHandler';
import { useAuth } from '../../utils';
import { showNotification } from '../../utils/alerts';

const MyProfile = () => {
  const { currentUser } = useAuth();
  const defaultUserInfo = {
    fullName: '',
    email: '',
    phoneNumber: '',
    address: '',
  };
  const [userInfo, setUserInfo] = useState(defaultUserInfo);

  useEffect(() => {
    if (currentUser) {
      setUserInfo({
        fullName: currentUser.fullName || '',
        email: currentUser.email || '',
        phoneNumber: currentUser.phoneNumber || '',
        address: currentUser.address || '',
      });
    }
  }, [currentUser]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserInfo({ ...userInfo, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await patchRequest({
      endpoint: `users/${currentUser._id}`,
      data: userInfo,
    });

    if (res.ok) {
      showNotification({
        icon: 'success',
        title: 'Success',
        message: res.message,
      });
      return;
    }

    showNotification({
      icon: 'error',
      title: 'Error',
      message: res.message,
    });
  };

  return (
    <div>
      <LandingSemiHeader>My Profile</LandingSemiHeader>
      <form onSubmit={handleSubmit} className="space-y-4 py-5">
        <Input
          type="text"
          name="fullName"
          label="Full Name"
          value={userInfo.fullName}
          onChange={handleChange}
        />
        <Input
          type="email"
          name="email"
          label="Email"
          readOnly
          value={userInfo.email}
          onChange={handleChange}
        />
        <Input
          type="tel"
          name="phoneNumber"
          label="Phone Number"
          value={userInfo.phoneNumber}
          onChange={handleChange}
        />
        <Input
          type="text"
          name="address"
          label="Address"
          value={userInfo.address}
          onChange={handleChange}
        />

        <Button type="submit" color="blue">
          Update Profile
        </Button>
      </form>
    </div>
  );
};

export default MyProfile;

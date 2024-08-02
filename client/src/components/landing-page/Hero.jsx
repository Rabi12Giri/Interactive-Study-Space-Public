import React from 'react';
import Bg from '../../assets/images/bgimage.jpg';

const Hero = () => {
  return (
    <div
      className="h-screen flex items-center justify-start relative"
      style={{
        backgroundImage: `url(${Bg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="relative z-10 p-10 text-white max-w-md">
        <h1 className="text-4xl mb-4">
          Teaching Turning Today’s Learners Into Tomorrow’s Leaders
        </h1>
        <button className="mt-4 px-6 py-3 bg-blue-600 text-white rounded-lg">
          Learn More
        </button>
      </div>
      <div className="bg-[rgba(0,0,0,0.5)] absolute inset-0"></div>
    </div>
  );
};

export default Hero;

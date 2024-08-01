import { twMerge } from 'tailwind-merge';

export const LandingHeader = ({ className, children }) => {
  return (
    <div>
      <h1 className={twMerge('text-3xl text-center font-semibold', className)}>
        {children}
      </h1>
    </div>
  );
};

export const LandingSemiHeader = ({ className, children }) => {
  return (
    <div>
      <h3 className={twMerge('text-black text-2xl font-semibold', className)}>
        {children}
      </h3>
    </div>
  );
};

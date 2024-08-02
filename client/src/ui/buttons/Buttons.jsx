import { twMerge } from 'tailwind-merge';

export const HeroButton = ({ type, className, onClick, children }) => {
  return (
    <button
      type={type}
      className={twMerge(
        'py-2 px-4 border border-t-white text-white hover:bg-white hover:text-black transition',
        className
      )}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export const PrimaryButton = ({ type, className, onClick, children }) => {
  return (
    <button
      type={type}
      className={twMerge(
        'py-2 px-4 bg-primaryBlue text-white rounded',
        className
      )}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

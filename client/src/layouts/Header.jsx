// import { UserIcon } from '@heroicons/react/24/solid';
import { Chip } from '@material-tailwind/react';
import { Typography } from '@material-tailwind/react';

export default function Header() {
  return (
    <div className="bg-white border-b border-gray-200  h-16 px-4 flex items-center  justify-between">
      <div className="flex justify-between w-full">
        <Typography variant="h4">Hey, Buddy</Typography>

        <Chip value="User" color="green" />
      </div>
    </div>
  );
}

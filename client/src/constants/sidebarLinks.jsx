import { IoMdShare } from 'react-icons/io';
import { IoPerson } from 'react-icons/io5';

import { FaPersonChalkboard } from 'react-icons/fa6';

import { MdNoteAdd } from 'react-icons/md';

export const SIDEBAR_LINKS = [
  {
    name: 'My Notebooks',
    path: '',
    icon: <MdNoteAdd className="h-5 w-5" />,
  },
  {
    name: 'My Profile',
    path: 'my-profile',
    icon: <IoPerson className="h-5 w-5" />,
  },

  {
    name: 'Shared Notes',
    path: 'shared-notebooks',
    icon: <IoMdShare className="h-5 w-5" />,
  },
  {
    name: 'Study Space',
    path: 'study-session',
    icon: <FaPersonChalkboard className="h-5 w-5" />,
  },
];

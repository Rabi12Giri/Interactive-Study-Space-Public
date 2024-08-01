import { FaUsers } from 'react-icons/fa';
import { IoHomeOutline } from 'react-icons/io5';

import { HiShoppingCart } from 'react-icons/hi';
import { IoAddOutline } from 'react-icons/io5';
import { MdArticle, MdDashboard } from 'react-icons/md';

export const SIDEBAR_LINKS = [
  {
    name: 'Dashboard',
    path: '/admin/dashboard',
    icon: <MdDashboard className="h-5 w-5" />,
  },
  {
    name: 'Home',
    path: '/',
    icon: <IoHomeOutline className="h-5 w-5" />,
  },

  {
    name: 'Collectors',
    path: '/admin/dashboard/collectors',
    icon: <FaUsers className="h-5 w-5" />,
  },
  {
    name: 'Blog',
    path: '/admin/dashboard/blog',
    icon: <MdArticle className="h-5 w-5" />,
  },
  {
    name: 'Add Products',
    path: '/admin/dashboard/addproduct',
    icon: <IoAddOutline className="h-5 w-5" />,
  },
  {
    name: 'Orders',
    path: '/admin/dashboard/orders',
    icon: <HiShoppingCart className="h-5 w-5" />,
  },
];

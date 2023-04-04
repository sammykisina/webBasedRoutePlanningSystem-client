import {
  HiBookmark,
  HiHome,
  HiMapPin,
  HiOutlineBookmark,
  HiOutlineHome,
  HiOutlineMapPin,
  HiOutlinePower,
  HiOutlineUser,
  HiPower,
  HiUser,
} from 'react-icons/hi2';

const commonRoutes = [
  {
    name: 'Home',
    inactiveIcon: <HiOutlineHome className='icon' />,
    activeIcon: <HiHome className='icon' />,
    to: '/',
  },
];

const authRoutes = [
  {
    name: 'Login',
    inactiveIcon: <HiOutlinePower className='icon' />,
    activeIcon: <HiPower className='icon' />,
    to: '/auth/login',
  },
];

const authenticatedUserRoutes = [
  {
    name: 'Paths',
    inactiveIcon: <HiOutlineMapPin className='icon' />,
    activeIcon: <HiMapPin className='icon' />,
    to: '/paths',
  },
  {
    name: 'History',
    inactiveIcon: <HiOutlineBookmark className='icon' />,
    activeIcon: <HiBookmark className='icon' />,
    to: '/history',
  },
  {
    name: 'Profile',
    inactiveIcon: <HiOutlineUser className='icon' />,
    activeIcon: <HiUser className='icon' />,
    to: '/profile',
  },
];

const routes = {
  commonRoutes,
  authRoutes,
  authenticatedUserRoutes,
};

export default routes;

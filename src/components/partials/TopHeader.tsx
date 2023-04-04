import { useState } from 'react';
import { HiOutlineMenuAlt3 } from 'react-icons/hi';
import { useLocation } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import { appAtoms } from '@/atoms';
import { Dropdown, Icon, Link, Profile, Title } from '@/components';
import { HiHome, HiOutlineUser, HiUser } from 'react-icons/hi2';
import { useAuth } from '@/hooks';

const TopHeader = () => {
  /**
   * component states
   */
  const { showSidebarState } = appAtoms;
  const setShowSidebar = useSetRecoilState(showSidebarState);
  const { pathname } = useLocation();

  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const { user, token } = useAuth();

  /**
   * component function
   */
  const getTitle = (pathname: string) => {
    let title = '';

    if (pathname.endsWith('revoke-logins')) {
      return (title = 'Revoking Logins');
    }

    switch (pathname) {
      case '/':
        title = 'Home';
        break;

      case '/auth/login':
        title = 'Login';
        break;

      case '/auth/register':
        title = 'Register';
        break;

      default:
        title = pathname.substring(1);
    }

    return title;
  };

  return (
    <nav
      className={`flex h-[50px] items-center justify-between rounded-md px-2  sm:px-0 `}
    >
      <div className='flex items-center gap-x-4'>
        <Icon
          icon={
            <HiOutlineMenuAlt3
              className={`h-5 w-5 text-callToAction sm:hidden`}
            />
          }
          purpose={() => setShowSidebar((prevShowSidebar) => !prevShowSidebar)}
        />
      </div>
    </nav>
  );
};

export default TopHeader;

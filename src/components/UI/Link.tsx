import { appAtoms } from '@/atoms';
import { cva, type VariantProps } from 'class-variance-authority';
import type { FC } from 'react';
import { useRecoilValue } from 'recoil';
import { Route } from '../../types/typings.t';
import { NavLink, useLocation } from 'react-router-dom';

const navlinkStyles = cva(
  'flex items-center rounded-full  gap-3 duration-500  focus:outline-none whitespace-nowrap ',
  {
    variants: {
      type: {
        medium: 'h-[40px] gap-[8px] px-[16px] text-[16px] py-2 ',
        large:
          'h-[56px] gap-[8px] px-[20px] text-2xl bg-callToAction text-white py-2',
        link: 'h-[38px] gap-[6px] text-[14px] px-4 hover:bg-callToAction py-2 text-textColor font-bold justify-center',
      },
      fullWidth: {
        true: 'w-full',
        false: 'w-fit',
      },
      active: {
        navLinkActive: 'bg-callToAction w-full text-primary',
        activeLink:
          'text-white text-lg bg-orange px-2 py-2 flex justify-center',
      },
    },
  }
);

interface NavLinkProps extends VariantProps<typeof navlinkStyles> {
  route: Route;
  moreActions?: () => void;
}

const Link: FC<NavLinkProps> = ({
  fullWidth,
  type,
  route,
  moreActions,
  active,
}) => {
  /**
   * component states
   */
  const { isSidebarOpenState } = appAtoms;
  const isSidebarOpen = useRecoilValue(isSidebarOpenState);

  return (
    <NavLink
      to={route.to}
      onClick={() => {
        moreActions && moreActions();
      }}
    >
      <div className={navlinkStyles({ fullWidth, type, active })}>
        <div className={` ${active && 'duration-500'}`}>
          {active ? route.activeIcon : route.inactiveIcon}
        </div>

        <span className={`${isSidebarOpen ? 'block' : 'hidden'}`}>
          {route.name}
        </span>
      </div>
    </NavLink>
  );
};

export default Link;

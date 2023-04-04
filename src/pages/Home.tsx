import React, { FC } from 'react';
import { Icon, Scroll, TabTitle, Title } from '@/components';
import { homeConstants } from '@/constants';
import { Data } from '../types/typings.t';
import { Underline } from '@/assets';
import { NavLink } from 'react-router-dom';
import { HiOutlineArrowLongRight } from 'react-icons/hi2';
import { useAuth } from '@/hooks';

const Home = () => {
  /**
   * page states
   */
  const auth = useAuth();

  /**
   * page functions
   */
  const data = (data: Data) => {
    return (
      <div
        className={`w-[15rem] h-[10rem] rounded-lg px-2 py-2 flex flex-col gap-2 ${data.bg}`}
      >
        {/* icon */}
        <img
          src={data?.icon}
          alt=''
          className={` h-[4rem] w-[4rem] rounded-lg`}
        />

        <div>
          <TabTitle title={data.title} />

          <p
            className={`rounded-full ${data.contentBg} w-fit px-3 mt-1 text-xs flex gap-2 items-center justify-center leading-[20px] text-white`}
          >
            {data.content}
          </p>
        </div>
      </div>
    );
  };

  return (
    <section className='h-full xs:h-[40rem] flex flex-col gap-4'>
      {/* title */}
      <TabTitle title='Home' />

      {/* body */}
      <div className='h-full rounded-[2rem]  shadow-md bg-secondary py-4'>
        {/* why us */}
        <div className='flex flex-col gap-2 w-full px-2'>
          <div className='px-5'>
            <Title title='Why Us' />
          </div>

          <Scroll data={homeConstants.homeData} component={data} />
        </div>

        {/* into */}
        <div className='mt-5 flex flex-col gap-3 px-6'>
          <div className='px-5 w-fit'>
            <Title title='What exactly is WBr.' />

            <div className='flex justify-end'>
              <img src={Underline} alt='' className='' />
            </div>
          </div>
          <p>
            We understand that you need to make travel decisions faster and
            accurately keeping in mind factors like{' '}
            <span className='rounded-full bg-primary w-fit px-3 text-xs py-1 gap-2 items-center justify-center leading-[20px] text-white'>
              Traffic
            </span>{' '}
            ,{' '}
            <span className='rounded-full bg-primary w-fit px-3 text-xs py-1 gap-2 items-center justify-center leading-[20px] text-white'>
              Distance
            </span>{' '}
            ,{' '}
            <span className='rounded-full bg-primary w-fit px-3 text-xs py-1 gap-2 items-center justify-center leading-[20px] text-white'>
              Cost
            </span>{' '}
            and{' '}
            <span className='rounded-full bg-primary w-fit px-3 text-xs py-1 gap-2 items-center justify-center leading-[20px] text-white'>
              Time
            </span>{' '}
            you have for travel.
          </p>

          <p>
            This is where{' '}
            <span className='rounded-full bg-callToAction w-fit px-3 text-xs py-1 gap-2 items-center justify-center leading-[20px] text-white'>
              WBr
            </span>{' '}
            comes to your save for it understands that this is a difficult task
            to undertake alone.Its uses the information you provide to decide
            for you the most cost effective path to take be it in a{' '}
            <span className='rounded-full bg-blue-500 w-fit px-3 text-xs py-1 gap-2 items-center justify-center leading-[20px] text-white'>
              drive
            </span>{' '}
            or{' '}
            <span className='rounded-full bg-blue-500 w-fit px-3 text-xs py-1 gap-2 items-center justify-center leading-[20px] text-white'>
              cycling
            </span>{' '}
            . Extra information on time and total distance will be provided for
            your us.
          </p>

          {/* get stated button */}
          <NavLink to={auth.token ? '/paths' : '/auth/login'} className='w-fit'>
            <div className='btn'>
              <span>Get Started</span>

              <Icon icon={<HiOutlineArrowLongRight className='btnIcon' />} />
            </div>
          </NavLink>
        </div>
      </div>
    </section>
  );
};

export default Home;

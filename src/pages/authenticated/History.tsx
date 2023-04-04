import { Icon, SpinnerLoader, TabTitle, Title } from '@/components';
import { useAuth } from '@/hooks';
import { FC } from 'react';
import { HiOutlineArrowLongRight } from 'react-icons/hi2';
import { NavLink, useNavigate } from 'react-router-dom';

const History = () => {
  /**
   * pages states
   */
  const authHook = useAuth();
  const paths = authHook?.userProfile?.relationships?.paths;

  /**
   * page functions
   */
  const Path: FC<{
    path: google.maps.DirectionsResult;
  }> = ({ path }) => {
    /**
     * component states
     */
    return (
      <div className='bg-callToAction/10 w-full flex flex-col gap-3 p-2 rounded-[1rem] h-fit'>
        {/* origin and destination */}
        <div className='flex gap-2'>
          <div className='gap-2 rounded-full bg-callToAction/10 w-fit px-3 py-1 text-xs flex items-center justify-center leading-loose'>
            <span>Origin: </span>
            <span>{path?.request?.destination?.query}</span>
          </div>

          <div className='gap-2 rounded-full bg-callToAction/10 w-fit px-3 py-1 text-xs flex items-center justify-center leading-loose'>
            <span>Destination: </span>
            <span>{path?.request?.destination?.query}</span>
          </div>
        </div>

        {path?.routes[0].legs.length > 1 ? (
          <div className=' px-2 max-h-[15rem] overflow-y-scroll scrollbar-hide flex flex-col gap-2'>
            <Title title='Way Stops' />

            <div className='flex flex-col gap-2 '>
              {path?.routes[0].legs.map((routeWithStop, routeWithStopIndex) => (
                <div
                  key={routeWithStopIndex}
                  className='bg-primary/50 rounded-md px-2 py-2 flex flex-col gap-1'
                >
                  <div className='flex flex-col gap-1 xs:flex-row'>
                    <div className='gap-2 rounded-full bg-callToAction/10 w-fit px-3 py-1 text-xs flex items-center justify-center leading-loose'>
                      <span>Start</span>
                      <span>{routeWithStop?.start_address}</span>
                    </div>

                    <div className='gap-2 rounded-full bg-callToAction/10 w-fit px-3 py-1 text-xs flex items-center justify-center leading-loose'>
                      <span>Stop</span>
                      <span>{routeWithStop?.end_address}</span>
                    </div>
                  </div>

                  <span className='gap-2 rounded-full  w-fit px-3 py-1 text-xs flex items-center justify-center leading-loose'>
                    {routeWithStop?.distance?.text} for{' '}
                    {routeWithStop?.duration?.text}
                  </span>

                  <span className='gap-2 rounded-full  w-fit px-3 py-1 text-xs flex items-center justify-center leading-loose bg-primary'>
                    {routeWithStopIndex + 1}
                  </span>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className='flex flex-col gap-2 lg:flex-row md:py-4 duration-300'>
            <div className='flex flex-col gap-2 xs:flex-row xs:items-center'>
              <Title title='Distance to Destination' />
              <div className='flex justify-end'>
                <span className='rounded-full bg-callToAction/10 w-fit px-3 py-1 text-xs flex items-center justify-center leading-loose'>
                  {path.routes[0].legs[0].distance?.text!}
                </span>
              </div>
            </div>

            <div className='flex flex-col gap-2 xs:flex-row xs:items-center'>
              <Title title='Time To Destination' />
              <div className='flex justify-end'>
                <span className='rounded-full bg-callToAction/10 w-fit px-3 py-1 text-xs flex items-center justify-center leading-loose'>
                  {path.routes[0].legs[0].duration?.text!}
                </span>
              </div>
            </div>
          </div>
        )}

        {/* <div className='flex justify-end'>
          <Button
            title='VIEW IN MAP'
            type='submit'
            intent='primary'
            purpose={() => {
              navigate('/paths');
              setDirectionResponse(path);
            }}
            fullWidth={false}
          />
        </div> */}
      </div>
    );
  };

  return (
    <section className='h-full xs:h-[40rem] flex flex-col gap-2'>
      {/* title */}
      <TabTitle title='Your History' />

      {/* body */}
      {authHook.token ? (
        <div className='h-[45rem] py-2 xs:h-[39rem] overflow-y-scroll rounded-[2rem] scrollbar-hide shadow-md bg-secondary md:flex justify-center p-4'>
          <div className='flex flex-col gap-3 md:w-[30rem] lg:w-[35rem]'>
            <Title title='Your Saved Locations' />

            {authHook?.isFetchingUserProfile ? (
              <div className='h-[30rem] flex justify-center items-center'>
                <SpinnerLoader color='fill-callToAction' />
              </div>
            ) : (
              paths?.map((path, pathIndex) => (
                <Path
                  key={pathIndex}
                  path={JSON.parse(path?.attributes?.path)}
                />
              ))
            )}
          </div>
        </div>
      ) : (
        <div className='flex justify-center items-center flex-col gap-2 rounded-[2rem] h-full  shadow-md bg-secondary py-4 px-2'>
          Please Login To Access This Page
          <NavLink to='/auth/login' className='w-fit'>
            <div className='btn'>
              <span>Login</span>

              <Icon icon={<HiOutlineArrowLongRight className='btnIcon' />} />
            </div>
          </NavLink>
        </div>
      )}
    </section>
  );
};

export default History;

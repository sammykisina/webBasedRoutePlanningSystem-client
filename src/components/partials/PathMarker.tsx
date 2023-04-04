import { useRecoilValue, useSetRecoilState } from 'recoil';
import { mapAtoms } from '@/atoms';
import { Autocomplete } from '@react-google-maps/api';
import { Dispatch, FC, RefObject, SetStateAction } from 'react';
import { Button, Icon, Title, Toasts } from '@/components';
import { HiPaperAirplane, HiXMark } from 'react-icons/hi2';

type PathMarkerProps = {
  isLoaded: boolean;
  map: google.maps.Map | null;
  center: {
    lat: number;
    lng: number;
  };
  findRoute: () => void;
  clearPath: () => void;
  distance: string;
  duration: string;
  originLocationRef: RefObject<HTMLInputElement>;
  destinationRef: RefObject<HTMLInputElement>;
  numberOfLegs: number;
  routeWithStopsData: google.maps.DirectionsLeg[] | null;
};

const PathMarker: FC<PathMarkerProps> = ({
  isLoaded,
  map,
  center,
  findRoute,
  distance,
  destinationRef,
  originLocationRef,
  clearPath,
  duration,
  numberOfLegs,
  routeWithStopsData,
}) => {
  /**
   * component states
   */
  const showPathMarker = useRecoilValue(mapAtoms?.showPathMarkerState);
  const setShowAddStopWidget = useSetRecoilState(
    mapAtoms.showAddStopWidgetState
  );

  console.log('routeWithStopsData', routeWithStopsData);

  /**
   * component functions
   */

  return (
    <div
      className={`bg-primary/90 h-fit  duration-300 rounded-[2rem] py-4 px-2 ${
        showPathMarker ? 'left-0' : 'hidden'
      }`}
    >
      {isLoaded ? (
        <div className='flex flex-col gap-3'>
          <div className='flex flex-col gap-2 xs:flex-row xs:items-center'>
            {/* location inputs */}
            <div className='flex flex-col gap-y-5 rounded-[2rem] py-6 px-2  border'>
              <Autocomplete>
                <div className='relative'>
                  <input
                    type='text'
                    className='input peer'
                    placeholder='Origin'
                    ref={originLocationRef}
                  />
                  <label className='inputLabel'>Origin</label>
                </div>
              </Autocomplete>

              <Autocomplete>
                <div className='relative'>
                  <input
                    type='text'
                    className='input peer'
                    placeholder='Destination'
                    ref={destinationRef}
                  />
                  <label className='inputLabel'>Destination</label>
                </div>
              </Autocomplete>
            </div>

            <div>
              <div className='flex flex-row gap-2 items-center justify-between rounded-[1rem] py-2 px-2  border h-fit'>
                <Button
                  title='Calculate'
                  type='submit'
                  intent='primary'
                  fullWidth={false}
                  purpose={() => findRoute()}
                />

                <Icon
                  icon={<HiXMark className='icon' />}
                  purpose={() => clearPath()}
                  iconWrapperStyles='p-1 w-fit h-fit  rounded-full flex justify-center items-center z-50 bg-red-300 hover:bg-red-500'
                />
              </div>

              <div className={`flex justify-end mt-2`}>
                <Button
                  title='add stops'
                  type='submit'
                  intent='primary'
                  purpose={() => {
                    if (
                      originLocationRef.current?.value === '' ||
                      destinationRef.current?.value === ''
                    ) {
                      Toasts.errorToast('Enter origin and destination first.');
                      return;
                    }

                    setShowAddStopWidget(true);
                  }}
                  fullWidth={false}
                />
              </div>
            </div>
          </div>

          {/* summary */}
          <div className='rounded-[2rem] py-4 px-2  border'>
            <div className='flex justify-end'>
              <Icon
                icon={<HiPaperAirplane className='icon -rotate-45' />}
                purpose={() => map?.panTo(center)}
                iconWrapperStyles='p-1 w-fit h-fit rounded-full flex justify-center items-center z-50 bg-secondary'
              />
            </div>

            {/* location data */}
            {numberOfLegs > 1 ? (
              <div className=' px-2 max-h-[15rem] overflow-y-scroll scrollbar-hide flex flex-col gap-2'>
                <Title title='Way Stops' />

                <div className='flex flex-col gap-2 '>
                  {routeWithStopsData?.map(
                    (routeWithStop, routeWithStopIndex) => (
                      <div
                        key={routeWithStopIndex}
                        className='bg-callToAction/5 rounded-md px-2 py-2 flex flex-col gap-1'
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
                    )
                  )}
                </div>
              </div>
            ) : (
              <div className='flex flex-col gap-2'>
                <div className='flex flex-col gap-2 xs:flex-row xs:items-center'>
                  <Title title='Distance to Destination' />
                  <div className='flex justify-end'>
                    <span className='rounded-full bg-callToAction/10 w-fit px-3 py-1 text-xs flex items-center justify-center leading-loose'>
                      {distance}
                    </span>
                  </div>
                </div>

                <div className='flex flex-col gap-2 xs:flex-row xs:items-center'>
                  <Title title='Time To Destination' />
                  <div className='flex justify-end'>
                    <span className='rounded-full bg-callToAction/10 w-fit px-3 py-1 text-xs flex items-center justify-center leading-loose'>
                      {duration}
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      ) : (
        ''
      )}
    </div>
  );
};

export default PathMarker;

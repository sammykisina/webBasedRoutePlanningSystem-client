import { Button, Icon, Title, WidgetHeader } from '@/components';
import { useSetRecoilState } from 'recoil';
import { mapAtoms } from '@/atoms';
import { Dispatch, FC, RefObject, SetStateAction } from 'react';
import { Autocomplete } from '@react-google-maps/api';
import { HiXMark } from 'react-icons/hi2';

type AddStopProps = {
  isLoaded: boolean;
  stopRef: RefObject<HTMLInputElement>;
  stops: [] | string[];
  setStops: Dispatch<SetStateAction<[] | string[]>>;
};

const AddStop: FC<AddStopProps> = ({ isLoaded, stopRef, setStops, stops }) => {
  /**
   * component states
   */
  const setShowAddStopWidget = useSetRecoilState(
    mapAtoms.showAddStopWidgetState
  );

  /**
   * component functions
   */
  const generateCleanStops = (stops: [] | string[]) => {
    const cleanStops = new Set();

    stops?.map((stop) => {
      cleanStops.add(stop);
    });

    return [...cleanStops.values()] as string[];
  };

  const remove = (stop: string) => {
    setStops(stops.filter((stopInStops) => stop !== stopInStops));
  };

  return (
    <section>
      <WidgetHeader
        close={() => {
          setShowAddStopWidget(false);
        }}
        title='ADD STOP'
      />

      {isLoaded && (
        <div className='flex flex-col gap-2 h-[15rem] justify-between px-3 py-3'>
          {/* location inputs */}
          <div className='flex flex-col gap-y-2 rounded-[2rem] pt-6 px-2  border h-[12rem] '>
            <Autocomplete>
              <div className='relative'>
                <input
                  type='text'
                  className='input peer'
                  placeholder='Stop [Between Origin and Destination]'
                  ref={stopRef}
                />
                <label className='inputLabel'>
                  Stop [Between Origin and Destination]
                </label>
              </div>
            </Autocomplete>

            <div className='max-h-[8rem] overflow-y-scroll scrollbar-hide px-2 py-2 flex flex-col gap-1'>
              <Title title='Current Stops' />

              {stops?.map((stop, stopIndex) => (
                <div
                  key={stopIndex}
                  className='flex items-center justify-between'
                >
                  <span className='rounded-full bg-callToAction/10 w-fit px-3 py-1 text-xs flex items-center justify-center leading-loose'>
                    {stop}
                  </span>

                  <Icon
                    icon={<HiXMark className='w-3 h-3' />}
                    purpose={() => remove(stop)}
                    iconWrapperStyles='p-1 w-fit h-fit  rounded-full flex justify-center items-center bg-red-300 hover:bg-red-500'
                  />
                </div>
              ))}
            </div>
          </div>

          <div className='flex justify-end mt-2'>
            <Button
              title='Add'
              type='button'
              intent='primary'
              fullWidth={false}
              purpose={() => {
                setStops(
                  generateCleanStops([...stops, stopRef?.current?.value!])
                );
                stopRef.current.value = '';
                setShowAddStopWidget(false);
              }}
            />
          </div>
        </div>
      )}
    </section>
  );
};

export default AddStop;

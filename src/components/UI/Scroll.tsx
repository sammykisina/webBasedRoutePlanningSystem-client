import { FC, ReactNode, RefObject, useRef, useState } from 'react';
import { Icon } from '@/components';
import { HiArrowLongLeft, HiArrowLongRight } from 'react-icons/hi2';
import { Data as DataType } from '../../types/typings.t';

type ScrollProps = {
  data: DataType[];
  component: (data: DataType) => ReactNode;
};

const Scroll: FC<ScrollProps> = ({
  data,
  component,
  // scrollable_row_ref,
}) => {
  /**
   * component states
   */
  const [isMoved, setIsMoved] = useState<boolean>(false);
  const scrollRowRef = useRef<HTMLDivElement>(null);

  /**
   * component functions
   */

  const handleClick = (direction: string) => {
    setIsMoved(true);

    if (scrollRowRef.current) {
      const { scrollLeft, clientWidth } = scrollRowRef.current;

      const scrollTo =
        direction === 'left'
          ? scrollLeft - clientWidth
          : scrollLeft + clientWidth;

      scrollRowRef.current.scrollTo({
        left: scrollTo,
        behavior: 'smooth',
      });
    }
  };

  return (
    <section className='flex items-center gap-2 '>
      <Icon
        icon={<HiArrowLongLeft className='icon' />}
        iconWrapperStyles={`text-[1rem] hover:bg-callToAction hover:text-white rounded-full  ${
          !isMoved && 'text-callToAction'
        }`}
        purpose={() => handleClick('left')}
      />
      <div
        ref={scrollRowRef}
        className='flex gap-3 overflow-x-scroll  scrollbar-hide rounded-[1rem] h-fit py-2 px-2 flex-1 lg:justify-center bg-primary/50'
      >
        {data?.map((singleData, singleDataIndex) => (
          <div key={singleDataIndex}>{component(singleData)}</div>
        ))}
      </div>

      <Icon
        icon={<HiArrowLongRight className='icon' />}
        iconWrapperStyles={`text-[1rem] hover:bg-callToAction hover:text-white rounded-full`}
        purpose={() => handleClick('right')}
      />
    </section>
  );
};

export default Scroll;

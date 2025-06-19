import { Search } from 'lucide-react';

import WineFilterButton from '@/feature/wines/components/button/WineFilterButton';
import WineFilterForm from '@/feature/wines/components/wine-filter/WineFilterForm';
import { Input } from '@/shared/components/ui/input';

const WineFilterSection = () => {
  return (
    <>
      <div className='sticky top-28 hidden h-fit lg:block'>
        <div className='flex flex-col gap-12'>
          <Input
            icon={<Search color='#b2ae98' className='size-[2.2rem]' />}
            placeholder='와인 검색'
            className='border-secondary placeholder:text-gray w-full text-[1.6rem]'
          />
          <WineFilterForm onSubmit={() => {}} />
        </div>
      </div>
      <div className='flex flex-1 items-center gap-8 lg:hidden'>
        <WineFilterButton />
        <Input
          icon={<Search color='#b2ae98' className='size-[2.2rem] lg:hidden' />}
          placeholder='와인 검색'
          className='border-secondary placeholder:text-gray w-full text-[1.6rem] lg:hidden'
        />
      </div>
    </>
  );
};
export default WineFilterSection;

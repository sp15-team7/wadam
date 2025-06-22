import { Search } from 'lucide-react';
import { ChangeEvent, KeyboardEvent, useEffect, useState } from 'react';

import WineFilterButton from '@/feature/wines/components/button/WineFilterButton';
import WineFilterForm from '@/feature/wines/components/form/WineFilterForm';
import { WineFilterFormValues } from '@/feature/wines/schema/wine-filter.schema';
import { Button } from '@/shared/components/ui/button';
import { Input } from '@/shared/components/ui/input';

interface WineFilterSectionProps {
  onFilterChange: (filters: WineFilterFormValues) => void;
  initialFilters: WineFilterFormValues;
  onOpenModal: () => void;
  onOpenCreateModal: () => void;
}

const WineFilterSection = ({
  onFilterChange,
  initialFilters,
  onOpenModal,
  onOpenCreateModal,
}: WineFilterSectionProps) => {
  const [searchValue, setSearchValue] = useState(initialFilters.name);

  useEffect(() => {
    setSearchValue(initialFilters.name);
  }, [initialFilters.name]);

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      onFilterChange({
        ...initialFilters,
        name: searchValue,
      });
    }
  };

  return (
    <>
      <div className='sticky top-28 hidden h-fit lg:block'>
        <div className='flex flex-col gap-12'>
          <WineFilterForm
            onSubmit={onFilterChange}
            initialValues={initialFilters}
            submitOnChange
          />
          <Button size='full' className='w-full' onClick={onOpenCreateModal}>
            와인 등록하기
          </Button>
        </div>
      </div>
      <div className='flex flex-1 items-center gap-8 lg:hidden'>
        <WineFilterButton onClick={onOpenModal} />
        <Input
          icon={<Search color='#b2ae98' className='size-[2.2rem] lg:hidden' />}
          placeholder='와인 검색'
          className='border-secondary placeholder:text-gray w-full text-[1.6rem] lg:hidden'
          value={searchValue}
          onChange={handleSearchChange}
          onKeyDown={handleKeyDown}
        />
      </div>
    </>
  );
};
export default WineFilterSection;

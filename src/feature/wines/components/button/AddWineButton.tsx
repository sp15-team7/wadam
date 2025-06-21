import { Plus, Wine } from 'lucide-react';

interface AddWineButtonProps {
  onClick: () => void;
}

const AddWineButton = ({ onClick }: AddWineButtonProps) => {
  return (
    <button
      className='flex-center bg-primary relative cursor-pointer rounded-full p-10 shadow-md transition-all hover:scale-110 md:p-12'
      onClick={onClick}
    >
      <Wine className='absolute top-1/2 left-1/2 size-10 -translate-x-2/3 -translate-y-1/2 text-white md:size-12' />
      <Plus className='absolute top-1/2 left-1/2 size-8 -translate-x-1/12 -translate-y-1/2 text-white transition-all hover:scale-110 md:size-10' />
    </button>
  );
};
export default AddWineButton;

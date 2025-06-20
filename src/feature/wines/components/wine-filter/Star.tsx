import Image from 'next/image';

const Star = ({ value }: { value: number }) => {
  return (
    <div className='flex items-center gap-1'>
      {Array.from({ length: value }).map((_, index) => (
        <Image
          key={`star-${index}`}
          src={`/icons/ui/icon-star-filled.svg`}
          alt='star'
          width={20}
          height={20}
          className='size-[1.4rem] md:size-[1.6rem]'
          draggable={false}
        />
      ))}
    </div>
  );
};
export default Star;

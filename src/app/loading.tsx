import Spinner from '@/shared/components/ui/Spinner';

const Loading = () => {
  return (
    <div className='flex flex-col items-center justify-center h-screen'>
      <Spinner />
    </div>
  );
};

export default Loading;

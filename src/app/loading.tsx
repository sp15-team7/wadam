import Spinner from '@/shared/components/common/spinner';

const Loading = () => {
  return (
    <div className='flex flex-col items-center justify-center h-screen'>
      <Spinner />
    </div>
  );
};

export default Loading;

import Spinner from '@/shared/components/common/spinner';

const Loading = () => {
  return (
    <div className='flex h-screen flex-col items-center justify-center'>
      <Spinner />
    </div>
  );
};

export default Loading;

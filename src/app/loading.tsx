import { Spinner } from '@/shared/components/ui/spinner/spinner';

const Loading = () => {
  return (
    <div className='flex flex-col items-center justify-center h-screen'>
      <p className='text-xl-bold'>로딩 UI test 3초...</p>
      <br />
      <br />
      <Spinner />
    </div>
  );
};

export default Loading;

import { Button } from '@/shared/components/ui/button';
import { Input } from '@/shared/components/ui/input';

const LandingPage = () => {
  return (
    <div className='bg-white '>
      <h1 className='text-2xl-bold text-primary'>
        와인의 미학과 담론,
        <br />
        와담
      </h1>
      <p className='text-xl-bold text-secondary'>
        와인의 미학과 담론,
        <br />
        와담
      </p>
      <p className='text-lg-bold text-black'>
        와인의 미학과 담론,
        <br />
        와담
      </p>
      <div className='bg-primary'>
        <p className='text-md-bold text-white'>
          와인의 미학과 담론,
          <br />
          와담
        </p>
      </div>
      <Button className=''>와담</Button>
      <Input placeholder='와인 이름을 입력해주세요' />
    </div>
  );
};

export default LandingPage;

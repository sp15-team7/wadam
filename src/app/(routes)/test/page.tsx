import { Button } from '@/shared/components/ui/button';

const page = () => {
  return (
    <div className='text-2xl-bold flex w-screen flex-col flex-wrap gap-8'>
      <div className='flex flex-col gap-4'>
        <p>Primary Button</p>
        <div className='flex items-center gap-4'>
          <Button variant='primary' size='xs'>
            Click me
          </Button>
          <p>xs</p>
        </div>
        <div className='flex items-center gap-4'>
          <Button variant='primary' size='sm'>
            Click me
          </Button>
          <p>sm</p>
        </div>
        <div className='flex items-center gap-4'>
          <Button variant='primary' size='md'>
            Click me
          </Button>
          <p>md</p>
        </div>
        <div className='flex items-center gap-4'>
          <Button variant='primary' size='lg'>
            Click me
          </Button>
          <p>lg</p>
        </div>
        <div className='flex items-center gap-4'>
          <Button variant='primary' size='xl'>
            Click me
          </Button>
          <p>xl</p>
        </div>
        <div className='flex items-center gap-4'>
          <Button variant='primary' size='full'>
            Click me
          </Button>
          <p>full</p>
        </div>
      </div>
      {/* Secondary Button */}
      <div className='flex flex-col gap-4'>
        <p>Secondary Button</p>
        <div className='flex items-center gap-4'>
          <Button variant='secondary' size='xs'>
            Click me
          </Button>
          <p>xs</p>
        </div>
        <div className='flex items-center gap-4'>
          <Button variant='secondary' size='sm'>
            Click me
          </Button>
          <p>sm</p>
        </div>
        <div className='flex items-center gap-4'>
          <Button variant='secondary' size='md'>
            Click me
          </Button>
          <p>md</p>
        </div>
        <div className='flex items-center gap-4'>
          <Button variant='secondary' size='lg'>
            Click me
          </Button>
          <p>lg</p>
        </div>
        <div className='flex items-center gap-4'>
          <Button variant='secondary' size='xl'>
            Click me
          </Button>
          <p>xl</p>
        </div>
        <div className='flex items-center gap-4'>
          <Button variant='secondary' size='full'>
            Click me
          </Button>
          <p>full</p>
        </div>
      </div>
      {/* Disabled Button */}
      <div className='flex flex-col gap-4'>
        <p>Disabled Button</p>
        <div className='flex items-center gap-4'>
          <Button variant='disabled' size='xs'>
            Click me
          </Button>
          <p>xs</p>
        </div>
        <div className='flex items-center gap-4'>
          <Button variant='disabled' size='sm'>
            Click me
          </Button>
          <p>sm</p>
        </div>
        <div className='flex items-center gap-4'>
          <Button variant='disabled' size='md'>
            Click me
          </Button>
          <p>md</p>
        </div>
        <div className='flex items-center gap-4'>
          <Button variant='disabled' size='lg'>
            Click me
          </Button>
          <p>lg</p>
        </div>
        <div className='flex items-center gap-4'>
          <Button variant='disabled' size='xl'>
            Click me
          </Button>
          <p>xl</p>
        </div>
        <div className='flex items-center gap-4'>
          <Button variant='disabled' size='full'>
            Click me
          </Button>
          <p>full</p>
        </div>
      </div>
    </div>
  );
};
export default page;
